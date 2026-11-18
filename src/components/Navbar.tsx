'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';

const NAV_ITEMS = [
    { href: '/services', label: 'Services' },
    { href: '/markets', label: 'Markets' },
    { href: '/process', label: 'Process' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/insights', label: 'Insights' },
    { href: '/estimate', label: 'Get Estimate' },
    { href: '/website-audit', label: 'Free Audit' },
];

export default function Navbar() {
    const pathname = usePathname();
    // The menu is "open" only for the path it was opened on, so it closes by
    // itself on route change without an effect that sets state.
    const [openOnPath, setOpenOnPath] = useState<string | null>(null);
    const isOpen = openOnPath === pathname;
    const setIsOpen = (next: boolean | ((prev: boolean) => boolean)) => {
        const value = typeof next === 'function' ? next(isOpen) : next;
        setOpenOnPath(value ? pathname : null);
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <nav className="public-nav">
                <div className="nav-logo">
                    <Link href="/" onClick={() => setIsOpen(false)}>
                        <Logo scale={0.4} />
                    </Link>
                </div>
                <ul className="nav-links">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
                    ))}
                </ul>
                <Link href="/contact" className="nav-cta"><span>↗ Start Project</span></Link>

                <button
                    type="button"
                    className={`nav-burger ${isOpen ? 'active' : ''}`}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav-menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span />
                    <span />
                    <span />
                </button>
            </nav>

            {/* Rendered as a sibling of <nav>, not nested inside it — a
                position:fixed element nested inside another position:fixed
                element with no explicit height resolves its own height
                against that ancestor's auto content-height instead of the
                viewport in some browsers, collapsing this to the navbar's
                own height. */}
            <div id="mobile-nav-menu" className={`mobile-nav ${isOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={() => setIsOpen(false)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <Link href="/contact" className="mobile-nav-cta" onClick={() => setIsOpen(false)}>
                    ↗ Start Project
                </Link>
            </div>
        </>
    );
}
