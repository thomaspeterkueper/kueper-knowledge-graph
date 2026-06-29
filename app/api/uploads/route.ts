import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.redirect(new URL('/admin/upload?error=no-file', request.url), 303);
  }

  const jobType = String(formData.get('jobType') ?? 'legacy_docx_import');
  const targetCollection = String(formData.get('targetCollection') ?? 'COLL:DOC:kg');
  const defaultVisibility = String(formData.get('defaultVisibility') ?? 'restricted');
  const defaultLanguage = String(formData.get('defaultLanguage') ?? 'LANG:L0:de');

  const supabase = createSupabaseAdminClient();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `legacy/${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const upload = await supabase.storage
    .from('imports')
    .upload(storagePath, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false
    });

  if (upload.error) {
    const message = encodeURIComponent(upload.error.message);
    return NextResponse.redirect(new URL(`/admin/upload?error=${message}`, request.url), 303);
  }

  const { data, error } = await supabase
    .from('kg_import_jobs')
    .insert({
      job_type: jobType,
      status: 'pending',
      source_name: file.name,
      source_path: `imports/${storagePath}`,
      target_collection: targetCollection,
      default_visibility: defaultVisibility,
      default_language: defaultLanguage,
      data: {
        bucket: 'imports',
        storagePath,
        mimeType: file.type || null,
        size: file.size
      }
    })
    .select('id')
    .single();

  if (error) {
    const message = encodeURIComponent(error.message);
    return NextResponse.redirect(new URL(`/admin/upload?error=${message}`, request.url), 303);
  }

  return NextResponse.redirect(new URL(`/admin/imports?created=${data.id}`, request.url), 303);
}
