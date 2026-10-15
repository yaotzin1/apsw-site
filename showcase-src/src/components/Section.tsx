import type { ReactNode } from 'react';
import { Typography } from '@mui/material';

export function Section({ id, tag, title, lead, children }: { id: string; tag?: string; title: string; lead: ReactNode; children: ReactNode }) {
    return (
        <section id={id} className="sc-section" aria-labelledby={`${id}-title`}>
            {tag ? <span className="sc-tag">{tag}</span> : null}
            <Typography component="h2" variant="h2" id={`${id}-title`} gutterBottom>
                {title}
            </Typography>
            <Typography color="text.secondary" className="sc-section__lead" sx={{ mb: 2 }}>
                {lead}
            </Typography>
            {children}
        </section>
    );
}
