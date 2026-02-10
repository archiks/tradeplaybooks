import React from 'react';
import { MousePointerClick, Hammer, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: MousePointerClick,
            title: "1. Choose Your Plan",
            desc: "Select the package that fits your goals. From starter stores to premium brand builds."
        },
        {
            icon: Hammer,
            title: "2. We Build Everything",
            desc: "Our team sets up the theme, products, payments, and shipping. You relax."
        },
        {
            icon: Rocket,
            title: "3. Launch & Sell",
            desc: "Receive your completed store credentials. Start driving traffic and making sales immediately."
        }
    ];

    return (
        <section className="bg-white py-24 relative border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-navy mb-4">How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Works</span></h2>
                    <p className="text-slate-600">Your path to e-commerce ownership in 3 simple steps.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand-teal/20 via-brand-purple/20 to-brand-teal/20" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-6 relative z-10 shadow-xl">
                                <step.icon className="w-10 h-10 text-brand-teal" />
                                <div className="absolute -bottom-3 px-3 py-1 bg-brand-navy rounded-full text-xs font-bold text-white border border-white/20">
                                    Step {i + 1}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-xs">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
