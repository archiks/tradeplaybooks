import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Palette, MonitorSmartphone } from 'lucide-react';

export const HighEndWebsites: React.FC = () => {
    const features = [
        { icon: Palette, title: "Bespoke Design", desc: "Custom-crafted visual identities that elevate your brand and captivate your audience." },
        { icon: Layers, title: "Modern Tech Stack", desc: "Built with React, Next.js, and Tailwind CSS for blazing fast performance." },
        { icon: MonitorSmartphone, title: "Flawless Responsiveness", desc: "Pixel-perfect layouts across mobile, tablet, and desktop devices." },
        { icon: Code, title: "Clean Architecture", desc: "Scalable, maintainable code optimized for SEO and accessibility." }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-navy/5 skew-y-3 origin-top-left -z-10" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-brand-navy mb-6 tracking-tight"
                    >
                        High-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Website Building</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Beyond Shopify, we engineer premium standard websites tailored to your unique requirements. We don't use templates—we build digital experiences from the ground up.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-brand-navy/5 hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-purple/10 flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-brand-teal" />
                            </div>
                            <h3 className="font-bold text-brand-navy text-xl mb-3">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
