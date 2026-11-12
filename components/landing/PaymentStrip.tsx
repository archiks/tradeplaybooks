import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { siVisa, siMastercard, siAmericanexpress, siPaypal, siStripe } from 'simple-icons';
import { STRIPE_LINKS } from '../../constants';

type Icon = { title: string; path: string };

// Accepted payment marks (official brand paths from the simple-icons set)
const METHODS: Icon[] = [siVisa, siMastercard, siAmericanexpress, siPaypal, siStripe];

const CURRENCY_NAMES: Record<string, string> = { USD: 'US Dollar', GBP: 'British Pound' };

/** Footer payment area: accepted methods + Stripe links for custom orders */
export const PaymentStrip: React.FC = () => (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 sm:p-8 flex flex-col">
            <p className="flex items-center gap-2.5 font-display font-bold text-2xl tracking-[-0.02em]">
                <ShieldCheck className="w-6 h-6 text-lime" aria-hidden="true" /> Secure checkout
            </p>
            <p className="mt-2 text-white/65 leading-relaxed max-w-sm">
                Pay by card, PayPal or Stripe. Payments are encrypted and we never store your card details.
            </p>
            <ul className="mt-auto pt-7 grid grid-cols-5 gap-2 sm:gap-2.5 max-w-[23rem]" aria-label="Accepted payment methods">
                {METHODS.map(m => (
                    <li
                        key={m.title}
                        title={m.title}
                        className="grid place-items-center h-12 rounded-2xl bg-white/[0.08] border border-white/10 text-white transition-colors hover:bg-lime hover:text-ink hover:border-lime"
                    >
                        <svg viewBox="0 0 24 24" className="h-7 w-7" role="img" aria-label={m.title}>
                            <path d={m.path} fill="currentColor" />
                        </svg>
                    </li>
                ))}
            </ul>
        </div>

        <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 sm:p-8">
            <p className="font-display font-bold text-2xl tracking-[-0.02em]">Pay a custom quote</p>
            <p className="mt-2 text-white/65 leading-relaxed max-w-sm">
                Already agreed a price with us? Pay it with Stripe in your currency.
            </p>
            <div className="mt-6 space-y-2.5">
                {STRIPE_LINKS.map(link => (
                    <a
                        key={link.code}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pay in ${CURRENCY_NAMES[link.code] || link.code} with Stripe (opens in a new window)`}
                        className="group flex items-center gap-4 rounded-full bg-white/[0.08] border border-white/10 p-2 pr-2.5 transition-colors hover:bg-lime hover:border-lime hover:text-ink"
                    >
                        <span className="grid place-items-center w-11 h-11 rounded-full bg-lime text-ink font-display font-bold text-lg transition-colors group-hover:bg-ink group-hover:text-lime">
                            {link.symbol}
                        </span>
                        <span className="flex-1 min-w-0">
                            <span className="block font-semibold leading-tight">{CURRENCY_NAMES[link.code] || link.label}</span>
                            <span className="block text-sm text-white/60 leading-tight group-hover:text-ink/70">{link.code}, via Stripe</span>
                        </span>
                        <span className="grid place-items-center w-11 h-11 rounded-full bg-white/10 transition-all group-hover:bg-ink group-hover:text-lime group-hover:rotate-45">
                            <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                        </span>
                    </a>
                ))}
            </div>
        </div>
    </div>
);
