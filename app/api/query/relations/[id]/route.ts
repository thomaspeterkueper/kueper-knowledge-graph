import { findRelations, queryOk } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params
  return queryOk('findRelations', findRelations(id))
}
