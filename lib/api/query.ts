import { readFileSync } from 'node:fs'
import { join } from 'node:path'

type AnyRecord = Record<string, any>

type QueryEnvelope<T> = {
  ok: boolean
  schema: string
  query: string
  data?: T
  error?: {
    code: string
    message: string
  }
}

const QUERY_SCHEMA = 'KUEPER-QUERY-API-0.1'
const ROOT = process.cwd()

function readJsonExport(path: string): AnyRecord {
  const raw = readFileSync(join(ROOT, path), 'utf8')
  return JSON.parse(raw) as AnyRecord
}

function kxf03Records() {
  return readJsonExport('exports/kxf-0.3.json').records ?? {}
}

function learningModulesRecords() {
  return readJsonExport('exports/kxf-learning-modules-0.1.json').records ?? {}
}

function learningPathsRecords() {
  return readJsonExport('exports/kxf-learning-paths-0.1.json').records ?? {}
}

function apiRegistryRecords() {
  return readJsonExport('exports/api-registry-0.1.json').records ?? []
}

function normalizeId(value: string): string {
  return decodeURIComponent(value).trim()
}

export function queryOk<T>(query: string, data: T): Response {
  const body: QueryEnvelope<T> = {
    ok: true,
    schema: QUERY_SCHEMA,
    query,
    data,
  }

  return Response.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

export function queryError(query: string, code: string, message: string, status = 404): Response {
  const body: QueryEnvelope<never> = {
    ok: false,
    schema: QUERY_SCHEMA,
    query,
    error: { code, message },
  }

  return Response.json(body, { status })
}

export function findDocument(documentId: string) {
  const id = normalizeId(documentId)
  const documents: AnyRecord[] = kxf03Records().documents ?? []
  return documents.find((doc) => doc.id === id || doc.canonicalId === id) ?? null
}

export function findPrerequisites(documentId: string) {
  const document = findDocument(documentId)
  if (!document) return null

  const records = kxf03Records()
  const prerequisites: AnyRecord[] = records.prerequisites ?? []
  const knowledgeDomains: AnyRecord[] = records.knowledgeDomains ?? []

  return {
    document,
    prerequisites: prerequisites
      .filter((req) => req.from === document.id)
      .map((req) => ({
        ...req,
        knowledgeDomain: knowledgeDomains.find((kd) => kd.id === req.to) ?? null,
      })),
  }
}

export function findLearningPath(documentId: string) {
  const document = findDocument(documentId)
  if (!document) return null

  const paths: AnyRecord[] = learningPathsRecords().learning_paths ?? []
  const directPathId = `PATH:OTA:${document.canonicalId ?? document.id.replace('DOC:OTA:', '')}:READ`

  return {
    document,
    learningPath:
      paths.find((path) => path.id === directPathId) ??
      paths.find((path) => path.archiveDocuments?.includes(document.id)) ??
      null,
  }
}

export function findDocumentsByKnowledgeDomain(kdId: string) {
  const id = normalizeId(kdId)
  const records = kxf03Records()
  const documents: AnyRecord[] = records.documents ?? []
  const prerequisites: AnyRecord[] = records.prerequisites ?? []
  const knowledgeDomains: AnyRecord[] = records.knowledgeDomains ?? []
  const knowledgeDomain = knowledgeDomains.find((kd) => kd.id === id) ?? null
  const matchingPrerequisites = prerequisites.filter((req) => req.to === id)
  const matchingDocumentIds = new Set(matchingPrerequisites.map((req) => req.from))

  return {
    knowledgeDomain,
    prerequisites: matchingPrerequisites,
    documents: documents.filter((doc) => matchingDocumentIds.has(doc.id)),
  }
}

export function findModulesByCompetency(cmpId: string) {
  const id = normalizeId(cmpId)
  const records = learningModulesRecords()
  const competencies: AnyRecord[] = records.competencies ?? []
  const modules: AnyRecord[] = records.learning_modules ?? []

  return {
    competency: competencies.find((cmp) => cmp.id === id) ?? null,
    modules: modules.filter((module) => module.dependencies?.related?.includes(id)),
  }
}

export function resolveApiRoute(path: string) {
  const normalized = normalizeId(path)
  const routes: AnyRecord[] = apiRegistryRecords()
  return routes.find((route) => route.path === normalized) ?? null
}
