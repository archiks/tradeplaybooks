import React from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
    const faqs = [
        {
            q: "How long does it take to get my store?",
            a: "Depending on the plan you choose, delivery takes between 3 to 7 days. We start working immediately after your order."
        },
        {
            q: "Do I have to know how to code?",
            a: "Not at all. We handle all the technical setup. Once we hand it over, you can easily manage orders and products through the simple Shopify dashboard."
        },
        {
            q: "Do I own the store 100%?",
            a: "Yes. Once transferred, you are the legal owner of the store, domain, and all data. We just build it for you."
        },
        {
            q: "What if I need help after delivery?",
            a: "Our Premium plan includes 30 days of priority support. For other plans, we ensure everything is working perfectly upon handover and provide a guide on how to use your new store."
        },
        {
            q: "Are there any monthly fees?",
            a: "Our service is a one-time fee. However, you will need to pay Shopify's monthly subscription (usually ~$29/mo) to keep the platform active."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-brand-navy mb-12 text-center">Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-purple">Asked Questions</span></h2>
                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200 open:border-brand-teal/50 transition-colors">
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-brand-navy hover:text-brand-teal transition-colors">
                                {item.q}
                                <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                            </summary>
                            <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
