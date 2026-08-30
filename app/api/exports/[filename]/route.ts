import { NextResponse } from 'next/server';

import kxf01 from '../../../../exports/kxf-0.1.json';
import kxf06 from '../../../../exports/kxf-0.6.json';
import learningModules from '../../../../exports/kxf-learning-modules-0.1.json';
import knowledgeDomains from '../../../../exports/knowledge-domains-0.1.json';

export const dynamic = 'force-dynamic';

const EXPORTS: Record<string, unknown> = {
  'kxf-0.1.json': kxf01,
  'kxf-0.6.json': kxf06,
  'kxf-learning-modules-0.1.json': learningModules,
  'knowledge-domains-0.1.json': knowledgeDomains,
};

type RouteContext = {
  params: Promise<{ filename: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { filename } = await context.params;
  const payload = EXPORTS[filename];

  if (!payload) {
    return NextResponse.json(
      {
        error: 'unknown_export',
        filename,
        allowed: Object.keys(EXPORTS),
      },
      { status: 404 }
    );
  }

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-KUEPER-Export-Source': 'canonical-repository-export',
    },
  });
}
