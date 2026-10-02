import { useMemo, useState } from 'react';
import { Button, Chip, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { ExcelFilterSelect } from 'apsw-mui-excel-filter';
import { Gridwright, search, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { muiAddons } from 'apsw-gridwright-mui';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const DEPARTMENT_OPTIONS = optionsOf(DEPARTMENTS);
const CITY_OPTIONS = optionsOf(CITIES);
const STATUS_OPTIONS = optionsOf(STATUSES);

const columns: GridwrightColumn<Person>[] = [
    personColumns.name,
    personColumns.department,
    personColumns.city,
    personColumns.status,
    personColumns.role,
    personColumns.salary,
];

const passes = (selected: string[], field: string): boolean => selected.length === 0 || selected.includes(field);

interface Facet {
    key: 'department' | 'city' | 'status';
    label: string;
    titles: Record<string, string>;
    options: { value: string; label: string }[];
}

const FACETS: Facet[] = [
    { key: 'department', label: 'Department', titles: DEPARTMENTS, options: DEPARTMENT_OPTIONS },
    { key: 'city', label: 'City', titles: CITIES, options: CITY_OPTIONS },
    { key: 'status', label: 'Status', titles: STATUSES, options: STATUS_OPTIONS },
];

export function MuiDashboardSection() {
    const [filters, setFilters] = useState<Record<Facet['key'], string[]>>({ department: [], city: [], status: [] });
    const [selected, setSelected] = useState(0);

    const rows = useMemo(
        () => PEOPLE.filter((p) => passes(filters.department, p.department) && passes(filters.city, p.city) && passes(filters.status, p.status)),
        [filters],
    );
    const active = FACETS.flatMap((facet) => filters[facet.key].map((value) => ({ facet, value })));
    const addons = useMemo((): GridAddon<Person>[] => [search<Person>()], []);

    const set = (key: Facet['key'], next: string[]) => setFilters((current) => ({ ...current, [key]: next }));
    const remove = (key: Facet['key'], value: string) => set(key, filters[key].filter((v) => v !== value));

    return (
        <Section
            id="mui-dashboard"
            tag="all three packages · muiAddons() · ExcelFilterSelect"
            title="An MUI dashboard: the three packages on one screen"
            lead={
                <>
                    This is what an MUI shop ships: a toolbar of Excel-style filter fields, the active values as deletable chips, a Clear
                    button, and under it a grid whose sort labels, checkboxes and pager are MUI components taking the page's theme. The
                    fields are <code>apsw-mui-excel-filter</code>, the grid is <code>apsw-gridwright</code> with{' '}
                    <code>{'coreAddons={muiAddons()}'}</code> from <code>apsw-gridwright-mui</code>, and the search box is the grid's own{' '}
                    <code>search()</code> add-on. Flip the theme toggle in the header and the whole strip follows, grid included.
                </>
            }
        >
            <Paper sx={{ mb: 2 }}>
                <Toolbar sx={{ py: 1.5, gap: 1.5, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Typography variant="h3" component="p" sx={{ mr: 1 }}>
                        People
                    </Typography>
                    <div className="sc-dashboard__bar" style={{ flex: 1 }}>
                        {FACETS.map((facet) => (
                            <div className="sc-dashboard__field" key={facet.key}>
                                <ExcelFilterSelect label={facet.label} options={facet.options} value={filters[facet.key]} onChange={(next) => set(facet.key, next)} width="100%" />
                            </div>
                        ))}
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setFilters({ department: [], city: [], status: [] })}
                            disabled={active.length === 0}
                            sx={{ height: 32 }}
                        >
                            Clear
                        </Button>
                    </div>
                </Toolbar>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center" sx={{ px: 3, pb: 2 }}>
                    <Chip size="small" color={active.length > 0 ? 'primary' : 'default'} label={`${rows.length} of ${PEOPLE.length}`} className="sc-chip-mono" />
                    {active.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                            No filter: every row.
                        </Typography>
                    ) : (
                        active.map(({ facet, value }) => (
                            <Chip
                                key={`${facet.key}:${value}`}
                                size="small"
                                variant="outlined"
                                label={`${facet.label}: ${facet.titles[value] ?? value}`}
                                onDelete={() => remove(facet.key, value)}
                            />
                        ))
                    )}
                    {selected > 0 ? <Chip size="small" color="secondary" label={`${selected} selected`} /> : null}
                </Stack>
            </Paper>
            <div className="sc-grid">
                <Gridwright<Person>
                    columns={columns}
                    data={rows}
                    pageSize={10}
                    selectionMode="multiple"
                    coreAddons={muiAddons<Person>({ pagination: { pageSizeOptions: [10, 25, 50] } })}
                    addons={addons}
                    onSelectionChange={(ids) => setSelected(ids.length)}
                    aria-label="People, filtered from the dashboard strip"
                />
            </div>
            <InstallBlock packages={['apsw-gridwright', 'apsw-gridwright-mui', 'apsw-mui-excel-filter']} />
        </Section>
    );
}
