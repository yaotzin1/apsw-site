import { Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { PACKAGES } from '../packages';

/** Three cards, one per package: what it is, the version this page runs, licence, links, and where its demos are. */
export function PackageStrip() {
    return (
        <section id="packages" className="sc-section sc-section--first" aria-labelledby="packages-title">
            <span className="sc-tag">three packages, MIT, on npm</span>
            <Typography component="h2" variant="h2" id="packages-title" gutterBottom>
                What is on this page
            </Typography>
            <Typography color="text.secondary" className="sc-section__lead" sx={{ mb: 2 }}>
                Every grid below is the published package, installed from npm and rendered in this browser. The versions are read from the
                installed <code>package.json</code> files at build time, so the page shows what it runs.
            </Typography>
            <div className="sc-packages">
                {PACKAGES.map((pkg) => (
                    <Paper key={pkg.name} className="sc-package" sx={{ p: 2 }}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                            <Typography component="h3" variant="h3" className="sc-nowrap">
                                {pkg.name}
                            </Typography>
                            <Chip size="small" label={`v${pkg.version}`} className="sc-chip-mono" />
                            <Chip size="small" label="MIT" variant="outlined" className="sc-chip-mono" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flex: 1 }}>
                            {pkg.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1.5 }}>
                            <Link href={pkg.npm} target="_blank" rel="noopener">
                                npm
                            </Link>
                            {' · '}
                            <Link href={pkg.github} target="_blank" rel="noopener">
                                GitHub
                            </Link>
                        </Typography>
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{ mt: 1.5 }} aria-label={`Demos of ${pkg.name}`} component="nav">
                            {pkg.demos.map((demo) => (
                                <Chip key={demo.id} component="a" href={`#${demo.id}`} clickable size="small" variant="outlined" color="primary" label={demo.label} />
                            ))}
                        </Stack>
                    </Paper>
                ))}
            </div>
        </section>
    );
}
