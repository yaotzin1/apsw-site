import { useMemo, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Gridwright, rowDetail, useRowDetail, type GridAddon, type GridwrightColumn, type RowId } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { money, personColumns } from '../columns';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, ordersOf, type Order, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [personColumns.name, personColumns.department, personColumns.city, personColumns.status, personColumns.startDate];

const orderColumns: GridwrightColumn<Order>[] = [
    { id: 'id', header: 'Order' },
    { id: 'placed', header: 'Placed' },
    { id: 'item', header: 'Item' },
    { id: 'quantity', header: 'Qty', align: 'end' },
    { id: 'total', header: 'Total', align: 'end', formatValue: (v) => money.format(Number(v)) },
    { id: 'state', header: 'State' },
];

/** The panel: a short profile and a second grid, with no add-ons of its own. Unmounted when the row closes. */
function OrdersPanel({ person }: { person: Person }) {
    const orders = useMemo(() => ordersOf(person), [person]);
    const spent = orders.reduce((sum, order) => sum + order.total, 0);
    return (
        <div className="sc-detail">
            <dl className="sc-detail__profile">
                <div>
                    <dt className="sc-tag">email</dt>
                    <dd className="sc-mono">{person.email}</dd>
                </div>
                <div>
                    <dt className="sc-tag">role</dt>
                    <dd className="sc-mono">{person.role}</dd>
                </div>
                <div>
                    <dt className="sc-tag">based in</dt>
                    <dd className="sc-mono">
                        {CITIES[person.city]}, {DEPARTMENTS[person.department]}
                    </dd>
                </div>
                <div>
                    <dt className="sc-tag">status</dt>
                    <dd className="sc-mono">{STATUSES[person.status]}</dd>
                </div>
                <div>
                    <dt className="sc-tag">orders</dt>
                    <dd className="sc-mono">
                        {orders.length}, {money.format(spent)} in total
                    </dd>
                </div>
            </dl>
            <Gridwright<Order> columns={orderColumns} data={orders} coreAddons={false} aria-label={`Orders of ${person.name}`} />
        </div>
    );
}

/** Rendered inside the grid's toolbar, so `useRowDetail()` finds the add-on's controller. */
function DetailControls() {
    const detail = useRowDetail();
    return (
        <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" onClick={() => detail.expandAll()}>
                Expand this page
            </Button>
            <Button size="small" variant="outlined" onClick={() => detail.collapseAll()} disabled={detail.expanded.length === 0}>
                Collapse all
            </Button>
        </Stack>
    );
}

export function DetailSection() {
    const [expanded, setExpanded] = useState<readonly RowId[]>([]);

    const addons = useMemo(
        (): GridAddon<Person>[] => [
            rowDetail<Person>({
                render: ({ data }) => <OrdersPanel person={data} />,
                rowLabel: (data) => data.name,
                onExpandedChange: setExpanded,
            }),
        ],
        [],
    );

    return (
        <Section
            id="detail"
            tag="apsw-gridwright · rowDetail()"
            title="Master–detail: a panel under the row"
            lead={
                <>
                    Press the toggle at the start of a row and a panel opens directly under it: here a short profile and a second grid of
                    that person's purchase orders, generated for the row when it opens and unmounted when it closes, which is how a panel
                    that fetches its own data stays cheap. Expansion is keyed on the row id, so a panel you opened is still open after you
                    sort or page away and back. The toggle is a real button named after its row (&ldquo;Show details for Anna Nowak&rdquo;),
                    and the panel is a <code>region</code> that stays out of the row count.
                </>
            }
        >
            <Readout
                title="Reported by the add-on"
                rows={[
                    { label: 'open panels', value: String(expanded.length) },
                    { label: 'row ids', value: expanded.length > 0 ? expanded.join(', ') : '(none)' },
                ]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person> columns={columns} data={PEOPLE} pageSize={10} addons={addons} toolbar={<DetailControls />} aria-label="People with expandable detail" />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                The inner grid is <code>{'<Gridwright coreAddons={false} />'}</code>: no sort buttons, no page controls, its own live region.
            </Typography>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
