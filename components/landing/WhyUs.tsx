import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, XCircle, Code2 } from 'lucide-react';

export const WhyUs: React.FC = () => {
    return (
        <section className="py-24 bg-brand-light border-y border-slate-200">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-brand-navy mb-6">This is <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">NOT</span> a Course.</h2>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                        Most "gurus" sell you a PDF and leave you to figure it out. We don't do that. We are a development agency that builds the asset for you.
                    </p>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        You walk away with a fully functional, professional business—not just "knowledge."
                    </p>

                    <div className="space-y-4">
                        {[
                            { icon: XCircle, text: "No DIY website builders or templates you have to edit.", color: "text-red-500" },
                            { icon: XCircle, text: "No guessing which apps to install.", color: "text-red-500" },
                            { icon: ShieldCheck, text: "100% Done-For-You Execution.", color: "text-brand-teal" },
                            { icon: Code2, text: "Custom code and optimizations included.", color: "text-brand-purple" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                                <span className="text-brand-navy font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-brand-teal/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="relative bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
                        <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                            <div>
                                <h4 className="text-brand-navy font-bold text-lg">Traditional Way</h4>
                                <span className="text-slate-500 text-sm">Do it yourself</span>
                            </div>
                            <div className="text-right">
                                <h4 className="text-brand-teal font-bold text-lg">Our Way</h4>
                                <span className="text-slate-500 text-sm">Done for you</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                { label: "Time to Launch", bad: "4-6 Weeks", good: "3-7 Days" },
                                { label: "Design Quality", bad: "Generic Template", good: "Premium Brand" },
                                { label: "Tech Skills Needed", bad: "High", good: "None" },
                                { label: "Conversion Rate", bad: "Average (<1%)", good: "Optimized (2-3%+)" }
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <span className="text-red-400/50 line-through text-sm">{row.bad}</span>
                                    <span className="text-slate-500 font-medium text-sm">{row.label}</span>
                                    <span className="text-brand-teal font-bold">{row.good}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
