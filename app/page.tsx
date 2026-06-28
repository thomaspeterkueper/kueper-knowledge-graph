import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: 32, fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 12, color: '#64748b' }}>
        KUEPER Knowledge Graph
      </p>
      <h1 style={{ fontSize: 42, lineHeight: 1.1, marginBottom: 16 }}>
        Master Graph, Import Center und kuratierte Exporte
      </h1>
      <p style={{ fontSize: 18, color: '#334155', lineHeight: 1.6 }}>
        Dieses Portal ist der operative Einstieg in den KUEPER Knowledge Graph. Das Git-Repository bleibt die kanonische Quelle; Supabase dient als Index und Arbeitsdatenbank.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <Link href="/admin/imports" style={{ padding: '12px 16px', borderRadius: 10, background: '#0f172a', color: 'white', textDecoration: 'none' }}>
          Import Center öffnen
        </Link>
        <Link href="/admin/graph" style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none' }}>
          Graph Status
        </Link>
      </div>
    </main>
  );
}
