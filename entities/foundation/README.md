# Foundation Entities

Produktive L0-Ebene des KUEPER Knowledge Graph.

Diese Dateien bilden die obersten Foundation Nodes. Sie sind keine Dokumente über Wissen, sondern Wissensknoten selbst.

Alle L1-Knoten muessen mindestens auf einen L0-Knoten zurueckfuehrbar sein.
Alle L2-Modelle muessen mindestens zwei L0- oder L1-Knoten verbinden.

## Ausnahme von der Entity-Validierung

`index.yaml` ist keine Entität, sondern eine Indexdatei ueber die Foundation Nodes.
Sie validiert nicht gegen `schemas/entity.schema.json` (kein `entity_id`, `typ`,
`name`) und ist von jeder Entity-Schema-Validierung ausdruecklich ausgenommen.
