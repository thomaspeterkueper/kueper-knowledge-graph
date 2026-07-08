import { findModulesByCompetency, queryOk } from '@/lib/api/query'

type RouteContext = {
  params: Promise<{ cmpId: string }>
}

export async function GET(_request: Request, context: RouteContext) {
  const { cmpId } = await context.params
  return queryOk('findModulesByCompetency', findModulesByCompetency(cmpId))
}
