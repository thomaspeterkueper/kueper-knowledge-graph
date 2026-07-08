import { getOtaDocument, jsonError, jsonOk } from '@/lib/api/ota'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const document = getOtaDocument(id)

  if (!document) {
    return jsonError('OTA_DOCUMENT_NOT_FOUND', `No OTA document found for id: ${decodeURIComponent(id)}`)
  }

  return jsonOk({ document })
}
