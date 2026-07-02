import mammoth from 'mammoth';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'document';
}

function getTitle(text: string, fallback: string) {
  const heading = text.split('\n').find((line) => line.trim().startsWith('# '));
  if (heading) {
    return heading.replace(/^#\s+/, '').trim();
  }

  const firstTextLine = text
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && line.length <= 140);

  return firstTextLine ?? fallback.replace(/\.[^.]+$/, '');
}

function getStorageParts(sourcePath: string | null) {
  if (!sourcePath) {
    throw new Error('Import job has no source_path');
  }

  const cleaned = sourcePath.replace(/^\/+/, '');
  const bucket = cleaned.split('/')[0];
  const path = cleaned.split('/').slice(1).join('/');

  if (!bucket || !path) {
    throw new Error(`Invalid source_path: ${sourcePath}`);
  }

  return { bucket, path };
}

function getSourceFormat(sourceName: string) {
  const lower = sourceName.toLowerCase();
  if (lower.endsWith('.md') || lower.endsWith('.markdown')) return 'markdown';
  if (lower.endsWith('.docx')) return 'docx';
  return 'text';
}

async function extractTextFromBlob(blob: Blob, sourceName: string) {
  const format = getSourceFormat(sourceName);

  if (format === 'docx') {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await mammoth.extractRawText({ buffer });
    return {
      text: result.value,
      format,
      warnings: result.messages.map((message) => ({
        type: message.type,
        message: message.message
      }))
    };
  }

  return {
    text: await blob.text(),
    format,
    warnings: []
  };
}

export async function runTextImportJob(jobId: string) {
  const supabase = createSupabaseAdminClient();

  const { data: job, error: jobError } = await supabase
    .from('kg_import_jobs')
    .select('*')
    .eq('id', jobId)
    .single();

  if (jobError || !job) {
    throw jobError ?? new Error('Import job not found');
  }

  await supabase
    .from('kg_import_jobs')
    .update({ status: 'running', updated_at: new Date().toISOString() })
    .eq('id', jobId);

  try {
    const { bucket, path } = getStorageParts(job.source_path);
    const download = await supabase.storage.from(bucket).download(path);

    if (download.error || !download.data) {
      throw download.error ?? new Error('Storage download failed');
    }

    const sourceName = job.source_name ?? path.split('/').pop() ?? 'document.txt';
    const extracted = await extractTextFromBlob(download.data, sourceName);
    const title = getTitle(extracted.text, sourceName);
    const docId = `DOC:IMPORT:${slugify(jobId)}`;

    const { error: docError } = await supabase
      .from('kg_documents')
      .upsert({
        id: docId,
        type: 'DOCTYPE:L0:article',
        title,
        system_id: 'SYS:KUEPER:knowledge-graph',
        repo: 'supabase-storage',
        path: job.source_path,
        status: 'imported',
        visibility: job.default_visibility ?? 'restricted',
        data: {
          importJobId: job.id,
          sourceName,
          sourcePath: job.source_path,
          targetCollection: job.target_collection,
          defaultLanguage: job.default_language,
          content: extracted.text,
          format: extracted.format,
          extractionWarnings: extracted.warnings
        },
        indexed_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (docError) {
      throw docError;
    }

    await supabase
      .from('kg_import_jobs')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString(),
        indexed_at: new Date().toISOString(),
        data: {
          ...(job.data ?? {}),
          resultDocumentId: docId,
          sourceFormat: extracted.format,
          extractionWarnings: extracted.warnings,
          completedAt: new Date().toISOString()
        }
      })
      .eq('id', jobId);

    return { jobId, documentId: docId, title };
  } catch (error) {
    await supabase
      .from('kg_import_jobs')
      .update({
        status: 'failed',
        updated_at: new Date().toISOString(),
        data: {
          ...(job.data ?? {}),
          error: error instanceof Error ? error.message : 'Unknown runner error'
        }
      })
      .eq('id', jobId);

    throw error;
  }
}
