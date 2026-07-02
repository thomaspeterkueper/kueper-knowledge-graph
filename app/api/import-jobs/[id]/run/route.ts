import { NextResponse } from 'next/server';
import { runTextImportJob } from '@/lib/imports/runner';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const result = await runTextImportJob(id);
    return NextResponse.redirect(new URL(`/admin/imports?completed=${result.documentId}`, request.url), 303);
  } catch (error) {
    const message = encodeURIComponent(error instanceof Error ? error.message : 'Unknown runner error');
    return NextResponse.redirect(new URL(`/admin/imports?error=${message}`, request.url), 303);
  }
}
