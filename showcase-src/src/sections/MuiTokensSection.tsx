import { useMemo } from 'react';
import { Paper, Typography } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';
import { muiTokens, type GridTokens } from 'apsw-gridwright-mui';
import { InstallBlock } from '../components/InstallBlock';
import { Section } from '../components/Section';

/** A theme built with `cssVariables`, so the same function answers with `var(--app-…)` references instead of values. */
const VARS_THEME = createTheme({ cssVariables: { cssVarPrefix: 'app' }, palette: { primary: { main: '#044259' } } });

function TokenList({ title, note, tokens }: { title: string; note: string; tokens: GridTokens }) {
    const entries = Object.entries(tokens) as [string, string][];
    return (
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
            <Typography variant="overline" color="text.secondary" component="div">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {note}
            </Typography>
            <dl className="sc-tokens__list sc-mono">
                {entries.map(([name, value]) => (
                    <div key={name} style={{ display: 'contents' }}>
                        <dt>{name}</dt>
                        <dd>
                            {/^(#|rgb|hsl)/.test(value) ? <span className="sc-swatch" style={{ background: value }} aria-hidden="true" /> : null}
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>
        </Paper>
    );
}

export function MuiTokensSection() {
    // The page's own theme, from context: these values change with the header's light/dark toggle.
    const pageTheme = useTheme();
    const pageTokens = useMemo(() => muiTokens(pageTheme), [pageTheme]);
    const varTokens = useMemo(() => muiTokens(VARS_THEME), []);

    return (
        <Section
            id="mui-tokens"
            tag="apsw-gridwright-mui · muiTokens(theme)"
            title="The tokens a theme produces"
            lead={
                <>
                    <code>muiTokens(theme)</code> is the function <code>muiTheme()</code> applies to the grid's root: it maps an MUI theme
                    to the grid's <code>--gw-*</code> custom properties. Call it yourself to reuse the same values in your own CSS, in a
                    legend beside the grid, or in a chart that should match. The left panel is this page's theme as resolved values
                    (toggle dark mode in the header and watch them change); the right is a theme built with <code>cssVariables</code>,
                    where every colour comes back as a <code>var(--app-…)</code> reference and follows a colour-scheme switch without a
                    render.
                </>
            }
        >
            <div className="sc-tokens">
                <TokenList title="This page's theme" note={`palette.mode = ${pageTheme.palette.mode}; resolved values, ${Object.keys(pageTokens).length} tokens.`} tokens={pageTokens} />
                <TokenList title="A cssVariables theme" note="createTheme({ cssVariables: { cssVarPrefix: 'app' } }); colours are references." tokens={varTokens} />
            </div>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Left to the stylesheet on purpose: <code>--gw-focus-ring</code>, built from the surface and accent on the same element, and{' '}
                <code>--gw-row-height</code>, which <code>virtualRows()</code> relies on.
            </Typography>
            <InstallBlock packages={['apsw-gridwright-mui']} />
        </Section>
    );
}
