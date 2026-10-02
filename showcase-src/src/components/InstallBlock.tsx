import { Link, Paper, Stack, Typography } from '@mui/material';

export type PackageName = 'apsw-gridwright' | 'apsw-gridwright-mui' | 'apsw-mui-excel-filter';

const GITHUB: Record<PackageName, string> = {
    'apsw-gridwright': 'https://github.com/yaotzin1/apsw-gridwright',
    'apsw-gridwright-mui': 'https://github.com/yaotzin1/apsw-gridwright/tree/main/packages/mui',
    'apsw-mui-excel-filter': 'https://github.com/yaotzin1/apsw-mui-excel-filter',
};

export function InstallBlock({ packages }: { packages: PackageName[] }) {
    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="overline" color="text.secondary">
                Install
            </Typography>
            <pre className="sc-mono">{packages.map((name) => `npm install ${name}`).join('\n')}</pre>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                {packages.map((name) => (
                    <Typography key={name} variant="body2">
                        {name}:{' '}
                        <Link href={`https://www.npmjs.com/package/${name}`} target="_blank" rel="noopener">
                            npm
                        </Link>
                        {' · '}
                        <Link href={GITHUB[name]} target="_blank" rel="noopener">
                            GitHub
                        </Link>
                    </Typography>
                ))}
            </Stack>
        </Paper>
    );
}
