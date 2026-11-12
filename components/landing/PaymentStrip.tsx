import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

// Payment marks shown in the footer (official full-colour logos in /public/assets/pay)
const METHODS = [
    { name: 'Visa', src: '/assets/pay/visa.svg', size: 'w-11' },
    { name: 'Mastercard', src: '/assets/pay/mastercard.svg', size: 'h-7' },
    { name: 'American Express', src: '/assets/pay/amex.svg', size: 'h-8 rounded-[5px]' },
    { name: 'PayPal', src: '/assets/pay/paypal.svg', size: 'h-7' },
    { name: 'Airwallex', src: '/assets/pay/airwallex.png', size: 'h-6' },
];

const QUOTE_MAILTO = `mailto:info@garsabers.com?subject=${encodeURIComponent('Custom box quote')}&body=${encodeURIComponent('Hello,\n\nI would like a quote for custom boxes:\n\nBox style:\nQuantity:\nSize:\nPrint and finishes:\n\nCompany name:\nBilling address:\n\nThank you')}`;

/** Footer payment area: accepted methods + custom quote request */
export const PaymentStrip: React.FC = () => (
    <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 sm:p-8 flex flex-col">
            <p className="flex items-center gap-2.5 font-display font-bold text-2xl tracking-[-0.02em]">
                <ShieldCheck className="w-6 h-6 text-lime" aria-hidden="true" /> Secure checkout
            </p>
            <p className="mt-2 text-white/65 leading-relaxed max-w-sm">
                Pay by card or PayPal. Payments are encrypted and we never store your card details.
            </p>
            <ul className="mt-auto pt-7 grid grid-cols-5 gap-2 sm:gap-3 max-w-[26rem]" aria-label="Accepted payment methods">
                {METHODS.map(m => (
                    <li
                        key={m.name}
                        title={m.name}
                        className="grid place-items-center h-12 sm:h-14 rounded-2xl bg-white shadow-soft transition-transform duration-200 hover:-translate-y-1"
                    >
                        <img src={m.src} alt={m.name} loading="lazy" className={`${m.size} max-w-[70%] object-contain`} />
                    </li>
                ))}
            </ul>
        </div>

        <div className="rounded-[2rem] bg-white/[0.06] border border-white/10 p-7 sm:p-8 flex flex-col">
            <p className="font-display font-bold text-2xl tracking-[-0.02em]">Need a custom quote?</p>
            <p className="mt-2 text-white/65 leading-relaxed max-w-sm">
                Bigger runs, special shapes or mixed styles. Tell us what you need and we will price it for you.
            </p>
            <div className="mt-auto pt-7">
                <a
                    href={QUOTE_MAILTO}
                    className="group flex items-center gap-4 rounded-full bg-lime text-ink p-2 pl-6 transition-colors hover:bg-white"
                >
                    <span className="flex-1 min-w-0">
                        <span className="block font-semibold leading-tight">Request a custom quote</span>
                        <span className="block text-sm text-ink/65 leading-tight truncate">info@garsabers.com</span>
                    </span>
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-ink text-lime transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                    </span>
                </a>
            </div>
        </div>
    </div>
);
