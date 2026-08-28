import type {
  EvoCandidateRow,
  EvoCandidateTypeRow,
  EvoInterpretationRow,
  EvoReasoningRow,
  EvoSourceRow,
  EvoTargetRow
} from './types';

/**
 * Pure markdown builder for emitted request artifacts. Kept free of any
 * client/IO so the format is directly testable.
 *
 * Format follows the ADR-/request format used between the ecosystem repos
 * (see e.g. `external-tasks/open/KG-REQ-20260824-evolution-engine-schema.md`
 * as template): YAML frontmatter plus the fieldset Anlass, Quelle,
 * wissenschaftliche Aussage, Extrapolationsanteil, Gameplay-Nutzen,
 * betroffene Systeme.
 */

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'request'
  );
}

export interface RequestMarkdownInput {
  requestCode: string;
  target: EvoTargetRow;
  candidateType: EvoCandidateTypeRow;
  interpretation: EvoInterpretationRow;
  candidate: EvoCandidateRow;
  source: EvoSourceRow;
  reasoning: EvoReasoningRow;
  created: string;
}

function nonEmpty(value: string | null | undefined): string | null {
  const cleaned = value?.trim() ?? '';
  return cleaned === '' ? null : cleaned;
}

/** YAML-Plain-Scalar, falls der Titel Sonderzeichen enthaelt. */
function yamlScalar(value: string): string {
  if (/^[A-Za-z0-9 _\-.,/()]+$/.test(value)) return value;
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

export function buildRequestMarkdown(input: RequestMarkdownInput): string {
  const { requestCode, target, candidateType, interpretation, source, reasoning, created } = input;

  const frontmatter = [
    '---',
    `id: ${requestCode}`,
    `title: ${yamlScalar(interpretation.title)}`,
    'status: open',
    'source: KG (Evolution Engine)',
    `target: ${target.code.toUpperCase()}`,
    `created: ${created}`,
    'requested_by: evolution-engine',
    `affects: [${target.code.toUpperCase()}, KG]`,
    `candidate_type: ${candidateType.type_code}`,
    '---'
  ].join('\n');

  const sourceLines = [
    nonEmpty(source.source_system) && `- System: ${source.source_system}`,
    nonEmpty(source.source_type) && `- Typ: ${source.source_type}`,
    nonEmpty(source.source_ref) && `- Referenz: ${source.source_ref}`,
    nonEmpty(source.source_revision) && `- Revision: ${source.source_revision}`,
    nonEmpty(source.source_epistemics) && `- Epistemik: ${source.source_epistemics}`,
    nonEmpty(source.topic) && `- Thema: ${source.topic}`
  ].filter((line): line is string => typeof line === 'string');

  const sections = [
    `# ${requestCode} — ${interpretation.title}`,
    '',
    '## Anlass',
    nonEmpty(reasoning.trigger_summary) ?? '',
    '',
    '## Quelle',
    ...(sourceLines.length > 0 ? sourceLines : ['- (keine Angabe)']),
    '',
    '## Wissenschaftliche Aussage',
    nonEmpty(reasoning.scientific_claim) ?? '',
    '',
    '## Extrapolationsanteil',
    nonEmpty(reasoning.extrapolation_delta) ?? ''
  ];

  const optionalSections: Array<[string, string | null | undefined]> = [
    ['Historische Basis', reasoning.historical_basis],
    ['Fiktionaler Anteil', reasoning.fictional_delta],
    ['Kanon-Status', reasoning.canon_status]
  ];
  for (const [heading, value] of optionalSections) {
    const cleaned = nonEmpty(value);
    if (cleaned) {
      sections.push('', `## ${heading}`, cleaned);
    }
  }

  sections.push(
    '',
    '## Gameplay-Nutzen',
    nonEmpty(reasoning.gameplay_benefit) ?? '',
    '',
    '## Betroffene Systeme',
    ...(reasoning.affected_systems.length > 0
      ? reasoning.affected_systems.map((system) => `- ${system}`)
      : ['- (keine Angabe)'])
  );

  return `${frontmatter}\n\n${sections.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

/**
 * Full request view used by emitRequest: the interpretation joined with all
 * rows needed to render the artifact.
 */
export interface RequestView {
  requestCode: string;
  target: EvoTargetRow;
  candidateType: EvoCandidateTypeRow;
  interpretation: EvoInterpretationRow;
  candidate: EvoCandidateRow;
  source: EvoSourceRow;
  reasoning: EvoReasoningRow;
}

export function buildRequestArtifact(view: RequestView, created: string): { content: string; filePath: string } {
  const { requestCode, target, interpretation } = view;
  const fileName = `${requestCode}-${slugify(interpretation.title)}.md`;
  const requestPath = (target.request_path ?? '').replace(/^\/+|\/+$/g, '');
  const filePath = requestPath ? `${requestPath}/${fileName}` : fileName;
  return {
    content: buildRequestMarkdown({ ...view, created }),
    filePath
  };
}
