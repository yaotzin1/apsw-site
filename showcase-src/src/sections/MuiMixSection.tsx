import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { Gridwright, coreAddons, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { muiSorting } from 'apsw-gridwright-mui';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { PEOPLE, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [personColumns.name, personColumns.department, personColumns.city, personColumns.role, personColumns.salary, personColumns.startDate];

export function MuiMixSection() {
    // The native set with one view replaced by name: `muiSorting()` is also called `gridwright:sorting`.
    const mixed = useMemo((): GridAddon<Person>[] => coreAddons<Person>().map((addon) => (addon.name === 'gridwright:sorting' ? muiSorting<Person>() : addon)), []);

    return (
        <Section
            id="mui-mix"
            tag="apsw-gridwright-mui · muiSorting() in coreAddons()"
            title="One MUI view in the native set"
            lead={
                <>
                    The views keep the native add-ons' names, so you can swap a single one: here the header sort control is MUI's{' '}
                    <code>TableSortLabel</code> while the checkboxes, the pager and the table's styling stay native and take this page's CSS
                    variables. You would do this when the sort affordance is the one MUI thing your users recognise, when you are migrating
                    a screen one control at a time, or when a design system owns the table's look and you only want MUI's header behaviour.
                    Because <code>muiTheme()</code> is not in the list, no token is written and the grid keeps its own palette.
                </>
            }
        >
            <Readout
                title="coreAddons, as listed"
                live={false}
                rows={[{ label: 'names', value: mixed.map((addon) => addon.name).join('\n') }]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person> columns={columns} data={PEOPLE} pageSize={10} selectionMode="multiple" coreAddons={mixed} aria-label="People, MUI sort labels on a native grid" />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <code>{"coreAddons().map((a) => (a.name === 'gridwright:sorting' ? muiSorting() : a))"}</code> is the whole change; a grid
                cannot list both views of one feature, which is why the swap is by name.
            </Typography>
            <InstallBlock packages={['apsw-gridwright', 'apsw-gridwright-mui']} />
        </Section>
    );
}
