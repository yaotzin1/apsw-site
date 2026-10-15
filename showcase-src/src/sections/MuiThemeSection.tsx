import { useMemo, useState } from 'react';
import { FormControlLabel, Paper, Switch, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ThemeProvider, createTheme, useColorScheme, type Theme } from '@mui/material/styles';
import { Gridwright, search, type GridAddon, type GridwrightColumn } from 'apsw-gridwright/react';
import { muiAddons } from 'apsw-gridwright-mui';
import { InstallBlock } from '../components/InstallBlock';
import { Readout } from '../components/Readout';
import { Section } from '../components/Section';
import { personColumns } from '../columns';
import { FONT_BODY, FONT_MONO } from '../theme';
import { PEOPLE, type Person } from '../data';

const columns: GridwrightColumn<Person>[] = [
    personColumns.name,
    personColumns.department,
    personColumns.city,
    personColumns.status,
    personColumns.salary,
    personColumns.startDate,
];

interface Preset {
    id: string;
    prefix: string;
    label: string;
    summary: string;
    theme: Theme;
}

/**
 * Three themes built with `createTheme({ cssVariables })`. Each gets its own variable prefix, so the
 * three sets of `--<prefix>-*` custom properties never collide, and a `colorSchemeSelector` so the
 * light and dark schemes are two CSS rule sets switched by an attribute rather than a render.
 */
const PRESETS: Preset[] = [
    {
        id: 'corporate',
        prefix: 'corp',
        label: 'Corporate',
        summary: 'Teal primary, 14px radius, comfortable spacing, 15px type. Its `components` entries restyle the pager, the checkbox and the sort label.',
        theme: createTheme({
            cssVariables: { cssVarPrefix: 'corp', colorSchemeSelector: 'data-sc-scheme' },
            colorSchemes: {
                light: { palette: { primary: { main: '#0f766e' }, secondary: { main: '#d97706' }, background: { default: '#f0fdfa', paper: '#ffffff' } } },
                dark: { palette: { primary: { main: '#5eead4' }, secondary: { main: '#fbbf24' }, background: { default: '#042f2e', paper: '#134e4a' } } },
            },
            shape: { borderRadius: 14 },
            spacing: 10,
            typography: { fontFamily: FONT_BODY, body2: { fontSize: '15px', lineHeight: 1.6 } },
            components: {
                // A brand-coloured checkbox: the selection column really is MUI's Checkbox.
                MuiCheckbox: {
                    styleOverrides: {
                        root: { color: '#d97706', '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: '#d97706' } },
                    },
                },
                // Outlined pager buttons: the pager really is MUI's TablePagination.
                MuiTablePagination: {
                    styleOverrides: {
                        toolbar: { gap: 8 },
                        actions: {
                            '& .MuiIconButton-root': { border: '1px solid currentColor', borderRadius: 8, marginLeft: 6, padding: 4 },
                        },
                        select: { fontWeight: 600 },
                    },
                },
                // A sort label that stays teal while active and shows its arrow at rest.
                MuiTableSortLabel: {
                    styleOverrides: {
                        root: { textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '12px', fontWeight: 700, '&.Mui-active': { color: '#0f766e' } },
                        icon: { opacity: 0.4 },
                    },
                },
            },
        }),
    },
    {
        id: 'dense',
        prefix: 'dense',
        label: 'Dense',
        summary: '2px radius, 4px spacing unit, 12.5px type, small checkboxes by defaultProps: a grid for people who want rows, not air.',
        theme: createTheme({
            cssVariables: { cssVarPrefix: 'dense', colorSchemeSelector: 'data-sc-scheme' },
            colorSchemes: {
                light: { palette: { primary: { main: '#1d4ed8' }, background: { default: '#f8fafc', paper: '#ffffff' } } },
                dark: { palette: { primary: { main: '#93c5fd' }, background: { default: '#0b1220', paper: '#111a2b' } } },
            },
            shape: { borderRadius: 2 },
            spacing: 4,
            typography: { fontFamily: FONT_BODY, body2: { fontSize: '12.5px', lineHeight: 1.35 } },
            components: {
                MuiCheckbox: { defaultProps: { size: 'small' } },
                MuiTablePagination: { styleOverrides: { toolbar: { minHeight: 36 }, root: { fontSize: '12px' } } },
                MuiTableSortLabel: { styleOverrides: { root: { fontSize: '12px' } } },
            },
        }),
    },
    {
        id: 'contrast',
        prefix: 'hc',
        label: 'High contrast',
        summary: 'Black on white (white on black in the dark scheme), a yellow accent, no radius, and a divider you cannot miss.',
        theme: createTheme({
            cssVariables: { cssVarPrefix: 'hc', colorSchemeSelector: 'data-sc-scheme' },
            colorSchemes: {
                light: {
                    palette: { primary: { main: '#000000' }, secondary: { main: '#b45309' }, divider: '#000000', text: { primary: '#000000', secondary: '#1f2937' }, background: { default: '#ffffff', paper: '#ffffff' } },
                },
                dark: {
                    palette: { primary: { main: '#ffd400' }, secondary: { main: '#ffffff' }, divider: '#ffffff', text: { primary: '#ffffff', secondary: '#e5e7eb' }, background: { default: '#000000', paper: '#000000' } },
                },
            },
            shape: { borderRadius: 0 },
            spacing: 8,
            typography: { fontFamily: FONT_MONO, body2: { fontSize: '14px', lineHeight: 1.5 } },
            components: {
                MuiTableSortLabel: { styleOverrides: { root: { '&.Mui-active': { textDecoration: 'underline' } } } },
                MuiCheckbox: { styleOverrides: { root: { '& .MuiSvgIcon-root': { fontSize: 26 } } } },
            },
        }),
    },
];

/** Inside the preset's provider, so it reads and sets that provider's colour scheme. */
function SchemeSwitch() {
    const { mode, setMode } = useColorScheme();
    return <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={(_, dark) => setMode(dark ? 'dark' : 'light')} />} label="Dark scheme" />;
}

export function MuiThemeSection() {
    const [presetId, setPresetId] = useState(PRESETS[0]!.id);
    const preset = PRESETS.find((entry) => entry.id === presetId) ?? PRESETS[0]!;
    const addons = useMemo((): GridAddon<Person>[] => [search<Person>()], []);

    return (
        <Section
            id="mui-theme"
            tag="apsw-gridwright-mui · muiTheme() · createTheme({ cssVariables })"
            title="The grid follows the theme, live"
            lead={
                <>
                    Pick a preset and the grid changes with it: colours, radius, type size, cell padding and the look of its sort labels,
                    checkboxes and pager, all read from the MUI theme in context by <code>muiTheme()</code>, which <code>muiAddons()</code>{' '}
                    includes. The rows are untouched; only the provider around them changes. Each preset is built with{' '}
                    <code>cssVariables</code>, which the package supports as its README says: the grid's tokens become{' '}
                    <code>var(--corp-…)</code> references, so the dark-scheme switch is an attribute flip that CSS resolves without the
                    grid rendering again. The switch's state lives in this block's provider and is not stored anywhere.
                </>
            }
        >
            <div>
                {(
                    <ThemeProvider theme={preset.theme} defaultMode="light" storageManager={null}>
                        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                            <div className="sc-dashboard__bar" style={{ marginBottom: 16 }}>
                                <ToggleButtonGroup exclusive size="small" value={presetId} onChange={(_, next: string | null) => next && setPresetId(next)} aria-label="Theme preset">
                                    {PRESETS.map((entry) => (
                                        <ToggleButton key={entry.id} value={entry.id}>
                                            {entry.label}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                <SchemeSwitch />
                            </div>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {preset.summary}
                            </Typography>
                            <div className="sc-grid">
                                <Gridwright<Person>
                                    columns={columns}
                                    data={PEOPLE}
                                    pageSize={10}
                                    selectionMode="multiple"
                                    coreAddons={muiAddons<Person>({ pagination: { pageSizeOptions: [10, 25, 50] } })}
                                    addons={addons}
                                    aria-label={`People, in the ${preset.label} theme`}
                                />
                            </div>
                        </Paper>
                    </ThemeProvider>
                )}
            </div>
            <Readout
                title="This preset"
                live={false}
                rows={[
                    { label: 'cssVarPrefix', value: preset.prefix },
                    { label: 'shape.borderRadius', value: `${preset.theme.shape.borderRadius}px` },
                    { label: 'spacing(1)', value: preset.theme.spacing(1) },
                    { label: 'body2.fontSize', value: String(preset.theme.typography.body2.fontSize) },
                    { label: 'components overridden', value: Object.keys(preset.theme.components ?? {}).join(', ') || 'none' },
                ]}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                What does not follow a <code>components</code> override: the table, rows and cells are the grid's own markup, themed through
                the tokens; a <code>MuiTableCell</code> override does not reach them.
            </Typography>
            <InstallBlock packages={['apsw-gridwright', 'apsw-gridwright-mui']} />
        </Section>
    );
}
