import { useEffect, useMemo, useRef, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { Gridwright, cellNavigation, columnFilters, search, type ActiveCell, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [
    personColumns.name,
    { ...personColumns.department, filter: { type: 'select', choices: optionsOf(DEPARTMENTS) } },
    { ...personColumns.city, filter: { type: 'select', choices: optionsOf(CITIES) } },
    { ...personColumns.status, filter: { type: 'select', choices: optionsOf(STATUSES) } },
    { ...personColumns.salary, filter: { type: 'number' } },
];

const KEYS: [string, string][] = [
    ['Tab', 'one stop into the grid, one stop out: controls inside cells are operated from the cell'],
    ['Arrow keys', 'move the cursor a cell at a time; reversed left/right under RTL'],
    ['Home / End', 'first / last column of the row'],
    ['PageUp / PageDown', 'a page of rows, clamped to what is loaded'],
    ['Ctrl+Home / Ctrl+End', 'first cell; last cell of the last loaded row'],
    ['Space', 'toggles the row when selection is by row click'],
    ['Enter / F2', 'operates the control in the cell: opens an editor, presses a button, follows a link'],
    ['Ctrl+C', 'copies the selected rows with a header, or the cell under the cursor, as TSV and an HTML table'],
    ['Shift+F10', 'pins the row menu, where rowActions() is listed'],
];

export function AccessibilitySection() {
    const wrapper = useRef<HTMLDivElement>(null);
    const [announcements, setAnnouncements] = useState<string[]>([]);
    const [cell, setCell] = useState<ActiveCell | null>(null);

    const addons = useMemo(
        (): GridAddon<Person>[] => [search<Person>(), columnFilters<Person>(), cellNavigation<Person>({ onActiveCellChange: setCell })],
        [],
    );

    // Mirror the grid's own live region: `GridRoot` renders one `role="status"` span with one sentence in it.
    useEffect(() => {
        const region = wrapper.current?.querySelector('.gw-root > [role="status"]');
        if (!region) return;
        let last = '';
        const read = () => {
            const text = region.textContent?.trim() ?? '';
            if (!text || text === last) return;
            last = text;
            setAnnouncements((current) => [text, ...current].slice(0, 6));
        };
        const observer = new MutationObserver(read);
        observer.observe(region, { childList: true, characterData: true, subtree: true });
        read();
        return () => observer.disconnect();
    }, []);

    return (
        <Section
            id="a11y"
            tag="apsw-gridwright · cellNavigation() · role=grid"
            title="Accessibility: what a screen reader hears"
            lead={
                <>
                    The grid is a real <code>{'<table role="grid">'}</code> with <code>aria-rowcount</code>, <code>aria-sort</code> on the
                    headers and one visually hidden <code>role="status"</code> live region that says one sentence when something settles:
                    the row range after a page turn, &ldquo;Salary, sorted descending&rdquo; after a sort, &ldquo;City, filtered&rdquo;
                    after a filter, and never the rows themselves. The panel on the right mirrors that region so you can read what is being
                    announced. With <code>cellNavigation()</code> the grid is a single Tab stop and the arrow keys move a cursor across
                    cells; Ctrl+C copies what is selected. Click a cell or Tab into the grid and try the keys.
                </>
            }
        >
            <div className="sc-walkthrough">
                <Paper sx={{ p: 2 }}>
                    <Typography variant="overline" color="text.secondary" component="div">
                        Keyboard
                    </Typography>
                    <table className="sc-kbd">
                        <tbody>
                            {KEYS.map(([key, does]) => (
                                <tr key={key}>
                                    <th scope="row">
                                        <kbd>{key}</kbd>
                                    </th>
                                    <td>{does}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Paper>
                <Readout
                    title="Live region, mirrored"
                    live={false}
                    rows={[
                        { label: 'cursor', value: cell ? `row ${cell.rowId} · column ${cell.columnId}` : '(not in the grid yet)' },
                        { label: 'announced', value: announcements.length > 0 ? announcements.join('\n') : '(nothing yet)' },
                    ]}
                />
            </div>
            <div className="sc-grid" ref={wrapper} style={{ marginTop: 16 }}>
                <Gridwright<Person> columns={columns} data={PEOPLE} pageSize={10} selectionMode="multiple" addons={addons} aria-label="People, keyboard navigable" />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Moving the cursor announces nothing on purpose: the browser already names the focused cell, and a region repeating it would
                talk over that on every arrow key.
            </Typography>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
