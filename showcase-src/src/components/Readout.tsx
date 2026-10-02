import type { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';

/**
 * An instrument-style readout: a bracketed label and a mono value per row. Values are what the
 * grid or the add-on actually reported, never a guess.
 */
export function Readout({ title, rows, live = true, children }: { title?: string; rows?: { label: string; value: ReactNode }[]; live?: boolean; children?: ReactNode }) {
    return (
        <Paper className="sc-readout" sx={{ p: 1.5, bgcolor: 'background.default' }} aria-live={live ? 'polite' : undefined}>
            {title ? (
                <Typography variant="overline" color="text.secondary" component="div">
                    {title}
                </Typography>
            ) : null}
            {rows ? (
                <dl className="sc-readout__rows">
                    {rows.map((row) => (
                        <div key={row.label} className="sc-readout__row">
                            <dt className="sc-tag">{row.label}</dt>
                            <dd className="sc-mono">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            ) : null}
            {children}
        </Paper>
    );
}
