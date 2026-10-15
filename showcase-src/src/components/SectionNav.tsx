import { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { SECTIONS } from '../packages';

/** A sticky row of in-page links. The current section is the last one whose heading scrolled past the bar. */
export function SectionNav() {
    const [current, setCurrent] = useState<string>(SECTIONS[0]!.id);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            let active = SECTIONS[0]!.id;
            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element && element.getBoundingClientRect().top <= 96) active = section.id;
            }
            setCurrent(active);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return (
        <nav className="sc-nav" aria-label="Sections">
            <div className="sc-nav__inner">
                {SECTIONS.map((section) => (
                    <Chip
                        key={section.id}
                        component="a"
                        href={`#${section.id}`}
                        clickable
                        size="small"
                        color={current === section.id ? 'primary' : 'default'}
                        variant={current === section.id ? 'filled' : 'outlined'}
                        label={section.label}
                        aria-current={current === section.id ? 'true' : undefined}
                    />
                ))}
            </div>
        </nav>
    );
}
