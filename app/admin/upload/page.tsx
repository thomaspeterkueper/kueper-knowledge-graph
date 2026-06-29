export const dynamic = 'force-dynamic';

export default function UploadPage() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Upload</h1>
      <p>Datei in den privaten Supabase-Storage-Bucket imports hochladen und automatisch einen Import-Job anlegen.</p>

      <form action="/api/uploads" method="post" encType="multipart/form-data" style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
        <label>Job Type<input name="jobType" defaultValue="legacy_docx_import" /></label>
        <label>Target Collection<input name="targetCollection" defaultValue="COLL:DOC:kg" /></label>
        <label>Default Visibility<input name="defaultVisibility" defaultValue="restricted" /></label>
        <label>Default Language<input name="defaultLanguage" defaultValue="LANG:L0:de" /></label>
        <label>Datei<input name="file" type="file" /></label>
        <button type="submit">Hochladen und Job anlegen</button>
      </form>
    </main>
  );
}
