import { getLearningPathForDocument, jsonError, jsonOk } from '@/lib/api/ota'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const result = getLearningPathForDocument(id)

  if (!result) {
    return jsonError('OTA_DOCUMENT_NOT_FOUND', `No OTA document found for id: ${decodeURIComponent(id)}`)
  }

  if (!result.learningPath) {
    return jsonError('OTA_LEARNING_PATH_NOT_FOUND', `No learning path found for OTA document: ${decodeURIComponent(id)}`)
  }

  return jsonOk(result)
}
