import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    onCtaClick: () => void;
}

const FACTS = [
    { big: '100', small: 'boxes minimum order' },
    { big: '24 h', small: 'to your free proof' },
    { big: '7–10', small: 'working days to print' },
];

const TICKER = ['Mailer boxes', 'Shipping cartons', 'Rigid gift boxes', 'Full-colour print', 'Inside print', 'Hot foil', 'Embossing', 'Soft-touch finish', 'Custom sizes'];

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
    const reduce = useReducedMotion();
    const rise = (delay: number) => ({
        initial: reduce ? false : { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
    });

    return (
        <section id="top" className="relative bg-forest text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] overflow-hidden">
            {/* soft glow */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[40rem] rounded-full bg-lime/15 blur-[120px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 text-center">
                <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm font-medium text-white/90">
                    <Sparkles className="w-4 h-4 text-lime" aria-hidden="true" />
                    Custom printed packaging, from 100 boxes
                </motion.p>

                <motion.h1 {...rise(0.08)} className="h-display mt-7 text-[2.9rem] sm:text-7xl lg:text-[6.25rem] max-w-5xl mx-auto">
                    Boxes that look like your brand.
                </motion.h1>

                <motion.p {...rise(0.16)} className="mt-7 text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
                    We print your logo on mailer boxes, shipping cartons and rigid gift boxes.
                    You approve a free proof before anything goes to press.
                </motion.p>

                <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
                    <button onClick={onCtaClick} className="btn-lime h-14 px-8 text-[17px]">
                        See pricing <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <a href="#boxes" className="btn-ghost h-14 px-8 text-[17px]">Explore box styles</a>
                </motion.div>
            </div>

            <motion.div {...rise(0.34)} className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-16">
                <div className="relative rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden ring-1 ring-white/10">
                    <img
                        src="/assets/boxes/hero.jpg"
                        alt="Custom printed boxes in different brand colours: lime, white, kraft, black and pink"
                        className="block w-full aspect-[4/3] sm:aspect-[16/9] object-cover"
                        fetchPriority="high"
                    />
                </div>
                <dl className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-4">
                    {FACTS.map(f => (
                        <div key={f.small} className="rounded-2xl sm:rounded-3xl bg-white/[0.08] border border-white/15 px-3 py-3 sm:px-7 sm:py-5 text-left">
                            <dt className="font-display font-bold text-xl sm:text-4xl tracking-[-0.03em]">{f.big}</dt>
                            <dd className="text-xs sm:text-base text-white/70 leading-snug">{f.small}</dd>
                        </div>
                    ))}
                </dl>
            </motion.div>

            {/* What we print, as a slow ticker */}
            <div className="relative mt-12 sm:mt-14 pb-10 sm:pb-12 overflow-hidden" aria-hidden="true">
                <div className="flex w-max animate-marquee">
                    {[0, 1].map(i => (
                        <ul key={i} className="flex shrink-0 items-center">
                            {TICKER.map(t => (
                                <li key={t} className="flex items-center font-display font-semibold text-2xl sm:text-3xl text-white/35 whitespace-nowrap">
                                    <span className="px-6 sm:px-8">{t}</span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-lime/70" />
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
};
