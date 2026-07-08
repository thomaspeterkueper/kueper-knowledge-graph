import kxf04 from '@/exports/kxf-0.4.json'
import learningPathsExport from '@/exports/kxf-learning-paths-0.1.json'

type AnyRecord = Record<string, any>

type ApiEnvelope<T> = {
  ok: boolean
  schema: string
  data?: T
  error?: {
    code: string
    message: string
  }
}

const API_SCHEMA = 'KUEPER-OTA-API-0.1'

const records = (kxf04 as AnyRecord).records ?? {}
const documents: AnyRecord[] = records.documents ?? []
const prerequisites: AnyRecord[] = records.prerequisites ?? []
const knowledgeDomains: AnyRecord[] = records.knowledgeDomains ?? []
const learningPaths: AnyRecord[] = (learningPathsExport as AnyRecord).records?.learning_paths ?? []

function normalizeId(value: string): string {
  return decodeURIComponent(value).trim()
}

export function jsonOk<T>(data: T): Response {
  const body: ApiEnvelope<T> = {
    ok: true,
    schema: API_SCHEMA,
    data,
  }

  return Response.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export function jsonError(code: string, message: string, status = 404): Response {
  const body: ApiEnvelope<never> = {
    ok: false,
    schema: API_SCHEMA,
    error: { code, message },
  }

  return Response.json(body, { status })
}

export function listOtaDocuments(searchParams?: URLSearchParams) {
  const status = searchParams?.get('status')
  const type = searchParams?.get('type')
  const q = searchParams?.get('q')?.toLowerCase()

  return documents.filter((doc) => {
    if (doc.system !== 'SYS:KUEPER:ota') return false
    if (status && String(doc.status).toLowerCase() !== status.toLowerCase()) return false
    if (type && String(doc.documentType ?? doc.type).toLowerCase() !== type.toLowerCase()) return false
    if (q) {
      const haystack = [doc.id, doc.title, doc.summary, doc.category, doc.series]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
}

export function getOtaDocument(id: string) {
  const normalized = normalizeId(id)
  return documents.find((doc) => doc.id === normalized || doc.canonicalId === normalized) ?? null
}

export function getPrerequisitesForDocument(id: string) {
  const doc = getOtaDocument(id)
  if (!doc) return null

  const prereqRecords = prerequisites
    .filter((req) => req.from === doc.id)
    .map((req) => ({
      ...req,
      knowledgeDomain: knowledgeDomains.find((domain) => domain.id === req.to) ?? null,
    }))

  return {
    document: doc,
    prerequisites: prereqRecords,
  }
}

export function getLearningPathForDocument(id: string) {
  const doc = getOtaDocument(id)
  if (!doc) return null

  const directPathId = `PATH:OTA:${doc.canonicalId ?? doc.id.replace('DOC:OTA:', '')}:READ`
  const path =
    learningPaths.find((candidate) => candidate.id === directPathId) ??
    learningPaths.find((candidate) => candidate.archiveDocuments?.includes(doc.id)) ??
    null

  return {
    document: doc,
    learningPath: path,
  }
}

export function getAvailableOtaApiRoutes() {
  return [
    { path: '/api/ota/documents', description: 'List OTA document metadata records.' },
    { path: '/api/ota/documents/{id}', description: 'Read one OTA document metadata record by DOC:OTA id or OTA canonical id.' },
    { path: '/api/ota/documents/{id}/prerequisites', description: 'List prerequisites for one OTA document.' },
    { path: '/api/ota/documents/{id}/learning-path', description: 'Resolve the learning path associated with one OTA document.' },
  ]
}
