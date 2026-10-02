/**
 * ~300 deterministic people rows. A seeded PRNG (mulberry32) means the same rows on every build
 * and every reload, so the demos are reproducible.
 */

export interface Person {
    id: number;
    name: string;
    email: string;
    department: string;
    city: string;
    status: string;
    role: string;
    salary: number;
    rating: number;
    startDate: string;
}

export interface Option {
    value: string;
    label: string;
}

export const DEPARTMENTS: Record<string, string> = {
    eng: 'Engineering',
    ops: 'Operations',
    sales: 'Sales',
    hr: 'People & HR',
    finance: 'Finance',
    design: 'Design',
};

export const CITIES: Record<string, string> = {
    warsaw: 'Warsaw',
    krakow: 'Kraków',
    berlin: 'Berlin',
    london: 'London',
    lisbon: 'Lisbon',
    dublin: 'Dublin',
    amsterdam: 'Amsterdam',
};

export const STATUSES: Record<string, string> = {
    active: 'Active',
    leave: 'On leave',
    contract: 'Contractor',
    alumni: 'Alumni',
};

export const ROLES: Record<string, string[]> = {
    eng: ['Software Engineer', 'Senior Engineer', 'Staff Engineer', 'Engineering Manager', 'SRE'],
    ops: ['Operations Analyst', 'Supply Planner', 'Logistics Lead', 'Facilities Manager'],
    sales: ['Account Executive', 'Sales Engineer', 'Regional Sales Lead', 'SDR'],
    hr: ['HR Business Partner', 'Recruiter', 'People Operations Specialist'],
    finance: ['Financial Analyst', 'Controller', 'Payroll Specialist', 'FP&A Manager'],
    design: ['Product Designer', 'UX Researcher', 'Design Lead', 'Brand Designer'],
};

const FIRST_NAMES = [
    'Anna', 'Piotr', 'Maria', 'Jan', 'Katarzyna', 'Tomasz', 'Agnieszka', 'Michał', 'Zofia', 'Jakub',
    'Elena', 'Lucas', 'Sophie', 'Noah', 'Emma', 'Liam', 'Olivia', 'Hugo', 'Clara', 'Mateo',
    'Aoife', 'Cian', 'Inês', 'Tiago', 'Lotte', 'Daan', 'Freya', 'Jonas', 'Lea', 'Finn',
];

const LAST_NAMES = [
    'Kowalski', 'Nowak', 'Wiśniewska', 'Wójcik', 'Kamiński', 'Lewandowska', 'Zieliński', 'Szymańska',
    'Müller', 'Schmidt', 'Fischer', 'Weber', 'Smith', 'Taylor', 'Brown', 'Wilson', 'Silva', 'Santos',
    'Ferreira', 'Costa', 'Murphy', 'Kelly', 'Byrne', 'Walsh', 'de Jong', 'Bakker', 'Visser', 'Jansen',
];

/** mulberry32: small, fast, and deterministic for a given seed. */
export function seeded(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function pick<T>(random: () => number, items: readonly T[]): T {
    return items[Math.floor(random() * items.length)]!;
}

function slug(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-zA-Z]/g, '')
        .toLowerCase();
}

export function generatePeople(count = 300, seed = 20260925): Person[] {
    const random = seeded(seed);
    const departmentIds = Object.keys(DEPARTMENTS);
    const cityIds = Object.keys(CITIES);
    // Weighted: most people are active.
    const statusPool = ['active', 'active', 'active', 'active', 'leave', 'contract', 'alumni'];
    const people: Person[] = [];
    const seen = new Set<string>();

    for (let i = 1; i <= count; i += 1) {
        const first = pick(random, FIRST_NAMES);
        const last = pick(random, LAST_NAMES);
        const department = pick(random, departmentIds);
        let email = `${slug(first)}.${slug(last)}@example.com`;
        if (seen.has(email)) email = `${slug(first)}.${slug(last)}${i}@example.com`;
        seen.add(email);

        const year = 2015 + Math.floor(random() * 11);
        const month = 1 + Math.floor(random() * 12);
        const day = 1 + Math.floor(random() * 28);

        people.push({
            id: i,
            name: `${first} ${last}`,
            email,
            department,
            city: pick(random, cityIds),
            status: pick(random, statusPool),
            role: pick(random, ROLES[department]!),
            salary: 42_000 + Math.floor(random() * 120) * 1_000,
            rating: Math.round((3 + random() * 2) * 10) / 10,
            startDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        });
    }
    return people;
}

export const PEOPLE: Person[] = generatePeople();

export function optionsOf(titles: Record<string, string>): Option[] {
    return Object.entries(titles)
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label));
}

/** Every role across departments, as dropdown options, for the Excel filter walkthrough. */
export const ROLE_OPTIONS: Option[] = Object.values(ROLES)
    .flat()
    .map((role) => ({ value: role, label: role }))
    .sort((a, b) => a.label.localeCompare(b.label));

/* Orders, for the master-detail panel ------------------------------------------------------- */

export interface Order {
    id: string;
    placed: string;
    item: string;
    quantity: number;
    total: number;
    state: string;
}

const ITEMS = ['Laptop', 'Monitor', 'Docking station', 'Headset', 'Standing desk', 'Ergonomic chair', 'Keyboard', 'Webcam'];
const ORDER_STATES = ['Delivered', 'Delivered', 'Shipped', 'Approved', 'Pending'];

/** Between two and six orders per person, the same ones every time for a given person. */
export function ordersOf(person: Person): Order[] {
    const random = seeded(person.id * 7919);
    const count = 2 + Math.floor(random() * 5);
    const orders: Order[] = [];
    for (let i = 1; i <= count; i += 1) {
        const item = pick(random, ITEMS);
        const quantity = 1 + Math.floor(random() * 3);
        const unit = 60 + Math.floor(random() * 30) * 40;
        const year = 2022 + Math.floor(random() * 4);
        const month = 1 + Math.floor(random() * 12);
        const day = 1 + Math.floor(random() * 28);
        orders.push({
            id: `PO-${person.id}-${i}`,
            placed: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            item,
            quantity,
            total: quantity * unit,
            state: pick(random, ORDER_STATES),
        });
    }
    return orders.sort((a, b) => b.placed.localeCompare(a.placed));
}

/* An organisation chart, for the tree demo -------------------------------------------------- */

export interface OrgNode {
    id: string;
    name: string;
    kind: 'department' | 'team' | 'person';
    role: string;
    city: string;
    headcount: number;
    children?: OrgNode[];
}

const TEAM_NAMES: Record<string, string[]> = {
    eng: ['Platform', 'Payments', 'Mobile'],
    ops: ['Logistics', 'Facilities'],
    sales: ['EMEA', 'DACH', 'Nordics'],
    hr: ['Talent', 'People Ops'],
    finance: ['FP&A', 'Payroll'],
    design: ['Product Design', 'Brand'],
};

/** Departments, teams and people: about sixty nodes, nested on `children`. */
export function generateOrg(seed = 4242): OrgNode[] {
    const random = seeded(seed);
    const cityIds = Object.keys(CITIES);
    const people = new Set<string>();
    const person = (role: string): OrgNode => {
        let name = `${pick(random, FIRST_NAMES)} ${pick(random, LAST_NAMES)}`;
        while (people.has(name)) name = `${pick(random, FIRST_NAMES)} ${pick(random, LAST_NAMES)}`;
        people.add(name);
        return { id: slug(name) + people.size, name, kind: 'person', role, city: CITIES[pick(random, cityIds)]!, headcount: 1 };
    };
    return Object.entries(DEPARTMENTS).map(([departmentId, departmentName]) => {
        const teams: OrgNode[] = TEAM_NAMES[departmentId]!.map((teamName) => {
            const lead = person(`${teamName} lead`);
            const members = Array.from({ length: 1 + Math.floor(random() * 3) }, () => person(pick(random, ROLES[departmentId]!)));
            const children = [lead, ...members];
            return {
                id: `${departmentId}-${slug(teamName)}`,
                name: teamName,
                kind: 'team',
                role: 'Team',
                city: lead.city,
                headcount: children.length,
                children,
            };
        });
        const head = person(`Head of ${departmentName}`);
        const children = [head, ...teams];
        return {
            id: departmentId,
            name: departmentName,
            kind: 'department',
            role: 'Department',
            city: head.city,
            headcount: children.reduce((sum, node) => sum + node.headcount, 0),
            children,
        };
    });
}

/** How many nodes a nested list holds, itself included. */
export function countNodes(nodes: readonly OrgNode[]): number {
    return nodes.reduce((sum, node) => sum + 1 + countNodes(node.children ?? []), 0);
}
