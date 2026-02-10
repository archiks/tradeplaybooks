import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CallToActionProps {
    onCtaClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onCtaClick }) => {
    return (
        <section className="py-24 bg-brand-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/10 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Own Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Dream Store?</span></h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                    Don't waste another month "learning" how to do it. Let us build it for you this week.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCtaClick}
                    className="px-12 py-5 bg-white text-brand-navy font-bold text-lg rounded-full hover:bg-slate-100 transition-colors shadow-2xl inline-flex items-center gap-3"
                >
                    Get Started Now <ArrowRight className="w-6 h-6" />
                </motion.button>
            </div>
        </section>
    );
};
