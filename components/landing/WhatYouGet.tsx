import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Smartphone, CreditCard, Layout, Box } from 'lucide-react';

export const WhatYouGet: React.FC = () => {
    const features = [
        { icon: Layout, title: "Premium Theme Setup", desc: "A professional, high-converting design tailored to your niche." },
        { icon: Box, title: "Product Uploads", desc: "We add your initial products with optimized titles and descriptions." },
        { icon: Smartphone, title: "Mobile Optimization", desc: "100% responsive design that looks perfect on every device." },
        { icon: CreditCard, title: "Payment Gateways", desc: "Stripe, PayPal, and other payment processors fully configured." },
        { icon: Zap, title: "Speed Optimization", desc: "Fast loading times to ensure customers don't bounce." },
        { icon: Check, title: "Legal Pages", desc: "Privacy Policy, Terms of Service, and Refund Policy included." }
    ];

    return (
        <section className="py-24 bg-brand-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-bold text-brand-navy mb-6">Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Scale</span></h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                            We don't just build a website; we build a business asset. Every store includes the essential features required to run a successful e-commerce brand.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                                        <feature.icon className="w-5 h-5 text-brand-teal" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-navy text-sm">{feature.title}</h4>
                                        <p className="text-xs text-slate-500 mt-1">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-teal/20 blur-[100px] rounded-full pointer-events-none" />
                        <img
                            src="/assets/shopify-features.png"
                            alt="Shopify Features Preview"
                            className="relative z-10 w-full rounded-2xl shadow-2xl border border-slate-200"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
