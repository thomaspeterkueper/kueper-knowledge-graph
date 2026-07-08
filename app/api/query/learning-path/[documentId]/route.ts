import { findLearningPath, queryError, queryOk } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ documentId: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { documentId } = await context.params
  const result = findLearningPath(documentId)

  if (!result) {
    return queryError('findLearningPath', 'DOCUMENT_NOT_FOUND', `No document found for id: ${decodeURIComponent(documentId)}`)
  }

  if (!result.learningPath) {
    return queryError('findLearningPath', 'LEARNING_PATH_NOT_FOUND', `No learning path found for document: ${decodeURIComponent(documentId)}`)
  }

  return queryOk('findLearningPath', result)
}
