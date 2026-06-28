import { listImportJobs } from '@/lib/imports/jobs';

export const dynamic = 'force-dynamic';

export default async function ImportCenterPage() {
  let jobs = [] as any[];
  let errorMessage = '';

  try {
    jobs = await listImportJobs();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error';
  }

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Import Center</h1>
      <p>Arbeitsraum fuer DOCX-, Markdown- und HTML/PDF-Importlaeufe.</p>
      {errorMessage ? <p style={{ color: 'darkred' }}>{errorMessage}</p> : null}

      <section style={{ border: '1px solid #ccc', borderRadius: 12, padding: 20 }}>
        <h2>Neuen Import-Job anlegen</h2>
        <form action="/api/import-jobs" method="post" style={{ display: 'grid', gap: 10, maxWidth: 620 }}>
          <label>Job Type<input name="jobType" defaultValue="legacy_docx_import" /></label>
          <label>Source Name<input name="sourceName" placeholder="Dateiname oder Batchname" /></label>
          <label>Source Path<input name="sourcePath" placeholder="storage/imports/..." /></label>
          <label>Target Collection<input name="targetCollection" defaultValue="COLL:DOC:kg" /></label>
          <label>Default Visibility<input name="defaultVisibility" defaultValue="restricted" /></label>
          <label>Default Language<input name="defaultLanguage" defaultValue="LANG:L0:de" /></label>
          <button type="submit">Import-Job anlegen</button>
        </form>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Letzte Import-Jobs</h2>
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>{job.id} - {job.job_type} - {job.status}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
