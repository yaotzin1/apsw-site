import { useMemo, useState } from 'react';
import { Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { ExcelFilterSelect } from 'apsw-mui-excel-filter';
import { Gridwright, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const DEPARTMENT_OPTIONS = optionsOf(DEPARTMENTS);
const CITY_OPTIONS = optionsOf(CITIES);
const STATUS_OPTIONS = optionsOf(STATUSES);

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const columns: GridwrightColumn<Person>[] = [
    { id: 'name', header: 'Name' },
    { id: 'department', header: 'Department', formatValue: (v) => DEPARTMENTS[String(v)] ?? String(v) },
    { id: 'city', header: 'City', formatValue: (v) => CITIES[String(v)] ?? String(v) },
    { id: 'status', header: 'Status', formatValue: (v) => STATUSES[String(v)] ?? String(v) },
    { id: 'role', header: 'Role' },
    { id: 'salary', header: 'Salary', align: 'end', formatValue: (v) => money.format(Number(v)) },
];

/** `[]` from the dropdown means "no filter", so it lets every row through. */
const passes = (selected: string[], field: string): boolean => selected.length === 0 || selected.includes(field);

/** An unfiltered field is absent from the query string, which is the point of the `[]` convention. */
function toQueryString(filters: Record<string, string[]>): string {
    const params = Object.entries(filters)
        .filter(([, selected]) => selected.length > 0)
        .map(([name, selected]) => `${name}=${selected.map(encodeURIComponent).join(',')}`);
    return params.length > 0 ? `?${params.join('&')}` : '';
}

export function FilterSection() {
    const [departments, setDepartments] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    const rows = useMemo(
        () =>
            PEOPLE.filter(
                (person) => passes(departments, person.department) && passes(cities, person.city) && passes(statuses, person.status),
            ),
        [departments, cities, statuses],
    );

    const filtered = departments.length > 0 || cities.length > 0 || statuses.length > 0;
    const query = toQueryString({ department: departments, city: cities, status: statuses });

    const clearAll = () => {
        setDepartments([]);
        setCities([]);
        setStatuses([]);
    };

    return (
        <Section
            id="filters"
            title="Excel-style filters driving a data grid"
            lead={
                <>
                    Three <code>ExcelFilterSelect</code> fields above an <code>apsw-gridwright</code> grid of {PEOPLE.length} generated
                    people. Open a dropdown, type to narrow the list, untick what you want gone, confirm with OK. A field with everything
                    ticked hands back <code>[]</code>, so its parameter leaves the query string below.
                </>
            }
        >
            <Paper sx={{ p: 2, mb: 2 }}>
                <div className="sc-filters">
                    <ExcelFilterSelect label="Department" options={DEPARTMENT_OPTIONS} value={departments} onChange={setDepartments} width="100%" />
                    <ExcelFilterSelect label="City" options={CITY_OPTIONS} value={cities} onChange={setCities} width="100%" />
                    <ExcelFilterSelect label="Status" options={STATUS_OPTIONS} value={statuses} onChange={setStatuses} width="100%" />
                    <Button onClick={clearAll} disabled={!filtered} sx={{ height: 32, flex: '0 0 auto' }}>
                        Clear all
                    </Button>
                </div>

                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                    <Chip size="small" color={filtered ? 'primary' : 'default'} label={`${rows.length} of ${PEOPLE.length} people`} />
                    <Typography variant="body2" color="text.secondary">
                        The request these three values would make:
                    </Typography>
                </Stack>
                <Paper sx={{ p: 1.5, mt: 1, bgcolor: 'background.default' }}>
                    <pre className="sc-mono" aria-live="polite">
                        {`GET /api/people${query}\n`}
                        {`department = ${JSON.stringify(departments)}\n`}
                        {`city       = ${JSON.stringify(cities)}\n`}
                        {`status     = ${JSON.stringify(statuses)}`}
                    </pre>
                </Paper>
            </Paper>

            <div className="sc-grid">
                <Gridwright<Person> columns={columns} data={rows} pageSize={10} aria-label="People, narrowed by the three filters" />
            </div>

            <InstallBlock packages={['apsw-mui-excel-filter', 'apsw-gridwright']} />
        </Section>
    );
}
