import { NextResponse } from 'next/server';
import { createImportJob } from '@/lib/imports/jobs';
import type { ImportJobKind } from '@/lib/imports/types';

export async function POST(request: Request) {
  const formData = await request.formData();

  const jobType = String(formData.get('jobType') ?? 'legacy_docx_import') as ImportJobKind;
  const sourceName = String(formData.get('sourceName') ?? '');
  const sourcePath = String(formData.get('sourcePath') ?? '');
  const targetCollection = String(formData.get('targetCollection') ?? 'COLL:DOC:kg');
  const defaultVisibility = String(formData.get('defaultVisibility') ?? 'restricted');
  const defaultLanguage = String(formData.get('defaultLanguage') ?? 'LANG:L0:de');

  try {
    const job = await createImportJob({
      jobType,
      sourceName,
      sourcePath,
      targetCollection,
      defaultVisibility,
      defaultLanguage
    });

    return NextResponse.redirect(new URL(`/admin/imports?created=${job.id}`, request.url), 303);
  } catch (error) {
    const message = encodeURIComponent(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.redirect(new URL(`/admin/imports?error=${message}`, request.url), 303);
  }
}
