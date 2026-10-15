import { useMemo, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { createRestDataSource } from 'apsw-gridwright';
import { Gridwright, columnFilters, inlineEditing, search, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';

/**
 * The site's PHP backend. Apache also rewrites /api/people/... to this file, but calling the file
 * directly works on both Apache and the PHP dev server, so the showcase uses this form.
 */
const API_URL = '/api/people.php';

interface RemotePerson {
    id: number;
    name: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    status: string;
    rating: number;
    canEditPay: boolean;
    startDate: string;
}

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// Only the operators api/people.php implements are offered, so a filter means the same on both sides.
const columns: GridwrightColumn<RemotePerson>[] = [
    { id: 'id', header: '#', align: 'end', width: 64, filter: { type: 'number', operators: ['eq', 'gt', 'gte', 'lt', 'lte'] } },
    { id: 'name', header: 'Name', filter: { type: 'text', operators: ['contains', 'eq', 'ne'] } },
    {
        id: 'department',
        header: 'Department',
        filter: {
            type: 'select',
            choices: ['Engineering', 'Architecture', 'Security', 'Data & AI', 'Product', 'Infrastructure'].map((v) => ({ value: v, label: v })),
            operators: ['in'],
        },
    },
    { id: 'role', header: 'Role', filter: { type: 'text', operators: ['contains', 'eq', 'ne'] } },
    {
        id: 'salary',
        header: 'Salary',
        align: 'end',
        formatValue: (v) => money.format(Number(v)),
        filter: { type: 'number', operators: ['gte', 'lte', 'gt', 'lt', 'eq'] },
        edit: { inputType: 'number', editable: (row) => row.canEditPay },
    },
    {
        id: 'status',
        header: 'Status',
        filter: { type: 'select', choices: ['Active', 'On Leave', 'Consulting'].map((v) => ({ value: v, label: v })), operators: ['in'] },
    },
    { id: 'rating', header: 'Rating', align: 'end', filter: { type: 'number', operators: ['gte', 'lte', 'eq'] } },
    { id: 'startDate', header: 'Started', filterable: false },
];

export function RemoteSection() {
    const [lastRequest, setLastRequest] = useState<string>('(no request yet)');

    // Built once: an inline data source would refetch on every render.
    const source = useMemo(
        () =>
            createRestDataSource<RemotePerson>({
                url: API_URL,
                // The server sorts, filters, searches and pages, so the pipeline does nothing in memory.
                capabilities: { sort: true, filter: true, search: true, paginate: true },
                fetchImpl: (input, init) => {
                    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
                    setLastRequest(`GET ${decodeURIComponent(url)}`);
                    return fetch(input, init);
                },
            }),
        [],
    );

    const addons = useMemo(
        (): GridAddon<RemotePerson>[] => [
            search<RemotePerson>(),
            columnFilters<RemotePerson>(),
            inlineEditing<RemotePerson>({
                commit: async (rowId, columnId, value) => {
                    const response = await fetch(`${API_URL}?id=${encodeURIComponent(String(rowId))}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ [columnId]: value }),
                    });
                    if (!response.ok) {
                        const body = (await response.json().catch(() => ({}))) as { error?: string };
                        throw new Error(body.error ?? `The server answered ${response.status}`);
                    }
                    source.invalidate(); // the rows on screen are stale now; the grid refetches
                },
            }),
        ],
        [source],
    );

    return (
        <Section
            id="remote"
            title="Remote data source"
            lead={
                <>
                    The same component over <code>createRestDataSource({'{ url }'})</code>, pointed at this site's PHP backend (100 rows,
                    kept per session). Sorting, filters, search and paging travel to the server as query parameters; the total comes
                    back in <code>X-Total-Count</code>. Salary is editable where the server allows it: a PATCH is sent, a rejection (try a
                    negative number, or a row the server marks read-only) shows the server's own message on the cell.
                </>
            }
        >
            <Paper sx={{ p: 1.5, mb: 2, bgcolor: 'background.default' }}>
                <Typography variant="overline" color="text.secondary">
                    Last request
                </Typography>
                <pre className="sc-mono" aria-live="polite">{lastRequest}</pre>
            </Paper>
            <div className="sc-grid">
                <Gridwright<RemotePerson>
                    columns={columns}
                    dataSource={source}
                    pageSize={10}
                    queryDebounceMs={200}
                    addons={addons}
                    aria-label="People from the REST backend"
                />
            </div>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
