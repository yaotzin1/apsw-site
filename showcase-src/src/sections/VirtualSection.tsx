import { useEffect, useMemo, useRef, useState } from 'react';
import { Gridwright, search, useGridwright, virtualRows, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { generatePeople, type Person } from '../data';

const ROW_COUNT = 100_000;
const WINDOW = 200;
const HEIGHT = 480;
const ROW_HEIGHT = 40;

const columns: GridwrightColumn<Person>[] = [
    personColumns.id,
    personColumns.name,
    personColumns.email,
    personColumns.department,
    personColumns.city,
    personColumns.salary,
    personColumns.startDate,
];

const count = new Intl.NumberFormat('en-GB');

export function VirtualSection() {
    // Generated once, in the browser, from the same seeded PRNG as the 300-row demos: nothing static ships in the bundle.
    const rows = useMemo(() => generatePeople(ROW_COUNT, 31337), []);
    const addons = useMemo((): GridAddon<Person>[] => [search<Person>(), virtualRows<Person>({ rowHeight: ROW_HEIGHT, height: HEIGHT })], []);
    const grid = useGridwright<Person>({ columns, data: rows, pageSize: WINDOW, addons });

    // The honest number: how many <tr class="gw-row"> the grid actually has in the document right now.
    const wrapper = useRef<HTMLDivElement>(null);
    const [rendered, setRendered] = useState(0);
    useEffect(() => {
        const root = wrapper.current;
        if (!root) return;
        let frame = 0;
        const measure = () => {
            frame = 0;
            setRendered(root.querySelectorAll('tr.gw-row').length);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };
        const observer = new MutationObserver(schedule);
        observer.observe(root, { childList: true, subtree: true });
        // The windowed body measures its container before it places rows, so ask again once that has settled, and on every scroll.
        root.addEventListener('scroll', schedule, { capture: true, passive: true });
        const settled = window.setTimeout(schedule, 250);
        schedule();
        return () => {
            observer.disconnect();
            root.removeEventListener('scroll', schedule, { capture: true });
            window.clearTimeout(settled);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <Section
            id="virtual"
            tag="apsw-gridwright · virtualRows()"
            title="100,000 rows, one scrollbar"
            lead={
                <>
                    You scroll a list of a hundred thousand people as if it were a short one: the array is in memory, but only the rows
                    inside the {HEIGHT}px viewport plus a few of overscan are in the document, carried by two spacer rows so the element
                    stays a real <code>{'<table role="grid">'}</code> with the true <code>aria-rowcount</code>. Sorting a header and typing
                    in the search box still work over all {count.format(ROW_COUNT)} rows, because the pipeline is the same one the paged
                    grids use; the scrollbar simply replaces the page controls. The counters below are read from the grid, not typed in.
                </>
            }
        >
            <Readout
                title="Measured"
                rows={[
                    { label: 'rows in memory', value: `${count.format(ROW_COUNT)} Person objects` },
                    { label: 'rows matching', value: grid.state.isTotalExact ? count.format(grid.state.totalRows) : '…' },
                    { label: 'rows the engine holds', value: `${grid.state.rows.length} (one ${WINDOW}-row window of the pipeline)` },
                    { label: 'rows in the DOM', value: `${rendered} <tr> elements` },
                ]}
            />
            <div className="sc-grid" ref={wrapper} style={{ marginTop: 16 }}>
                <Gridwright<Person> instance={grid} columns={columns} aria-label="One hundred thousand people, windowed" />
            </div>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
