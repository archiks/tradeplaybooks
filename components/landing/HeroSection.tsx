import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface HeroSectionProps {
    onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-brand-light min-h-[90vh] flex items-center">
            {/* Background Effects */}
            <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-teal/5 via-brand-light to-brand-light pointer-events-none" />
            <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-teal/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                        <span className="text-xs font-bold tracking-wide uppercase text-brand-navy">Done-For-You Service</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-bold tracking-tight text-brand-navy leading-[1.1]"
                    >
                        We Build Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">6-Figure Store</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 max-w-lg leading-relaxed"
                    >
                        Stop guessing. Get a fully optimized, conversion-focused Shopify store built by experts. Ready to sell in days, not months.
                    </motion.p>

                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                    >
                        {['High-Converting Design', 'Mobile Optimized', 'Payment & Shipping Setup'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-brand-navy font-medium">
                                <CheckCircle className="w-5 h-5 text-brand-teal" />
                                {item}
                            </li>
                        ))}
                    </motion.ul>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            onClick={onCtaClick}
                            className="px-8 py-4 bg-brand-navy text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            Choose Your Store <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>

                {/* Right Content - Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group bg-white">
                        <img
                            src="/assets/shopify-hero-light.png"
                            alt="Shopify Store Mockup"
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
