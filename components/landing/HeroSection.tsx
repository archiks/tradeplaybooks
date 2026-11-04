import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroSectionProps {
    onCtaClick: () => void;
}

/** Corner crop mark, like the ones on a press sheet */
const Crop: React.FC<{ className: string }> = ({ className }) => (
    <span aria-hidden="true" className={`absolute w-5 h-5 ${className}`}>
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink/60" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-ink/60" />
    </span>
);

const Flap: React.FC<{ className?: string; children: React.ReactNode; from: { x?: number; y?: number }; delay: number }> = ({ className = '', children, from, delay }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            initial={reduce ? false : { opacity: 0, ...from }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
            className={`bg-white border-[1.5px] border-ink p-4 sm:p-5 flex flex-col justify-end text-sm leading-snug ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
    return (
        <section id="top" className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 bg-paper overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
                <div className="lg:col-span-5">
                    <h1 className="font-wide font-extrabold text-[2.6rem] sm:text-6xl xl:text-[4.6rem] leading-[0.98] tracking-[-0.025em] text-ink">
                        Your logo on every box you ship.
                    </h1>
                    <p className="mt-7 text-lg text-ink/75 max-w-[34rem] leading-relaxed">
                        Mailer boxes, shipping cartons and rigid gift boxes printed with your artwork, from 100 units.
                        You approve a free proof before anything goes to press.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                        <button
                            onClick={onCtaClick}
                            className="h-14 px-8 bg-press text-white font-semibold text-[17px] hover:bg-ink transition-colors"
                        >
                            See print run prices
                        </button>
                        <a href="#boxes" className="font-semibold underline decoration-2 underline-offset-[6px] decoration-press hover:text-press">
                            Browse box styles
                        </a>
                    </div>
                    <p className="mt-8 text-sm text-ink/60">Pay by card, or request a PayPal invoice for company orders.</p>
                </div>

                {/* The memorable bit: the hero photo sits on an unfolded box die-line */}
                <div className="lg:col-span-7 relative p-4 sm:p-6">
                    <Crop className="-top-0 -left-0" />
                    <Crop className="-top-0 -right-0" />
                    <Crop className="-bottom-0 -left-0" />
                    <Crop className="-bottom-0 -right-0" />

                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_2.7fr_1fr]">
                        <Flap from={{ y: 40 }} delay={0.15} className="sm:col-start-2 sm:row-start-1 border-b-0 rounded-t-[2.25rem] min-h-[88px]">
                            <span className="text-ink/60">Lid</span>
                            <span className="font-semibold">Printed outside, and inside on Brand and Signature runs</span>
                        </Flap>

                        <Flap from={{ x: 40 }} delay={0.3} className="hidden sm:flex sm:col-start-1 sm:row-start-2 border-r-0 rounded-l-2xl my-6">
                            <span className="font-wide font-extrabold text-3xl text-press">100</span>
                            <span>boxes minimum</span>
                        </Flap>

                        <div className="relative sm:col-start-2 sm:row-start-2 border-[1.5px] border-ink bg-white">
                            <div className="absolute inset-0 border-2 fold pointer-events-none z-10" aria-hidden="true" />
                            <img
                                src="/assets/boxes/hero.jpg"
                                alt="Stack of white and kraft mailer boxes printed with a blue logo, one open with a printed interior"
                                className="block w-full aspect-[16/11] object-cover"
                                fetchPriority="high"
                            />
                        </div>

                        <Flap from={{ x: -40 }} delay={0.3} className="hidden sm:flex sm:col-start-3 sm:row-start-2 border-l-0 rounded-r-2xl my-6">
                            <span className="font-wide font-extrabold text-3xl text-press">24 h</span>
                            <span>to your digital proof</span>
                        </Flap>

                        <Flap from={{ y: -40 }} delay={0.45} className="sm:col-start-2 sm:row-start-3 border-t-0 min-h-[80px] flex-row items-end justify-between gap-4">
                            <span><span className="text-ink/60 block">Base</span><span className="font-semibold">Ships in 7–10 working days</span></span>
                            <span className="hidden sm:block text-right text-ink/60">Fold lines in blue,<br />cut lines in black</span>
                        </Flap>
                    </div>
                </div>
            </div>
        </section>
    );
};
