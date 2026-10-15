import { useMemo, useState } from 'react';
import { FormControlLabel, Stack, Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { createTranslator, type LocaleCatalog } from 'apsw-gridwright';
import { de, en, es, fr, pl } from 'apsw-gridwright/locales';
import { Gridwright, columnFilters, exportMenu, search, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { CITIES, DEPARTMENTS, PEOPLE, STATUSES, optionsOf, type Person } from '../data';

const PACKS: { tag: string; label: string; pack: LocaleCatalog }[] = [
    { tag: 'en', label: 'English', pack: en },
    { tag: 'pl', label: 'Polski', pack: pl },
    { tag: 'de', label: 'Deutsch', pack: de },
    { tag: 'fr', label: 'Français', pack: fr },
    { tag: 'es', label: 'Español', pack: es },
];

export function LanguagesSection() {
    const [tag, setTag] = useState('pl');
    const [rtl, setRtl] = useState(false);

    const pack = PACKS.find((entry) => entry.tag === tag)?.pack ?? en;
    // A catalog may override the direction its tag implies; that is the whole RTL switch.
    const locale = useMemo((): LocaleCatalog => (rtl ? { ...pack, direction: 'rtl' } : pack), [pack, rtl]);

    // Column values are the application's. Formatting them with the same tag is the app's choice, made here.
    const columns = useMemo((): GridwrightColumn<Person>[] => {
        const money = new Intl.NumberFormat(tag, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
        const date = new Intl.DateTimeFormat(tag, { dateStyle: 'medium' });
        return [
            personColumns.name,
            { ...personColumns.department, filter: { type: 'select', choices: optionsOf(DEPARTMENTS) } },
            { ...personColumns.city, filter: { type: 'select', choices: optionsOf(CITIES) } },
            { ...personColumns.status, filter: { type: 'select', choices: optionsOf(STATUSES) } },
            { ...personColumns.salary, formatValue: (v) => money.format(Number(v)), filter: { type: 'number' } },
            { ...personColumns.startDate, formatValue: (v) => date.format(new Date(String(v))), filter: { type: 'date' } },
        ];
    }, [tag]);

    const addons = useMemo(
        (): GridAddon<Person>[] => [search<Person>(), columnFilters<Person>(), exportMenu<Person>({ formats: ['csv', 'excel', 'print'], filename: 'people' })],
        [],
    );

    // The same translator the grid renders through, asked for a few strings so the readout shows what changed.
    const sample = useMemo(() => {
        const translator = createTranslator({ catalog: locale });
        return {
            direction: translator.direction,
            plural: [1, 3, 25].map((count) => translator.t('a11y.rowsTotal', { count })).join(' · '),
            number: translator.formatNumber(1234567.5),
            search: translator.translateAddon('gridwright:search', 'placeholder'),
            selected: translator.translateAddon('gridwright:selection', 'count', { count: 2 }),
        };
    }, [locale]);

    return (
        <Section
            id="languages"
            tag="apsw-gridwright/locales · locale={pl}"
            title="Five languages and right-to-left"
            lead={
                <>
                    Pick a language and every string the grid owns changes with it: the search placeholder, the filter dialog and its
                    conditions, the export menu, the page controls, the selection count and the sentences read to a screen reader. Plurals
                    come from <code>Intl.PluralRules</code>, so Polish gets its four forms and a number is formatted for the locale without
                    the catalog saying anything. The RTL switch flips the grid's direction: the stylesheet uses logical properties, so the
                    layout mirrors and the arrow keys follow reading order. Each pack is a separate import, and the bundle carries only the
                    ones named.
                </>
            }
        >
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                <ToggleButtonGroup exclusive size="small" value={tag} onChange={(_, next: string | null) => next && setTag(next)} aria-label="Grid language">
                    {PACKS.map((entry) => (
                        <ToggleButton key={entry.tag} value={entry.tag} lang={entry.tag}>
                            {entry.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <FormControlLabel control={<Switch checked={rtl} onChange={(_, checked) => setRtl(checked)} />} label="Right-to-left" />
            </Stack>
            <Readout
                title="From the grid's translator"
                rows={[
                    { label: 'locale', value: `${locale.locale}, ${sample.direction}` },
                    { label: 'a11y.rowsTotal', value: sample.plural },
                    { label: 'formatNumber', value: sample.number },
                    { label: 'search.placeholder', value: sample.search },
                    { label: 'selection.count', value: sample.selected },
                ]}
            />
            <div className="sc-grid" style={{ marginTop: 16 }}>
                <Gridwright<Person>
                    columns={columns}
                    data={PEOPLE}
                    pageSize={10}
                    selectionMode="multiple"
                    locale={locale}
                    addons={addons}
                    aria-label="People, translated"
                />
            </div>
            <InstallBlock packages={['apsw-gridwright']} />
        </Section>
    );
}
