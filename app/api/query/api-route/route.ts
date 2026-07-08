import { queryError, queryOk, resolveApiRoute } from '@/lib/api/query'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path')

  if (!path) {
    return queryError('resolveApiRoute', 'MISSING_PATH', 'Query parameter "path" is required.', 400)
  }

  const route = resolveApiRoute(path)

  if (!route) {
    return queryError('resolveApiRoute', 'API_ROUTE_NOT_FOUND', `No API route registered for path: ${path}`)
  }

  return queryOk('resolveApiRoute', { route })
}
