import { documentError, documentOk, getDocumentReference } from '@/lib/api/documents'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const document = getDocumentReference(id)

  if (!document) {
    return documentError('DOCUMENT_NOT_FOUND', `No document reference found for id: ${decodeURIComponent(id)}`)
  }

  return documentOk({ document })
}
