import { findDocumentsByKnowledgeDomain, queryOk } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ kdId: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { kdId } = await context.params
  return queryOk('findDocumentsByKnowledgeDomain', findDocumentsByKnowledgeDomain(kdId))
}
