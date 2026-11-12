import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { PRODUCTS, CUSTOM_PLAN } from '../../constants';
import { SectionHead } from './SectionHead';

interface PricingProps {
    onSelectPlan: (plan: Product) => void;
}

const RECOMMENDED = 'prod_growth';
const PLANS: Product[] = [...PRODUCTS, CUSTOM_PLAN];

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => (
    <section id="pricing" className="py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead title="Simple pricing per print run.">
                One fixed price, paid once, or a custom quote for bigger and special orders. Prices exclude VAT; delivery is confirmed with your proof.
            </SectionHead>

            <div className="mt-12 grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
                {PLANS.map(plan => {
                    const isCustom = plan.id === CUSTOM_PLAN.id;
                    const hot = plan.id === RECOMMENDED;
                    return (
                        <article
                            key={plan.id}
                            className={`relative flex flex-col rounded-[2rem] p-7 transition-transform duration-300 hover:-translate-y-1 ${hot
                                ? 'bg-forest text-white shadow-lift'
                                : isCustom
                                    ? 'bg-lime text-ink'
                                    : 'bg-white text-ink border border-mist shadow-soft'}`}
                        >
                            <div className="flex items-center justify-between gap-3 min-h-[1.75rem]">
                                <h3 className="font-display font-bold text-2xl tracking-[-0.03em]">{plan.name}</h3>
                                {hot && <span className="rounded-full bg-lime text-ink text-xs font-semibold px-3 py-1">Most ordered</span>}
                            </div>
                            <p className={`mt-2 min-h-[3rem] ${hot ? 'text-white/70' : 'text-ink/65'}`}>{plan.tagline}</p>

                            <p className="mt-6 font-display font-bold text-6xl tracking-[-0.045em] leading-none">
                                {isCustom ? 'Quote' : <><span className="text-3xl align-top mr-0.5">€</span>{plan.price}</>}
                            </p>
                            <p className={`mt-2 text-sm min-h-[2.5rem] ${hot ? 'text-white/65' : 'text-ink/60'}`}>
                                {isCustom ? 'Priced for your order' : `${plan.quantity}, excl. VAT`}
                            </p>

                            <ul className={`mt-5 pt-6 space-y-3 flex-1 border-t ${hot ? 'border-white/15' : isCustom ? 'border-ink/15' : 'border-mist'}`}>
                                {plan.features.map(f => (
                                    <li key={f} className="flex gap-3">
                                        <span className={`mt-0.5 grid place-items-center w-5 h-5 shrink-0 rounded-full ${hot ? 'bg-lime text-ink' : isCustom ? 'bg-ink text-lime' : 'bg-sage text-press'}`}>
                                            <Check className="w-3 h-3" strokeWidth={3} aria-hidden="true" />
                                        </span>
                                        <span className={hot ? 'text-white/90' : ''}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onSelectPlan(plan)}
                                className={`mt-8 h-[3.25rem] w-full ${hot ? 'btn-lime' : isCustom ? 'btn-dark' : 'btn bg-sage text-ink hover:bg-ink hover:text-white'}`}
                            >
                                {isCustom ? 'Request a custom quote' : `Order ${plan.name}`}
                                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </article>
                    );
                })}
            </div>
        </div>
    </section>
);
