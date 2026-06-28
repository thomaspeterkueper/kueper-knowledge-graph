import { createSupabaseAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function countRows(table: string) {
  const supabase = createSupabaseAdminClient();
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) {
    return { table, count: null, error: error.message };
  }

  return { table, count: count ?? 0, error: null };
}

export default async function GraphStatusPage() {
  const tables = [
    'kg_entities',
    'kg_relations',
    'kg_documents',
    'kg_systems',
    'kg_domains',
    'kg_media_assets',
    'kg_requests',
    'kg_mappings',
    'kg_exports',
    'kg_import_log',
    'kg_import_jobs'
  ];

  const rows = await Promise.all(tables.map(countRows));

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Graph Status</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th align="left">Tabelle</th><th align="left">Anzahl</th><th align="left">Status</th></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.table}>
              <td style={{ padding: 8, borderTop: '1px solid #ddd' }}>{row.table}</td>
              <td style={{ padding: 8, borderTop: '1px solid #ddd' }}>{row.count ?? '-'}</td>
              <td style={{ padding: 8, borderTop: '1px solid #ddd' }}>{row.error ?? 'ok'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
