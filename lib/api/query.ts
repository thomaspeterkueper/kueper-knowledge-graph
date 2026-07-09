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

function entityRegistryRecords() {
  return readJsonExport('exports/entity-registry-0.1.json').records ?? []
}

function systemRegistryRecords() {
  return readJsonExport('exports/system-registry-0.1.json').records ?? []
}

function relationRegistryRecords() {
  return readJsonExport('exports/relation-registry-0.1.json').records ?? []
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

export function resolveId(id: string) {
  const normalized = normalizeId(id)
  const registries = [
    { registry: 'entity-registry', records: entityRegistryRecords() },
    { registry: 'system-registry', records: systemRegistryRecords() },
    { registry: 'api-registry', records: apiRegistryRecords() },
  ]

  for (const registry of registries) {
    const record = registry.records.find((candidate: AnyRecord) => candidate.id === normalized)
    if (record) return { id: normalized, registry: registry.registry, record }
  }

  return null
}

export function findRelations(id: string) {
  const normalized = normalizeId(id)
  const relations: AnyRecord[] = relationRegistryRecords()

  return {
    id: normalized,
    incoming: relations.filter((relation) => relation.to === normalized),
    outgoing: relations.filter((relation) => relation.from === normalized),
  }
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
  const knowledgeDomains: AnyRecord[] = records.knowledgeDomains ?? []
  const knowledgeDomain = knowledgeDomains.find((kd) => kd.id === id) ?? null
  const relations = relationRegistryRecords().filter(
    (relation: AnyRecord) => relation.to === id && ['REQUIRES', 'COVERS'].includes(relation.relation),
  )
  const matchingDocumentIds = new Set(relations.map((relation: AnyRecord) => relation.from))

  return {
    knowledgeDomain,
    relations,
    documents: documents.filter((doc) => matchingDocumentIds.has(doc.id)),
  }
}

export function findModulesByCompetency(cmpId: string) {
  const id = normalizeId(cmpId)
  const records = learningModulesRecords()
  const competencies: AnyRecord[] = records.competencies ?? []
  const modules: AnyRecord[] = records.learning_modules ?? []
  const relations = relationRegistryRecords().filter(
    (relation: AnyRecord) => relation.to === id && relation.relation === 'TEACHES',
  )
  const moduleIds = new Set(relations.map((relation: AnyRecord) => relation.from))

  return {
    competency: competencies.find((cmp) => cmp.id === id) ?? null,
    relations,
    modules: modules.filter((module) => moduleIds.has(module.id) || module.dependencies?.related?.includes(id)),
  }
}

export function resolveApiRoute(path: string) {
  const normalized = normalizeId(path)
  const routes: AnyRecord[] = apiRegistryRecords()
  return routes.find((route) => route.path === normalized) ?? null
}
