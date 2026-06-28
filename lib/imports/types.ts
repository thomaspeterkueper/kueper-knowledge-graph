export type ImportJobStatus = 'pending' | 'running' | 'completed' | 'failed';

export type ImportJobKind = 'legacy_docx_import' | 'markdown_import' | 'html_pdf_export';

export type ImportJobRecord = {
  id: string;
  job_type: ImportJobKind;
  status: ImportJobStatus;
  source_name: string | null;
  source_path: string | null;
  target_collection: string | null;
  default_visibility: string | null;
  default_language: string | null;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
};
