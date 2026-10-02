import { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import {
    Gridwright,
    columnFilters,
    columnLayout,
    formatSearchParams,
    search,
    urlSync,
    type ColumnLayoutState,
    type GridAddon,
    type GridwrightColumn,
    type UrlSyncAdapter,
} from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const PREFIX = 'people_';

// Pixel widths, because sticky offsets are a sum of them; `layout` says what the reader may do to each column.
const columns: GridwrightColumn<Person>[] = [
    { ...personColumns.name, width: 200, layout: { pinned: 'left', hideable: false }, filter: { type: 'text' } },
    { ...personColumns.email, width: 240 },
    { ...personColumns.department, width: 160, filter: { type: 'select', choices: optionsOf(DEPARTMENTS) } },
    { ...personColumns.city, width: 140, filter: { type: 'select', choices: optionsOf(CITIES) } },
    { ...personColumns.role, width: 220 },
    { ...personColumns.status, width: 140, filter: { type: 'select', choices: optionsOf(STATUSES) } },
    { ...personColumns.salary, width: 130, filter: { type: 'number' }, layout: { maxWidth: 240 } },
    { ...personColumns.startDate, width: 130, filter: { type: 'date' } },
];

export function LayoutSection() {
    const [query, setQuery] = useState(() => window.location.search);
    const [layout, setLayout] = useState<ColumnLayoutState | null>(null);

    // The browser's own location and history, plus a note to this component so the panel can show what was written.
    const adapter = useMemo(
        (): UrlSyncAdapter => ({
            getParams: () => new URLSearchParams(window.location.search),
            setParams: (params, mode) => {
                const search = formatSearchParams(params);
                const url = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`;
                if (mode === 'push') window.history.pushState(null, '', url);
                else window.history.replaceState(null, '', url);
                setQuery(window.location.search);
            },
            subscribe: (onChange) => {
                const handler = () => {
                    onChange();
                    setQuery(window.location.search);
                };
                window.addEventListener('popstate', handler);
                return () => window.removeEventListener('popstate', handler);
            },
        }),
        [],
    );

    const addons = useMemo(
        (): GridAddon<Person>[] => [
            search<Person>(),
            columnFilters<Person>(),
            columnLayout<Person>({ onChange: setLayout }),
            urlSync<Person>({ prefix: PREFIX, adapter }),
        ],
        [adapter],
    );

    return (
        <Section
            id="layout"
            tag="apsw-gridwright · columnLayout() · urlSync()"
            title="Column layout, and a view you can send as a link"
            lead={
                <>
                    Drag a header's edge to resize it (double-click fits the content), drag a header sideways or press Ctrl+arrow to
                    reorder, and open <em>Columns</em> in the toolbar to hide columns or pin them to either edge; Name is pinned to the
                    start and cannot be hidden. Meanwhile <code>urlSync()</code> keeps what you searched, sorted, filtered and which page
                    you are on in this page's address, prefixed <code>{PREFIX}</code>, so reloading brings the same view back and the link
                    opens on the same rows for whoever you send it to. Back and Forward step through the pages you visited. The layout
                    itself is handed to you through <code>onChange</code> as plain JSON, ready for storage.
                </>
            }
        >
            <Readout
                title="What the add-ons wrote"
                rows={[
                    { label: 'location.search', value: query || '(empty: the view is the default one)' },
                    { label: 'layout', value: layout ? JSON.stringify(layout, null, 1) : '(not changed yet)' },
                ]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person> columns={columns} data={PEOPLE} pageSize={10} addons={addons} aria-label="People with column layout and URL sync" />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Only what differs from the grid's starting view is written, so an untouched grid leaves the address clean. Widths, pins and
                order are the reader's arrangement rather than the query, which is why they go to <code>onChange</code> and not the URL.
            </Typography>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
