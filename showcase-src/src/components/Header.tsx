import { IconButton, Link, Tooltip, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleThemeMode, useThemeMode } from '../useThemeMode';

export function Header() {
    const mode = useThemeMode();
    const next = mode === 'dark' ? 'light' : 'dark';
    return (
        <header className="sc-header">
            <div className="sc-header__brand">
                <img className="sc-header__logo sc-header__logo--light" src="/assets/brand/apsw-logo-color.svg" alt="" width="40" height="40" />
                <img className="sc-header__logo sc-header__logo--dark" src="/assets/brand/apsw-logo-white.svg" alt="" width="40" height="40" />
                <div>
                    <Typography component="h1" variant="h1">
                        Open-source showcase
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span className="sc-nowrap">apsw-gridwright</span> and <span className="sc-nowrap">apsw-mui-excel-filter</span>, live
                    </Typography>
                </div>
            </div>
            <nav className="sc-header__links" aria-label="Site">
                <Link href="/">← Back to apsw.pl</Link>
                <Link href="/gridwright-examples.html">Agent playbook</Link>
                <Tooltip title={`Switch to ${next} mode`}>
                    <IconButton onClick={toggleThemeMode} aria-label={`Switch to ${next} mode`} size="small" color="primary">
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Tooltip>
            </nav>
        </header>
    );
}
