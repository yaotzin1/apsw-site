import { useCallback, useMemo, useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import { Gridwright, coreAddons, rowActions, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { PEOPLE, STATUSES, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [personColumns.name, personColumns.email, personColumns.department, personColumns.status, personColumns.role];

interface Notice {
    message: string;
    undo?: () => void;
}

export function ActionsSection() {
    const [rows, setRows] = useState<Person[]>(() => PEOPLE.slice(0, 60));
    const [notice, setNotice] = useState<Notice | null>(null);
    const [log, setLog] = useState<string[]>([]);
    const [selected, setSelected] = useState(0);

    const notify = useCallback((message: string, undo?: () => void) => {
        setNotice({ message, undo });
        setLog((current) => [message, ...current].slice(0, 5));
    }, []);

    const addons = useMemo(
        (): GridAddon<Person>[] => [
            rowActions<Person>({
                // The left click selects the row (selectOnRowClick below), so the menu keeps hover, focus and right-click only.
                trigger: 'hover-contextmenu',
                items: [
                    {
                        id: 'leave',
                        label: 'Toggle on leave',
                        hidden: (row) => row.data.status === 'alumni',
                        onSelect: (row) => {
                            const person = row.data;
                            const next = person.status === 'leave' ? 'active' : 'leave';
                            setRows((current) => current.map((r) => (r.id === person.id ? { ...r, status: next } : r)));
                            notify(`${person.name} is now ${STATUSES[next]}.`);
                        },
                    },
                    {
                        id: 'copy',
                        label: 'Copy email',
                        onSelect: (row) => {
                            const { email } = row.data;
                            if (!navigator.clipboard) {
                                notify(`Clipboard unavailable on this origin; the address is ${email}.`);
                                return;
                            }
                            navigator.clipboard.writeText(email).then(
                                () => notify(`Copied ${email} to the clipboard.`),
                                () => notify(`The browser refused the copy; the address is ${email}.`),
                            );
                        },
                    },
                    {
                        id: 'remove',
                        label: 'Remove from list',
                        destructive: true,
                        separatorBefore: true,
                        onSelect: (row) => {
                            const person = row.data;
                            setRows((current) => current.filter((r) => r.id !== person.id));
                            notify(`Removed ${person.name}.`, () => setRows((current) => [...current, person].sort((a, b) => a.id - b.id)));
                        },
                    },
                ],
            }),
        ],
        [notify],
    );

    return (
        <Section
            id="actions"
            tag="apsw-gridwright · rowActions()"
            title="Row actions: a menu where the pointer is"
            lead={
                <>
                    Hover a row and its menu previews beside the pointer; right-click, press the context-menu key or Shift+F10 on a focused
                    cell, and it pins open with the arrow keys moving between items. A left click is left to selection, which is what{' '}
                    <code>trigger: 'hover-contextmenu'</code> is for. The three actions change what you see: toggling leave rewrites the
                    row, copying puts the address on your clipboard, and removing a row can be undone from the snackbar. &ldquo;Toggle on
                    leave&rdquo; is hidden for alumni, so the menu only offers what applies to that row.
                </>
            }
        >
            <Readout
                title="Last actions"
                rows={[
                    { label: 'rows', value: `${rows.length} of ${PEOPLE.slice(0, 60).length}` },
                    { label: 'selected', value: String(selected) },
                    { label: 'log', value: log.length > 0 ? log.join('\n') : '(nothing yet)' },
                ]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person>
                    columns={columns}
                    data={rows}
                    pageSize={10}
                    selectionMode="multiple"
                    coreAddons={coreAddons<Person>({ selection: { selectOnRowClick: true } })}
                    onSelectionChange={(ids) => setSelected(ids.length)}
                    addons={addons}
                    aria-label="People with a row menu"
                />
            </div>
            <Snackbar
                open={notice !== null}
                autoHideDuration={5000}
                onClose={(_, reason) => reason !== 'clickaway' && setNotice(null)}
                message={notice?.message}
                action={
                    notice?.undo ? (
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() => {
                                notice.undo?.();
                                setNotice(null);
                            }}
                        >
                            Undo
                        </Button>
                    ) : undefined
                }
            />
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
