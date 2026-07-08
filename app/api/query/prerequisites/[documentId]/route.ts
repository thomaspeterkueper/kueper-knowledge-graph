import { findPrerequisites, queryError, queryOk } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ documentId: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { documentId } = await context.params
  const result = findPrerequisites(documentId)

  if (!result) {
    return queryError('findPrerequisites', 'DOCUMENT_NOT_FOUND', `No document found for id: ${decodeURIComponent(documentId)}`)
  }

  return queryOk('findPrerequisites', result)
}
