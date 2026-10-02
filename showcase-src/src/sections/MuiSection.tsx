import { Gridwright, type GridwrightColumn } from 'apsw-gridwright/react';
import { muiAddons } from 'apsw-gridwright-mui';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, type Person } from '../data';

const money = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

const columns: GridwrightColumn<Person>[] = [
    { id: 'name', header: 'Name' },
    { id: 'department', header: 'Department', formatValue: (v) => DEPARTMENTS[String(v)] ?? String(v) },
    { id: 'city', header: 'City', formatValue: (v) => CITIES[String(v)] ?? String(v) },
    { id: 'status', header: 'Status', formatValue: (v) => STATUSES[String(v)] ?? String(v) },
    { id: 'salary', header: 'Salary', align: 'end', formatValue: (v) => money.format(Number(v)) },
    { id: 'startDate', header: 'Started' },
];

export function MuiSection() {
    return (
        <Section
            id="mui"
            title="The same grid in MUI clothes"
            lead={
                <>
                    <code>apsw-gridwright-mui</code> swaps the grid's native sort, selection and paging controls for MUI's{' '}
                    <code>TableSortLabel</code>, <code>Checkbox</code> and <code>TablePagination</code>, and the grid takes colours, type,
                    radius and spacing from the MUI theme in context. Flip the theme toggle in the header and it follows. Same markup, same
                    accessibility suites; <code>{'coreAddons={muiAddons()}'}</code> is the whole change.
                </>
            }
        >
            <div className="sc-grid">
                <Gridwright<Person>
                    columns={columns}
                    data={PEOPLE}
                    pageSize={10}
                    selectionMode="multiple"
                    coreAddons={muiAddons<Person>({ pagination: { pageSizeOptions: [10, 25, 50] } })}
                    aria-label="People, with MUI views"
                />
            </div>
            <InstallBlock packages={['apsw-gridwright', 'apsw-gridwright-mui']} />
        </Section>
    );
}
