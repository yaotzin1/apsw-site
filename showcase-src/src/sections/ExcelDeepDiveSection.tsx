import { useMemo, useState } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { ExcelFilterSelect } from 'apsw-mui-excel-filter';
import { Gridwright, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { PEOPLE, ROLE_OPTIONS, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [personColumns.name, personColumns.role, personColumns.department, personColumns.city];

const STEPS: { text: string; note?: string }[] = [
    {
        text: 'Open Role and type "eng".',
        note: 'Typing selects: the matches are ticked and everything else is dropped. Untick "Sales Engineer" if you only want engineering.',
    },
    {
        text: 'Tick "Add current selection to filter".',
        note: 'It appears while you are searching, and hands the selection back to you: from now on the search only narrows what is on screen.',
    },
    {
        text: 'Type "design".',
        note: 'The list narrows to the design roles. Your engineers stay ticked while they are off screen, because a second search no longer replaces the first.',
    },
    {
        text: 'Tick the design roles you want, then press OK or Enter.',
        note: 'One onChange fires with both sets. The readout on the right shows exactly what it emitted.',
    },
    {
        text: 'Open it again, tick everything back, press OK.',
        note: 'Everything ticked means "no filter", so the value is [] and the parameter leaves the query string.',
    },
];

export function ExcelDeepDiveSection() {
    const [roles, setRoles] = useState<string[]>([]);
    const [emitted, setEmitted] = useState<string[][]>([]);

    const onChange = (next: string[]) => {
        setRoles(next);
        setEmitted((current) => [...current, next]);
    };

    const rows = useMemo(() => (roles.length === 0 ? PEOPLE : PEOPLE.filter((person) => roles.includes(person.role))), [roles]);
    const query = roles.length > 0 ? `?role=${roles.map(encodeURIComponent).join(',')}` : '';

    return (
        <Section
            id="excel"
            tag="apsw-mui-excel-filter · two-term selection"
            title="Excel filter deep dive: a selection built from two searches"
            lead={
                <>
                    A search box that <em>selects</em> is quicker than one that merely hides, but it means a second search replaces the
                    first. Excel solves that with &ldquo;Add current selection to filter&rdquo;, and so does this field. Follow the five
                    steps against the {ROLE_OPTIONS.length} roles below and watch the value <code>onChange</code> hands back after each
                    OK: it fires on OK only, never while the popup is being edited, so a half-built selection never becomes a request.
                </>
            }
        >
            <div className="sc-walkthrough">
                <Paper sx={{ p: 2 }}>
                    <div className="sc-filters">
                        <ExcelFilterSelect label="Role" options={ROLE_OPTIONS} value={roles} onChange={onChange} width="100%" />
                        <Button onClick={() => onChange([])} disabled={roles.length === 0} sx={{ height: 32, flex: '0 0 auto' }}>
                            Clear
                        </Button>
                    </div>
                    <ol className="sc-steps">
                        {STEPS.map((step, index) => (
                            <li key={index}>
                                <Typography variant="body2">{step.text}</Typography>
                                {step.note ? (
                                    <Typography variant="body2" color="text.secondary">
                                        {step.note}
                                    </Typography>
                                ) : null}
                            </li>
                        ))}
                    </ol>
                </Paper>
                <Readout
                    title="Emitted by onChange"
                    rows={[
                        { label: 'current value', value: JSON.stringify(roles) },
                        { label: 'request', value: `GET /api/people${query}` },
                        { label: 'matching', value: `${rows.length} of ${PEOPLE.length} people` },
                        {
                            label: 'history',
                            value: emitted.length > 0 ? emitted.map((value, index) => `OK #${index + 1} → ${JSON.stringify(value)}`).join('\n') : '(press OK to see the first value)',
                        },
                    ]}
                />
            </div>
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person> columns={columns} data={rows} pageSize={10} aria-label="People, narrowed by role" />
            </div>
            <InstallBlock packages={['apsw-mui-excel-filter']} />
        </Section>
    );
}
