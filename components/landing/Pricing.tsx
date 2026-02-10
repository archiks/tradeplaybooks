import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Product } from '../../types';

interface PricingProps {
    onSelectPlan: (plan: Product) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
    // Defining plans that match the Product interface
    const plans: Product[] = [
        {
            id: 'starter',
            name: 'Starter Store',
            price: 250,
            level: 1, // Added to satisfy Product interface
            tagline: "Perfect for testing a new product idea.", // Mapped from description
            description: "Perfect for testing a new product idea.",
            features: [
                "Standard Shopify Theme",
                "Up to 5 Products Uploaded",
                "Mobile Responsive",
                "Basic SEO Setup",
                "Payment Gateway Setup",
                "3 Days Delivery"
            ]
        },
        {
            id: 'growth',
            name: 'Growth Store',
            price: 500,
            level: 2,
            tagline: "Designed for scaling an existing brand.",
            description: "Designed for scaling an existing brand.",
            features: [
                "Premium Theme Customization",
                "Up to 20 Products Uploaded",
                "Conversion Optimization",
                "Advanced SEO Structure",
                "Email Marketing Setup",
                "Social Media Integration",
                "5 Days Delivery"
            ]
        },
        {
            id: 'premium',
            name: 'Premium Store',
            price: 1000,
            level: 3,
            tagline: "The complete enterprise-grade solution.",
            description: "The complete enterprise-grade solution.",
            features: [
                "Custom UX/UI Design",
                "Unlimited Products",
                "Custom Functionality",
                "Priority Support (30 Days)",
                "Full Marketing Analytics",
                "Speed Optimization (90+ Score)",
                "7 Days Delivery"
            ]
        }
    ];

    // Helper to identify recommended plan without adding property to Product type
    const isRecommended = (id: string) => id === 'growth';

    return (
        <section className="py-24 bg-white relative" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-navy mb-4">Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Pricing</span></h2>
                    <p className="text-slate-600">One-time investment. No monthly agency fees.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => {
                        const recommended = isRecommended(plan.id);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative bg-white rounded-2xl border flex flex-col ${recommended
                                    ? 'border-brand-teal shadow-2xl scale-105 z-10'
                                    : 'border-slate-200 hover:border-brand-teal/50 hover:shadow-lg transition-all'
                                    }`}
                            >
                                {recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-teal text-white text-xs font-bold uppercase tracking-wide rounded-full shadow-lg flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-white" /> Most Popular
                                    </div>
                                )}

                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-brand-navy mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-500 mb-6 h-10">{plan.tagline}</p>

                                    <div className="flex items-baseline gap-1 mb-8">
                                        <span className="text-4xl font-bold text-brand-navy">€{plan.price}</span>
                                        <span className="text-xs text-slate-500 uppercase">/ One-Time</span>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((feat, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                                                <Check className={`w-4 h-4 mt-1 shrink-0 ${recommended ? 'text-brand-teal' : 'text-brand-purple'}`} />
                                                <span className="leading-tight">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => onSelectPlan(plan)}
                                        className={`w-full py-4 font-bold rounded-xl text-sm transition-all shadow-lg ${recommended
                                            ? 'bg-brand-navy text-white hover:opacity-90 shadow-xl'
                                            : 'bg-slate-100 text-brand-navy hover:bg-slate-200'
                                            }`}
                                    >
                                        Choose {plan.name}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
