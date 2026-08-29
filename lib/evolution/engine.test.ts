import assert from 'node:assert/strict';
import test from 'node:test';

import {
  attachReasoning,
  emitRequest,
  generateCandidate,
  ingestSource,
  interpretForTarget
} from './engine';
import { EvolutionError, type EvolutionClient } from './types';

type Row = Record<string, any>;
type Tables = Record<string, Row[]>;

class FakeQuery {
  private readonly filters: Array<(row: Row) => boolean> = [];
  private insertValue: Row | null = null;
  private selected = '*';

  constructor(
    private readonly table: string,
    private readonly tables: Tables
  ) {}

  select(fields = '*') {
    this.selected = fields;
    return this;
  }

  insert(value: Row) {
    this.insertValue = { ...value };
    return this;
  }

  eq(field: string, value: unknown) {
    this.filters.push((row) => row[field] === value);
    return this;
  }

  like(field: string, pattern: string) {
    const regex = new RegExp(`^${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*')}$`);
    this.filters.push((row) => regex.test(String(row[field] ?? '')));
    return this;
  }

  private rows(): Row[] {
    return (this.tables[this.table] ?? []).filter((row) => this.filters.every((filter) => filter(row)));
  }

  private project(row: Row): Row {
    if (this.selected === '*' || !this.selected.trim()) return { ...row };
    const keys = this.selected.split(',').map((field) => field.trim());
    return Object.fromEntries(keys.map((key) => [key, row[key]]));
  }

  private materializeInsert(): Row {
    const rows = (this.tables[this.table] ??= []);
    const value = { ...(this.insertValue ?? {}) };
    const serial = rows.length + 1;

    if (!('id' in value) && this.table !== 'evo_interpretation_reasoning') {
      value.id = `${this.table}-${serial}`;
    }
    if (this.table === 'evo_sources' && !('ingested_at' in value)) {
      value.ingested_at = '2026-08-29T00:00:00.000Z';
    }
    if (
      ['evo_candidates', 'evo_target_interpretations', 'evo_requests'].includes(this.table) &&
      !('created_at' in value)
    ) {
      value.created_at = '2026-08-29T00:00:00.000Z';
    }
    if (this.table === 'evo_interpretation_reasoning' && !('canon_status' in value)) {
      value.canon_status = null;
    }

    rows.push(value);
    this.insertValue = null;
    return value;
  }

  async single() {
    if (this.insertValue) {
      return { data: this.project(this.materializeInsert()), error: null };
    }
    const rows = this.rows();
    if (rows.length !== 1) {
      return { data: null, error: { message: `expected one row in ${this.table}, got ${rows.length}` } };
    }
    return { data: this.project(rows[0]), error: null };
  }

  async maybeSingle() {
    const rows = this.rows();
    if (rows.length > 1) {
      return { data: null, error: { message: `expected at most one row in ${this.table}, got ${rows.length}` } };
    }
    return { data: rows[0] ? this.project(rows[0]) : null, error: null };
  }

  then<TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: { data: Row[]; error: null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const result = { data: this.rows().map((row) => this.project(row)), error: null as null };
    return Promise.resolve(result).then(onfulfilled ?? undefined, onrejected ?? undefined);
  }
}

function makeClient(tables: Tables): EvolutionClient {
  return {
    from(table: string) {
      return new FakeQuery(table, tables) as any;
    }
  } as EvolutionClient;
}

test('Evolution Engine completes deterministic source-to-NOXIA dry-run without automatic canon mutation', async () => {
  const tables: Tables = {
    evo_targets: [
      {
        id: 'target-noxia',
        code: 'noxia',
        label: 'NOXIA',
        repo_ref: 'thomaspeterkueper/noxiagame',
        request_path: 'external-tasks/open/',
        request_prefix: 'NOXIA-REQUEST',
        kind: 'game'
      }
    ],
    evo_target_candidate_types: [
      {
        id: 'type-technology',
        target_id: 'target-noxia',
        type_code: 'technology',
        description: 'Technology'
      }
    ],
    evo_sources: [],
    evo_candidates: [],
    evo_target_interpretations: [],
    evo_interpretation_reasoning: [],
    evo_requests: []
  };
  const client = makeClient(tables);

  const source = await ingestSource(
    {
      source_system: 'KG',
      source_type: 'research-candidate',
      source_ref: 'RES-TEST-001',
      source_revision: '1',
      source_epistemics: 'fact',
      topic: 'closed-loop water recycling',
      content_snapshot: 'Water can be recovered and recirculated in a closed loop.'
    },
    client
  );

  const candidate = await generateCandidate(
    source.id,
    {
      title: 'Closed-loop water recycling',
      summary: 'Target-neutral water-recovery candidate.'
    },
    client
  );

  const interpretation = await interpretForTarget(
    candidate.id,
    'target-noxia',
    {
      candidate_type_code: 'technology',
      title: 'Closed-loop water recycling',
      description: 'A NOXIA technology interpretation of the source candidate.'
    },
    client
  );

  const reasoning = await attachReasoning(
    interpretation.id,
    {
      trigger_summary: 'Relevant closed-loop water source identified.',
      scientific_claim: 'Water recovery reduces fresh-water demand.',
      extrapolation_delta: 'Mapped to a gameplay technology.',
      gameplay_benefit: 'Adds a resource-efficiency progression path.',
      affected_systems: ['NOXIA', 'KG']
    },
    client
  );

  assert.equal(reasoning.canon_status, null, 'engine must not set canon_status');

  await assert.rejects(
    () => emitRequest(interpretation.id, { dryRun: true }, client),
    (error: unknown) => error instanceof EvolutionError && /manual approval is required/.test(error.message)
  );

  const storedInterpretation = tables.evo_target_interpretations.find((row) => row.id === interpretation.id);
  assert.ok(storedInterpretation);
  storedInterpretation.status = 'accepted';

  const emitted = await emitRequest(interpretation.id, { dryRun: true }, client);

  assert.equal(emitted.dryRun, true);
  assert.equal(emitted.request, null);
  assert.equal(emitted.requestCode, 'NOXIA-REQUEST-0001');
  assert.equal(
    emitted.filePath,
    'external-tasks/open/NOXIA-REQUEST-0001-closed-loop-water-recycling.md'
  );
  assert.match(emitted.content, /status: open/);
  assert.match(emitted.content, /target: NOXIA/);
  assert.match(emitted.content, /## Wissenschaftliche Aussage/);
  assert.doesNotMatch(emitted.content, /## Kanon-Status/);
  assert.equal(tables.evo_requests.length, 0, 'dry-run must not persist evo_requests');
});
