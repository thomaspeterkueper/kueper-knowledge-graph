import { createSupabaseAdminClient } from '@/lib/supabase/server';
import type { ImportJobKind } from './types';

export async function listImportJobs() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('kg_import_jobs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createImportJob(input: {
  jobType: ImportJobKind;
  sourceName?: string;
  sourcePath?: string;
  targetCollection?: string;
  defaultVisibility?: string;
  defaultLanguage?: string;
}) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('kg_import_jobs')
    .insert({
      job_type: input.jobType,
      status: 'pending',
      source_name: input.sourceName ?? null,
      source_path: input.sourcePath ?? null,
      target_collection: input.targetCollection ?? null,
      default_visibility: input.defaultVisibility ?? 'restricted',
      default_language: input.defaultLanguage ?? 'LANG:L0:de',
      data: {}
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
}
