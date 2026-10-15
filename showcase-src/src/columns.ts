import type { GridwrightColumn } from 'apsw-gridwright/react';
import { CITIES, DEPARTMENTS, STATUSES, type Person } from './data';

export const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

/** The people columns most sections share. A section that needs more spreads these and adds its own. */
export const personColumns = {
    id: { id: 'id', header: '#', align: 'end', width: 72, searchable: false } satisfies GridwrightColumn<Person>,
    name: { id: 'name', header: 'Name' } satisfies GridwrightColumn<Person>,
    email: { id: 'email', header: 'Email' } satisfies GridwrightColumn<Person>,
    department: {
        id: 'department',
        header: 'Department',
        formatValue: (v) => DEPARTMENTS[String(v)] ?? String(v),
    } satisfies GridwrightColumn<Person>,
    city: { id: 'city', header: 'City', formatValue: (v) => CITIES[String(v)] ?? String(v) } satisfies GridwrightColumn<Person>,
    status: { id: 'status', header: 'Status', formatValue: (v) => STATUSES[String(v)] ?? String(v) } satisfies GridwrightColumn<Person>,
    role: { id: 'role', header: 'Role' } satisfies GridwrightColumn<Person>,
    salary: {
        id: 'salary',
        header: 'Salary',
        align: 'end',
        formatValue: (v) => money.format(Number(v)),
        exportValue: (v) => String(v),
    } satisfies GridwrightColumn<Person>,
    startDate: { id: 'startDate', header: 'Started' } satisfies GridwrightColumn<Person>,
};
