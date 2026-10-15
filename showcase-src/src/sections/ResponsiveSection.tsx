import { useMemo, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Gridwright, responsive, search, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { PEOPLE, type Person } from '../data';

// Each column says how wide the grid has to be to keep it. Only the view changes: a hidden column is
// still sorted, filtered, searched and exported.
const columns: GridwrightColumn<Person>[] = [
    { ...personColumns.name, width: 200 },
    { ...personColumns.role, width: 200, responsive: { hideBelow: 900 } },
    { ...personColumns.email, width: 240, responsive: { hideBelow: 700 } },
    { ...personColumns.city, width: 140, responsive: { hideBelow: 520 } },
    { ...personColumns.salary, width: 130 },
];

const WIDTHS = [
    { value: 0, label: 'Full' },
    { value: 900, label: '900' },
    { value: 600, label: '600' },
    { value: 375, label: '375' },
    { value: 320, label: '320' },
] as const;

export function ResponsiveSection() {
    const [width, setWidth] = useState<number>(0);
    const addons = useMemo((): GridAddon<Person>[] => [search<Person>(), responsive<Person>()], []);

    return (
        <Section
            id="responsive"
            tag="apsw-gridwright · responsive()"
            title="A grid that follows its container, not the window"
            lead={
                <>
                    <code>responsive()</code> measures the space the grid was given, so the same grid is right in a sidebar, a dialog or on a
                    phone. A column declares <code>responsive: {'{ hideBelow }'}</code> and drops out below that width; the toolbar and the
                    pagination wrap. Pick a width below, or drag your window narrower. Search for a role while it is hidden: the column is
                    gone from the view, not from the data.
                </>
            }
        >
            <ToggleButtonGroup
                exclusive
                size="small"
                value={width}
                onChange={(_event, next: number | null) => next !== null && setWidth(next)}
                aria-label="Container width in pixels"
            >
                {WIDTHS.map((option) => (
                    <ToggleButton key={option.value} value={option.value}>
                        {option.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <div className="sc-grid" style={{ marginTop: 16, maxWidth: '100%', width: width || undefined }}>
                <Gridwright<Person> columns={columns} data={PEOPLE} pageSize={8} addons={addons} aria-label="People in a container of a chosen width" />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                On a touch device the controls grow to a 44&nbsp;px target, and a row menu that opens on hover gets a visible three-dot button.
            </Typography>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
