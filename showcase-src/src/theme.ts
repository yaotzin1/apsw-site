import { createTheme, type Theme } from '@mui/material/styles';

export type ThemeMode = 'light' | 'dark';

/**
 * The only place colours are decided. `src/styles.css` mirrors them as CSS variables for the grid.
 * Values match the site's design tokens: css/design-system.css (light) and css/instrument.css (dark).
 */
export const PALETTE = {
    light: { canvas: '#f8fafc', surface: '#ffffff', primary: '#044259', secondary: '#047857', divider: '#e2e8f0' },
    dark: { canvas: '#0b1220', surface: '#111a2b', primary: '#38bdf8', secondary: '#34d399', divider: 'rgba(56, 189, 248, 0.14)' },
} as const;

export const FONT_BODY = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";
export const FONT_DISPLAY = "'Outfit', 'Inter', system-ui, sans-serif";
export const FONT_MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const themes: Partial<Record<ThemeMode, Theme>> = {};

export function themeFor(mode: ThemeMode): Theme {
    const cached = themes[mode];
    if (cached) return cached;
    const colours = PALETTE[mode];
    const theme = createTheme({
        palette: {
            mode,
            primary: { main: colours.primary },
            secondary: { main: colours.secondary },
            background: { default: colours.canvas, paper: colours.surface },
            divider: colours.divider,
        },
        typography: {
            fontFamily: FONT_BODY,
            h1: { fontFamily: FONT_DISPLAY, fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' },
            h2: { fontFamily: FONT_DISPLAY, fontSize: '1.45rem', fontWeight: 700, letterSpacing: '-0.02em' },
            h3: { fontFamily: FONT_DISPLAY, fontSize: '1.05rem', fontWeight: 600 },
            overline: { fontFamily: FONT_MONO, letterSpacing: '0.04em' },
        },
        shape: { borderRadius: mode === 'dark' ? 6 : 8 },
        components: {
            MuiPaper: { defaultProps: { variant: 'outlined' } },
            MuiLink: { defaultProps: { underline: 'hover' } },
        },
    });
    themes[mode] = theme;
    return theme;
}
