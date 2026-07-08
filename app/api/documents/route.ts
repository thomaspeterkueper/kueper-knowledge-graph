import { documentOk, listDocumentReferences } from '@/lib/api/documents'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const documents = listDocumentReferences(url.searchParams)

  return documentOk({
    count: documents.length,
    documents,
  })
}
