import { CssBaseline, ThemeProvider } from '@mui/material';
import { Header } from './components/Header';
import { PackageStrip } from './components/PackageStrip';
import { SectionNav } from './components/SectionNav';
import { FilterSection } from './sections/FilterSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { VirtualSection } from './sections/VirtualSection';
import { TreeSection } from './sections/TreeSection';
import { DetailSection } from './sections/DetailSection';
import { ActionsSection } from './sections/ActionsSection';
import { LayoutSection } from './sections/LayoutSection';
import { ResponsiveSection } from './sections/ResponsiveSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { MuiDashboardSection } from './sections/MuiDashboardSection';
import { MuiSection } from './sections/MuiSection';
import { MuiThemeSection } from './sections/MuiThemeSection';
import { MuiMixSection } from './sections/MuiMixSection';
import { MuiTokensSection } from './sections/MuiTokensSection';
import { ExcelDeepDiveSection } from './sections/ExcelDeepDiveSection';
import { AccessibilitySection } from './sections/AccessibilitySection';
import { RemoteSection } from './sections/RemoteSection';
import { themeFor } from './theme';
import { useThemeMode } from './useThemeMode';

export function App() {
    const mode = useThemeMode();
    return (
        <ThemeProvider theme={themeFor(mode)}>
            <CssBaseline />
            <div className="sc-page">
                <Header />
                <SectionNav />
                <main>
                    <PackageStrip />
                    <FilterSection />
                    <FeaturesSection />
                    <VirtualSection />
                    <TreeSection />
                    <DetailSection />
                    <ActionsSection />
                    <LayoutSection />
                    <ResponsiveSection />
                    <LanguagesSection />
                    <MuiDashboardSection />
                    <MuiSection />
                    <MuiThemeSection />
                    <MuiMixSection />
                    <MuiTokensSection />
                    <ExcelDeepDiveSection />
                    <AccessibilitySection />
                    <RemoteSection />
                </main>
            </div>
        </ThemeProvider>
    );
}
