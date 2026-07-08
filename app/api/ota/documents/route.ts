import { jsonOk, listOtaDocuments } from '@/lib/api/ota'

export const dynamic = 'force-static'

export async function GET(request: Request) {
  const url = new URL(request.url)
  return jsonOk({
    documents: listOtaDocuments(url.searchParams),
  })
}
