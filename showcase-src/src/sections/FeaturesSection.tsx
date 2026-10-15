import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import {
    Gridwright,
    cellNavigation,
    columnFilters,
    coreAddons,
    exportMenu,
    inlineEditing,
    search,
    type GridwrightColumn,
} from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const columns: GridwrightColumn<Person>[] = [
    { id: 'id', header: '#', align: 'end', width: 64, filter: { type: 'number' }, searchable: false },
    { id: 'name', header: 'Name', edit: { inputType: 'text' } },
    { id: 'email', header: 'Email' },
    {
        id: 'department',
        header: 'Department',
        formatValue: (v) => DEPARTMENTS[String(v)] ?? String(v),
        filter: { type: 'select', choices: optionsOf(DEPARTMENTS) },
    },
    {
        id: 'city',
        header: 'City',
        formatValue: (v) => CITIES[String(v)] ?? String(v),
        filter: { type: 'select', choices: optionsOf(CITIES) },
    },
    {
        id: 'status',
        header: 'Status',
        formatValue: (v) => STATUSES[String(v)] ?? String(v),
        filter: { type: 'select', choices: optionsOf(STATUSES) },
        edit: { inputType: 'select', choices: optionsOf(STATUSES) },
    },
    {
        id: 'salary',
        header: 'Salary',
        align: 'end',
        formatValue: (v) => money.format(Number(v)),
        exportValue: (v) => String(v),
        filter: { type: 'number' },
        edit: { inputType: 'number' },
    },
    { id: 'rating', header: 'Rating', align: 'end', filter: { type: 'number' }, searchable: false },
    { id: 'startDate', header: 'Started', filter: { type: 'date' } },
];

export function FeaturesSection() {
    // Local rows live in React state so an inline edit can replace the array; the grid re-reads it.
    const [rows, setRows] = useState<Person[]>(PEOPLE);

    const commit = useCallback((rowId: string | number, columnId: string, value: unknown) => {
        // Throwing rejects the edit: the cell shows the message and keeps its old value.
        if (columnId === 'salary') {
            const salary = Number(value);
            if (!Number.isFinite(salary) || salary < 0) throw new Error('Salary must be a non-negative number.');
            if (salary > 1_000_000) throw new Error('Salary above 1,000,000 needs a sign-off. Try a smaller number.');
        }
        if (columnId === 'name' && String(value).trim().length < 2) throw new Error('A name needs at least two characters.');
        setRows((current) => current.map((row) => (row.id === Number(rowId) ? { ...row, [columnId]: value } : row)));
    }, []);

    return (
        <Section
            id="features"
            title="Grid features"
            lead={
                <>
                    The same {PEOPLE.length} rows with the add-ons switched on: search across every column, a typed filter in each header
                    (number, date, select), sorting with Shift-click for a second column, page controls, CSV/Excel/print export, keyboard
                    cell navigation, and inline editing on Name, Status and Salary. Click a salary, type a negative number and press Enter
                    to see an edit rejected.
                </>
            }
        >
            <div className="sc-grid">
                <Gridwright<Person>
                    columns={columns}
                    data={rows}
                    pageSize={25}
                    selectionMode="multiple"
                    coreAddons={coreAddons<Person>({ pagination: { pageSizeOptions: [10, 25, 50, 100] } })}
                    addons={[
                        search(),
                        columnFilters(),
                        exportMenu({ formats: ['csv', 'excel', 'print'], filename: 'people' }),
                        cellNavigation(),
                        inlineEditing({ commit }),
                    ]}
                    aria-label="People, with every add-on"
                />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Everything above is the package's own unstyled markup and CSS custom properties; only the colours were set for this page.
            </Typography>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
