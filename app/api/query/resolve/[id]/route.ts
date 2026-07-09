import { queryError, queryOk, resolveId } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  const result = resolveId(id)

  if (!result) {
    return queryError('resolve', 'ID_NOT_FOUND', `No registry record found for id: ${decodeURIComponent(id)}`)
  }

  return queryOk('resolve', result)
}
