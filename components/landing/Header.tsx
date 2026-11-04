import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
    { href: '#boxes', label: 'Box styles' },
    { href: '#finishes', label: 'Finishes' },
    { href: '#process', label: 'How it works' },
    { href: '#pricing', label: 'Prices' },
    { href: '#faq', label: 'FAQ' },
];

export const Logo: React.FC<{ light?: boolean }> = ({ light }) => (
    <span className={`inline-flex items-center gap-2.5 ${light ? 'text-paper' : 'text-ink'}`}>
        {/* Mark: a box seen from above, with the lid fold in spot blue */}
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <rect x="1.5" y="1.5" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M1.5 9.5h23" stroke="#2433FF" strokeWidth="2.5" strokeDasharray="3 2.5" />
            <rect x="8" y="14" width="10" height="5" fill="#2433FF" />
        </svg>
        <span className="font-wide font-extrabold text-[1.2rem] tracking-[-0.01em]">Garsabers</span>
    </span>
);

export const Header: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`fixed top-0 inset-x-0 z-40 transition-colors ${scrolled || open ? 'bg-paper/95 backdrop-blur border-b border-board' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
                <a href="#top" aria-label="Garsabers home"><Logo /></a>

                <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium" aria-label="Main">
                    {LINKS.map(l => (
                        <a key={l.href} href={l.href} className="text-ink/75 hover:text-press transition-colors">{l.label}</a>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onCtaClick}
                        className="hidden sm:inline-flex h-10 items-center px-5 bg-ink text-paper text-sm font-semibold hover:bg-press transition-colors"
                    >
                        Order boxes
                    </button>
                    <button
                        className="md:hidden h-10 w-10 inline-flex items-center justify-center text-ink"
                        onClick={() => setOpen(o => !o)}
                        aria-expanded={open}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                    >
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="md:hidden border-t border-board px-4 pb-6 pt-2" aria-label="Mobile">
                    {LINKS.map(l => (
                        <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium border-b border-board">
                            {l.label}
                        </a>
                    ))}
                    <button onClick={() => { setOpen(false); onCtaClick(); }} className="mt-5 w-full h-12 bg-press text-white font-semibold">
                        Order boxes
                    </button>
                </nav>
            )}
        </header>
    );
};
