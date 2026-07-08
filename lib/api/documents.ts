import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type AnyRecord = Record<string, any>

type DocumentEnvelope<T> = {
  ok: boolean
  schema: string
  data?: T
  error?: {
    code: string
    message: string
  }
}

const DOCUMENT_API_SCHEMA = 'KUEPER-DOCUMENT-API-0.1'
const ROOT = process.cwd()

function readJsonExport(path: string): AnyRecord {
  const raw = readFileSync(join(ROOT, path), 'utf8')
  return JSON.parse(raw) as AnyRecord
}

function getDocumentReferenceExport() {
  return readJsonExport('exports/document-references-0.1.json')
}

function getRecords(): AnyRecord[] {
  return getDocumentReferenceExport().records ?? []
}

function normalizeId(value: string): string {
  return decodeURIComponent(value).trim()
}

export function documentOk<T>(data: T): Response {
  const body: DocumentEnvelope<T> = {
    ok: true,
    schema: DOCUMENT_API_SCHEMA,
    data,
  }

  return Response.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export function documentError(code: string, message: string, status = 404): Response {
  const body: DocumentEnvelope<never> = {
    ok: false,
    schema: DOCUMENT_API_SCHEMA,
    error: { code, message },
  }

  return Response.json(body, { status })
}

export function listDocumentReferences(searchParams?: URLSearchParams) {
  const system = searchParams?.get('system')
  const status = searchParams?.get('status')
  const type = searchParams?.get('type')
  const q = searchParams?.get('q')?.toLowerCase()

  return getRecords().filter((doc) => {
    if (system && String(doc.system).toLowerCase() !== system.toLowerCase()) return false
    if (status && String(doc.status).toLowerCase() !== status.toLowerCase()) return false
    if (type && String(doc.documentType ?? doc.type).toLowerCase() !== type.toLowerCase()) return false
    if (q) {
      const haystack = [doc.id, doc.canonicalId, doc.title, doc.summary, doc.documentType, doc.system]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function getDocumentReference(id: string) {
  const normalized = normalizeId(id)
  return getRecords().find((doc) => doc.id === normalized || doc.canonicalId === normalized) ?? null
}

export function getDocumentApiIndex() {
  return {
    name: 'KUEPER Document API',
    version: '0.1',
    routes: [
      { path: '/api/documents', description: 'List KG document references.' },
      { path: '/api/documents/{id}', description: 'Read one KG document reference by DOC id or canonical id.' },
    ],
  }
}
