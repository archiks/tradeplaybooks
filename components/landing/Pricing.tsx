import React from 'react';
import { Check } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS, CUSTOM_PLAN } from '../../constants';

interface PricingProps {
    onSelectPlan: (plan: Product) => void;
}

const RECOMMENDED = 'prod_growth';
const PLANS: Product[] = [...PRODUCTS, CUSTOM_PLAN];

type Tone = 'plain' | 'hot' | 'dark';

const TONES: Record<Tone, { card: string; muted: string; soft: string; notch: string; perf: string; check: string; button: string }> = {
    plain: {
        card: 'bg-paper border-ink text-ink',
        muted: 'text-ink/65', soft: 'text-ink/60',
        notch: 'bg-white border-ink', perf: 'text-ink/40', check: 'text-press',
        button: 'bg-ink text-paper hover:bg-press',
    },
    hot: {
        card: 'bg-press border-press text-white',
        muted: 'text-white/80', soft: 'text-white/75',
        notch: 'bg-white border-press', perf: 'text-white/60', check: 'text-white',
        button: 'bg-white text-press hover:bg-ink hover:text-white',
    },
    dark: {
        card: 'bg-ink border-ink text-paper',
        muted: 'text-paper/70', soft: 'text-paper/60',
        notch: 'bg-white border-ink', perf: 'text-paper/40', check: 'text-[#8C95FF]',
        button: 'bg-paper text-ink hover:bg-press hover:text-white',
    },
};

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-y border-board scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
                <h2 className="font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">Pick a print run.</h2>
                <p className="mt-5 text-lg text-ink/70 leading-relaxed">
                    One fixed price per run, paid once, or a custom order paid on an invoice we issue for you.
                    Prices exclude VAT; delivery is confirmed with your proof.
                </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                {PLANS.map(plan => {
                    const isCustom = plan.id === CUSTOM_PLAN.id;
                    const tone: Tone = isCustom ? 'dark' : plan.id === RECOMMENDED ? 'hot' : 'plain';
                    const t = TONES[tone];
                    return (
                        <article key={plan.id} className={`relative flex flex-col border-[1.5px] ${t.card}`}>
                            <div className="p-6 pb-6">
                                {tone === 'hot' && (
                                    <span className="absolute -top-3.5 left-6 text-sm font-semibold bg-white text-press border-[1.5px] border-press px-2.5 py-0.5">Most ordered</span>
                                )}
                                <h3 className="font-wide font-bold text-2xl">{plan.name}</h3>
                                <p className={`mt-2 min-h-[3rem] ${t.muted}`}>{plan.tagline}</p>
                                <p className="mt-6 font-wide font-extrabold text-5xl tracking-[-0.02em]">
                                    {isCustom ? 'Quote' : `€${plan.price}`}
                                </p>
                                <p className={`mt-1 text-sm min-h-[2.5rem] ${t.soft}`}>
                                    {isCustom ? 'Priced on your custom invoice' : `${plan.quantity}, excl. VAT`}
                                </p>
                            </div>

                            {/* Perforated tear line, like an order ticket */}
                            <div className="relative" aria-hidden="true">
                                <span className={`absolute -left-[11px] -top-[10px] w-5 h-5 rounded-full border-[1.5px] ${t.notch} [clip-path:inset(0_0_0_50%)]`} />
                                <span className={`absolute -right-[11px] -top-[10px] w-5 h-5 rounded-full border-[1.5px] ${t.notch} [clip-path:inset(0_50%_0_0)]`} />
                                <div className={`perforation mx-5 ${t.perf}`} />
                            </div>

                            <div className="p-6 pt-6 flex-1 flex flex-col">
                                <ul className="space-y-3 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex gap-3">
                                            <Check className={`w-5 h-5 mt-0.5 shrink-0 ${t.check}`} aria-hidden="true" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => onSelectPlan(plan)}
                                    className={`mt-9 py-4 w-full font-semibold transition-colors ${t.button}`}
                                >
                                    {isCustom ? 'Request a custom invoice' : `Order the ${plan.name}`}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
