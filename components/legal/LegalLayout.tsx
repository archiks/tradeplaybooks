import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../landing/Header';

export const COMPANY = {
    name: 'GARSABER TECH LTD',
    number: '17151348',
    registeredIn: 'England and Wales',
    address: 'Unit A, 82 James Carter Road, Mildenhall, Suffolk, IP28 7DE, United Kingdom',
    email: 'info@garsabers.com',
};

interface LegalLayoutProps {
    title: string;
    updated: string;
    intro: React.ReactNode;
    onBack: () => void;
    children: React.ReactNode;
}

/** Shared page shell for the legal pages, in the site's print-shop style */
export const LegalLayout: React.FC<LegalLayoutProps> = ({ title, updated, intro, onBack, children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${title} | Garsabers`;
        return () => { document.title = 'Garsabers | Custom logo-printed boxes'; };
    }, [title]);

    return (
        <div className="min-h-screen bg-paper text-ink">
            <header className="border-b border-mist bg-white/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} aria-label="Garsabers home"><Logo /></a>
                    <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold rounded-full bg-sage px-4 py-2 hover:bg-ink hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to the site
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
                <h1 className="h-display text-5xl sm:text-6xl">{title}</h1>
                <p className="mt-4 text-sm text-ink/60">Last updated {updated}</p>
                <div className="mt-8 text-lg leading-relaxed text-ink/80">{intro}</div>

                <div className="legal mt-12 border-t border-mist">{children}</div>

                <section className="mt-16 p-7 bg-white rounded-3xl border border-mist shadow-soft text-sm leading-relaxed text-ink/75">
                    <p className="font-semibold text-ink">{COMPANY.name}</p>
                    <p>Registered in {COMPANY.registeredIn}, company number {COMPANY.number}</p>
                    <p>Registered office: {COMPANY.address}</p>
                    <p>Email: <a href={`mailto:${COMPANY.email}`} className="text-press font-semibold">{COMPANY.email}</a></p>
                </section>
            </main>
        </div>
    );
};

/** One numbered clause */
export const Clause: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
    <section className="py-8 border-b border-mist" id={`section-${n}`}>
        <h2 className="font-display font-bold text-xl sm:text-2xl flex gap-3">
            <span className="text-press">{n}.</span>{title}
        </h2>
        <div className="mt-4 space-y-4 text-ink/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-press [&_a]:font-semibold [&_strong]:text-ink">
            {children}
        </div>
    </section>
);
