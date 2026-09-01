# KG decision: NOXIA / OTA building object identities

**Decision ID:** KG-NOX-20260901-BUILDING-OBJECT-IDENTITIES  
**Origin:** OTA PR #36 / KG issue #101  
**Status:** accepted for integration

## Principle

The Knowledge Graph owns stable shared identities and relations. Existing `BLD:NOX:*` records are gameplay/building identities and MUST NOT be replaced by OTA document signatures. OTA dossiers describe technical/canonical systems; NOXIA references them as provenance. A building may implement or specialize a technical system without being identical to its dossier.

## Decisions

| NOXIA key | KG identity decision | OTA action |
| --- | --- | --- |
| `mine` | Reuse existing `BLD:NOX:mine-1` as the NOXIA building identity. It requires a generic extraction-system technical dossier; it is not identical to a particular Tharsis installation. | Create dedicated generic extraction/mining OTA-TEC dossier. |
| `solar` | Reuse existing `BLD:NOX:solarfeld-1`. Solar generation is a distinct technical class and not a variant of the Tharsis fission architecture. | Create dedicated solar-field OTA-TEC dossier. |
| `laboratory` | Generic `laboratory` is a superclass/gameplay abstraction. Existing `BLD:NOX:biolabor-1` is one specialization and MUST NOT be treated as the identity of every laboratory. | Create a generic laboratory technical dossier; biological laboratory may reference/specialize it. |
| `scanner` | No suitable existing shared building identity was found. Establish `BLD:NOX:scanner-1` as the stable NOXIA building identity, with technical provenance supplied by a dedicated sensing/scanning dossier. | Create dedicated scanner/surface-sensing OTA-TEC dossier. |
| `factory` | Generic gameplay superclass. Do not collapse it into a Tharsis workshop or material complex. Concrete factories may implement one or more manufacturing/process dossiers. | No generic physical-object identity claim against Tharsis. Create a generic manufacturing-facility dossier only if OTA needs cross-work specificity. |
| `ice_drill` | Specialization of extraction, not identical to generic mine and not identical to the Tharsis water-ISRU complex. Relation: extraction installation feeding a water/volatile processing chain. | Reference generic extraction dossier plus existing water/ISRU dossier where appropriate; dedicated ice-drill dossier only if drilling mechanics require it. |
| `habitat` | Reuse existing `BLD:NOX:mars-habitat-1` for the first Mars-habitat gameplay identity. It is a member/implementation of the broader habitat technical class, not identical to a Tharsis habitat cluster. | Existing Tharsis habitat dossier may be referenced as a Mars implementation; generic habitat provenance should remain distinct from the cluster instance. |
| `residential_block` | Gameplay specialization of habitation. Do not equate it with `BLD:NOX:mars-habitat-1` or a Tharsis habitat cluster. | Reference a generic habitat/habitation dossier when available; no new technical dossier unless residential-block engineering differs materially. |
| `smelter` | Reuse existing `BLD:NOX:schmelze-1`. It is a specialization of material processing and is not identical to the complete Tharsis material/reststoff complex. | Existing material-processing dossier may be referenced at system level; create a dedicated smelting dossier only when process-specific canon is required. |

## Relation semantics

Use these semantics when exporting the decision into KXF/consumer mappings:

- `implements`: a NOXIA building realizes a technical system described by OTA.
- `specializes`: a building/class narrows a more general technical or gameplay class.
- `partOf`: a component belongs to a larger technical installation.
- `references`: provenance/reference only; no identity equivalence.

Do **not** use identity equivalence between `BLD:NOX:*` and `DOC:OTA:*` / `OTA-TEC-*` identifiers.

## Immediate consequences

1. OTA may author new generic dossiers for **mine/extraction**, **solar field**, **generic laboratory**, and **scanner/surface sensing** without waiting for new gameplay identities.
2. `scanner` receives stable KG/NOXIA identity `BLD:NOX:scanner-1`.
3. Existing `BLD:NOX:mine-1`, `BLD:NOX:solarfeld-1`, `BLD:NOX:biolabor-1`, `BLD:NOX:mars-habitat-1`, and `BLD:NOX:schmelze-1` remain valid and are not replaced.
4. `factory`, `ice_drill`, `habitat`, `residential_block`, and `smelter` must use explicit relation semantics instead of being silently collapsed onto Tharsis-specific dossiers.
5. NOXIA balancing, costs, build times, production rates, unlocks and runtime state remain outside KG/OTA technical canon.
