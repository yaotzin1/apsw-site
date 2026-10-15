import { useMemo, useState } from 'react';
import { Button, Stack } from '@mui/material';
import type { TreeController } from 'apsw-gridwright';
import { Gridwright, search, treeData, useGridwright, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { countNodes, generateOrg, type OrgNode } from '../data';

const ORG = generateOrg();
const NODE_COUNT = countNodes(ORG);

const KIND: Record<OrgNode['kind'], string> = { department: 'Department', team: 'Team', person: 'Person' };

const columns: GridwrightColumn<OrgNode>[] = [
    { id: 'name', header: 'Name', width: 260 },
    { id: 'kind', header: 'Kind', formatValue: (v) => KIND[v as OrgNode['kind']] ?? String(v) },
    { id: 'role', header: 'Role' },
    { id: 'city', header: 'City' },
    { id: 'headcount', header: 'Headcount', align: 'end', searchable: false },
];

export function TreeSection() {
    const [tree, setTree] = useState<TreeController<OrgNode> | null>(null);
    const [open, setOpen] = useState<readonly string[] | null>(null);

    const addons = useMemo(
        (): GridAddon<OrgNode>[] => [
            treeData<OrgNode>({
                getRowId: (row) => row.id,
                getChildren: (row) => row.children,
                defaultExpandedDepth: 1,
                controllerRef: setTree,
                onExpandedChange: setOpen,
            }),
            search<OrgNode>(),
        ],
        [],
    );
    const grid = useGridwright<OrgNode>({ columns, data: ORG, pageSize: 100, addons });

    return (
        <Section
            id="tree"
            tag="apsw-gridwright · treeData()"
            title="Tree data: an org chart"
            lead={
                <>
                    Departments hold teams, teams hold people: {NODE_COUNT} nodes nested on a <code>children</code> field, handed to the
                    grid with <code>getChildren</code>. You expand and collapse with the chevrons or the arrow keys, the table becomes a{' '}
                    <code>treegrid</code> with <code>aria-level</code> on every row, and sorting reorders siblings inside their parent
                    instead of flattening the hierarchy. Search keeps the ancestors of a match, so a person always appears under their team;
                    clear it and your own expansion comes back. The buttons drive the controller the add-on hands back through{' '}
                    <code>controllerRef</code>.
                </>
            }
        >
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }} alignItems="center">
                <Button variant="outlined" size="small" onClick={() => tree?.expandAll(3)} disabled={!tree}>
                    Expand all
                </Button>
                <Button variant="outlined" size="small" onClick={() => tree?.expandAll(1)} disabled={!tree}>
                    Departments only
                </Button>
                <Button variant="outlined" size="small" onClick={() => tree?.collapseAll()} disabled={!tree}>
                    Collapse all
                </Button>
            </Stack>
            <Readout
                title="Reported by the grid"
                rows={[
                    { label: 'nodes' , value: `${NODE_COUNT} (${ORG.length} departments)` },
                    { label: 'visible rows', value: grid.state.isTotalExact ? String(grid.state.totalRows) : '…' },
                    { label: 'open nodes', value: open === null ? '(unchanged since mount)' : `${open.length}: ${open.join(', ') || 'none'}` },
                ]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<OrgNode> instance={grid} columns={columns} aria-label="Organisation chart" />
            </div>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
