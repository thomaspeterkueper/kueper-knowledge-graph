import importlib.util
import json
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'kg_curator.py'
spec = importlib.util.spec_from_file_location('kg_curator', SCRIPT)
curator = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = curator
spec.loader.exec_module(curator)

class KgCuratorTests(unittest.TestCase):
    def write_fixture(self, root: Path, learning: dict, registry: dict):
        (root / 'exports').mkdir(parents=True)
        (root / 'exports' / 'kxf-learning-modules-0.1.json').write_text(json.dumps(learning), encoding='utf-8')
        (root / 'exports' / 'entity-registry-0.1.json').write_text(json.dumps(registry), encoding='utf-8')

    def test_valid_graph_has_no_findings(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_fixture(root,
                {'records': {'learning_modules': [
                    {'id': 'PHY-L1-000001', 'dependencies': {'requires': []}},
                    {'id': 'PHY-L2-000001', 'dependencies': {'requires': ['PHY-L1-000001']}}
                ]}},
                {'records': [{'id': 'DOC:TEST:1', 'status': 'canonical', 'source': 'fixture'}]})
            self.assertEqual(curator.scan(root), [])

    def test_broken_reference_and_schema_case(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            self.write_fixture(root,
                {'records': {'learning_modules': [
                    {'id': 'PHY-L2-000001', 'dependencies': {'requires': ['PHY-L1-MISSING']}}
                ]}},
                {'records': [{'id': 'DOC:TEST:1', 'status': 'canonical'}]})
            kinds = {f.kind for f in curator.scan(root)}
            self.assertIn('BROKEN_REFERENCE', kinds)
            self.assertIn('PROVENANCE_GAP', kinds)

    def test_duplicate_finding_collapses_by_stable_fingerprint(self):
        finding = curator.Finding(
            'BROKEN_REFERENCE', 'KG', ('A', 'B'), (), 'A -> B',
            'A references B', 'high', 1.0, ('A -> B',)
        )
        first = curator.update_state([finding], '2026-08-30T10:00:00Z')
        second = curator.update_state([finding], '2026-08-30T11:00:00Z', first)
        self.assertEqual(len(second['findings']), 1)
        row = second['findings'][finding.fingerprint]
        self.assertEqual(row['recurrence_count'], 2)
        self.assertEqual(row['first_seen'], '2026-08-30T10:00:00Z')
        self.assertEqual(row['last_seen'], '2026-08-30T11:00:00Z')

if __name__ == '__main__':
    unittest.main()
