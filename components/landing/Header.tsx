import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const LINKS = [
    { href: '#boxes', label: 'Boxes' },
    { href: '#finishes', label: 'Finishes' },
    { href: '#process', label: 'Process' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQ' },
];

export const Logo: React.FC<{ light?: boolean }> = ({ light }) => (
    <span className={`inline-flex items-center gap-2.5 ${light ? 'text-white' : 'text-ink'}`}>
        {/* Mark: an open box, lid lifted */}
        <span className="grid place-items-center w-8 h-8 rounded-[10px] bg-lime">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M2.5 7.5h13v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7Z" fill="#0C1A14" />
                <path d="M1.5 4.2 9 2l7.5 2.2" stroke="#0C1A14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="6.5" y="10" width="5" height="2" rx="1" fill="#D4F26A" />
            </svg>
        </span>
        <span className="font-display font-bold text-[1.3rem] tracking-[-0.03em]">garsabers</span>
    </span>
);

export const Header: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const solid = scrolled || open;

    return (
        <header className="fixed top-3 sm:top-4 inset-x-0 z-40 px-3 sm:px-6">
            <div
                className={`max-w-6xl mx-auto rounded-[1.75rem] transition-all duration-300 ${solid
                    ? 'bg-white/85 backdrop-blur-xl shadow-soft border border-white/60 text-ink'
                    : 'bg-white/10 backdrop-blur-md border border-white/15 text-white'}`}
            >
                <div className="h-14 sm:h-16 pl-4 pr-2 sm:pl-6 sm:pr-3 flex items-center justify-between gap-6">
                    <a href="#top" aria-label="Garsabers home"><Logo light={!solid} /></a>

                    <nav className="hidden md:flex items-center gap-1 text-[15px] font-medium" aria-label="Main">
                        {LINKS.map(l => (
                            <a
                                key={l.href}
                                href={l.href}
                                className={`px-3.5 py-2 rounded-full transition-colors ${solid ? 'text-ink/70 hover:text-ink hover:bg-sage' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={onCtaClick}
                            className={`hidden sm:inline-flex h-11 px-5 text-[15px] ${solid ? 'btn-dark' : 'btn-lime'}`}
                        >
                            Get your boxes <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                            className="md:hidden h-11 w-11 inline-flex items-center justify-center rounded-full"
                            onClick={() => setOpen(o => !o)}
                            aria-expanded={open}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                        >
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {open && (
                    <nav className="md:hidden px-4 pb-4" aria-label="Mobile">
                        {LINKS.map(l => (
                            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-3 text-lg font-medium rounded-2xl hover:bg-sage">
                                {l.label}
                            </a>
                        ))}
                        <button onClick={() => { setOpen(false); onCtaClick(); }} className="btn-dark mt-3 w-full h-12">
                            Get your boxes
                        </button>
                    </nav>
                )}
            </div>
        </header>
    );
};
