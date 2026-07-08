import { getAvailableOtaApiRoutes, jsonOk } from '@/lib/api/ota'

export const dynamic = 'force-static'

export async function GET() {
  return jsonOk({
    name: 'KUEPER OTA API',
    version: '0.1',
    routes: getAvailableOtaApiRoutes(),
  })
}
