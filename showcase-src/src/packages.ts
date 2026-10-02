import { version as gridwrightVersion } from 'apsw-gridwright/package.json';
import { version as gridwrightMuiVersion } from 'apsw-gridwright-mui/package.json';
import { version as excelFilterVersion } from 'apsw-mui-excel-filter/package.json';

export type PackageName = 'apsw-gridwright' | 'apsw-gridwright-mui' | 'apsw-mui-excel-filter';

export interface PackageInfo {
    name: PackageName;
    /** The version installed in this build, read from the package's own package.json. */
    version: string;
    description: string;
    npm: string;
    github: string;
    /** Section ids on this page that demo the package. */
    demos: { id: string; label: string }[];
}

export const GITHUB: Record<PackageName, string> = {
    'apsw-gridwright': 'https://github.com/yaotzin1/apsw-gridwright',
    'apsw-gridwright-mui': 'https://github.com/yaotzin1/apsw-gridwright/tree/main/packages/mui',
    'apsw-mui-excel-filter': 'https://github.com/yaotzin1/apsw-mui-excel-filter',
};

export const PACKAGES: PackageInfo[] = [
    {
        name: 'apsw-gridwright',
        version: gridwrightVersion,
        description:
            'React data grid on a headless TypeScript engine: one pipeline for local and remote data, with sorting, typed filters, search, paging, virtual rows, tree data, expandable rows, row menus, column layout, URL sync, inline editing, export and WAI-ARIA grid semantics as add-ons.',
        npm: 'https://www.npmjs.com/package/apsw-gridwright',
        github: GITHUB['apsw-gridwright'],
        demos: [
            { id: 'features', label: 'Features' },
            { id: 'virtual', label: '100k rows' },
            { id: 'tree', label: 'Tree' },
            { id: 'detail', label: 'Detail' },
            { id: 'actions', label: 'Row actions' },
            { id: 'layout', label: 'Layout & URL' },
            { id: 'languages', label: 'Languages' },
            { id: 'a11y', label: 'Accessibility' },
            { id: 'remote', label: 'Remote' },
        ],
    },
    {
        name: 'apsw-gridwright-mui',
        version: gridwrightMuiVersion,
        description:
            'The same grid in Material UI clothes: sort, selection and paging controls become TableSortLabel, Checkbox and TablePagination, and colours, type, radius and spacing come from the MUI theme in context, dark mode included.',
        npm: 'https://www.npmjs.com/package/apsw-gridwright-mui',
        github: GITHUB['apsw-gridwright-mui'],
        demos: [
            { id: 'mui-dashboard', label: 'Dashboard' },
            { id: 'mui', label: 'MUI views' },
            { id: 'mui-theme', label: 'Themes' },
            { id: 'mui-mix', label: 'One MUI view' },
            { id: 'mui-tokens', label: 'Tokens' },
        ],
    },
    {
        name: 'apsw-mui-excel-filter',
        version: excelFilterVersion,
        description:
            "Excel-style AutoFilter dropdown for Material UI: type to narrow, untick what you want gone, confirm with OK. Subtractive filtering, an empty array for 'no filter', and a two-term selection flow.",
        npm: 'https://www.npmjs.com/package/apsw-mui-excel-filter',
        github: GITHUB['apsw-mui-excel-filter'],
        demos: [
            { id: 'filters', label: 'Filters + grid' },
            { id: 'excel', label: 'Two-term flow' },
        ],
    },
];

/** Every section on the page, in order, for the sticky navigation. */
export const SECTIONS: { id: string; label: string }[] = [
    { id: 'packages', label: 'Packages' },
    { id: 'filters', label: 'Excel filters' },
    { id: 'features', label: 'Features' },
    { id: 'virtual', label: '100k rows' },
    { id: 'tree', label: 'Tree' },
    { id: 'detail', label: 'Master–detail' },
    { id: 'actions', label: 'Row actions' },
    { id: 'layout', label: 'Layout & URL' },
    { id: 'languages', label: 'Languages & RTL' },
    { id: 'mui-dashboard', label: 'MUI dashboard' },
    { id: 'mui', label: 'MUI views' },
    { id: 'mui-theme', label: 'MUI themes' },
    { id: 'mui-mix', label: 'MUI mix' },
    { id: 'mui-tokens', label: 'MUI tokens' },
    { id: 'excel', label: 'Excel deep dive' },
    { id: 'a11y', label: 'Accessibility' },
    { id: 'remote', label: 'Remote' },
];
