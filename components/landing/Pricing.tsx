import React from 'react';
import { Check } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS } from '../../constants';

interface PricingProps {
    onSelectPlan: (plan: Product) => void;
}

const RECOMMENDED = 'prod_growth';

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-y border-board scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl">
                <h2 className="font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">Pick a print run.</h2>
                <p className="mt-5 text-lg text-ink/70 leading-relaxed">
                    One fixed price per run, paid once. Prices exclude VAT; delivery is confirmed with your proof.
                </p>
            </div>

            <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {PRODUCTS.map(plan => {
                    const hot = plan.id === RECOMMENDED;
                    return (
                        <article
                            key={plan.id}
                            className={`relative flex flex-col border-[1.5px] ${hot ? 'bg-press border-press text-white' : 'bg-paper border-ink text-ink'}`}
                        >
                            <div className="p-7 pb-6">
                                <div className="flex items-baseline justify-between gap-4">
                                    <h3 className="font-wide font-bold text-2xl">{plan.name}</h3>
                                    {hot && <span className="text-sm font-semibold bg-white text-press px-2.5 py-1">Most ordered</span>}
                                </div>
                                <p className={`mt-2 ${hot ? 'text-white/80' : 'text-ink/65'}`}>{plan.tagline}</p>
                                <p className="mt-8 font-wide font-extrabold text-5xl tracking-[-0.02em]">€{plan.price}</p>
                                <p className={`mt-1 text-sm ${hot ? 'text-white/75' : 'text-ink/60'}`}>{plan.quantity}, excl. VAT</p>
                            </div>

                            {/* Perforated tear line, like an order ticket */}
                            <div className="relative" aria-hidden="true">
                                <span className={`absolute -left-[11px] -top-[10px] w-5 h-5 rounded-full border-[1.5px] ${hot ? 'bg-white border-press' : 'bg-white border-ink'} [clip-path:inset(0_0_0_50%)]`} />
                                <span className={`absolute -right-[11px] -top-[10px] w-5 h-5 rounded-full border-[1.5px] ${hot ? 'bg-white border-press' : 'bg-white border-ink'} [clip-path:inset(0_50%_0_0)]`} />
                                <div className={`perforation mx-5 ${hot ? 'text-white/60' : 'text-ink/40'}`} />
                            </div>

                            <div className="p-7 pt-6 flex-1 flex flex-col">
                                <ul className="space-y-3 flex-1">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex gap-3">
                                            <Check className={`w-5 h-5 mt-0.5 shrink-0 ${hot ? 'text-white' : 'text-press'}`} aria-hidden="true" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => onSelectPlan(plan)}
                                    className={`mt-9 h-13 py-4 w-full font-semibold transition-colors ${hot ? 'bg-white text-press hover:bg-ink hover:text-white' : 'bg-ink text-paper hover:bg-press'}`}
                                >
                                    Order the {plan.name}
                                </button>
                            </div>
                        </article>
                    );
                })}
            </div>

            <p className="mt-10 text-ink/70">
                Need more than 750 boxes, a custom shape or a mix of styles?{' '}
                <a href="mailto:info@garsabers.com?subject=Custom%20box%20quote" className="font-semibold text-press underline underline-offset-4">Email us for a quote</a>.
            </p>
        </div>
    </section>
);
