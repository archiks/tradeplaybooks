import React from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { siVisa, siMastercard, siAmericanexpress, siPaypal, siStripe } from 'simple-icons';
import { STRIPE_LINKS } from '../../constants';

type Icon = { title: string; path: string; hex: string };

// Accepted payment marks (official brand paths from the simple-icons set)
const METHODS: Icon[] = [siVisa, siMastercard, siAmericanexpress, siPaypal, siStripe];

const Mark: React.FC<{ icon: Icon }> = ({ icon }) => (
    <li
        className="h-11 w-[3.75rem] sm:w-[4.25rem] bg-white rounded-md flex items-center justify-center"
        title={icon.title}
    >
        <svg viewBox="0 0 24 24" className="h-8 w-8 sm:h-9 sm:w-9" role="img" aria-label={icon.title}>
            <path d={icon.path} fill={`#${icon.hex}`} />
        </svg>
    </li>
);

/** Footer band: accepted payment methods + Stripe links for custom orders */
export const PaymentStrip: React.FC = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-paper/10 grid gap-10 lg:grid-cols-2 lg:items-end">
        <div>
            <p className="font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#8C95FF]" aria-hidden="true" /> Secure payment
            </p>
            <p className="mt-1 text-sm text-paper/60">Card, PayPal and Stripe. We never store your card details.</p>
            <ul className="mt-5 flex flex-wrap gap-2 sm:gap-2.5" aria-label="Accepted payment methods">
                {METHODS.map(m => <Mark key={m.title} icon={m} />)}
            </ul>
        </div>

        <div className="lg:justify-self-end lg:text-right">
            <p className="font-semibold">Paying for a custom order?</p>
            <p className="mt-1 text-sm text-paper/60">Pay your agreed quote securely with Stripe. Opens in a new window.</p>
            <div className="mt-5 flex flex-wrap gap-3 lg:justify-end">
                {STRIPE_LINKS.map(link => (
                    <a
                        key={link.code}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-5 inline-flex items-center gap-2 bg-press text-white font-semibold hover:bg-white hover:text-press transition-colors"
                    >
                        <span className="font-wide font-extrabold">{link.symbol}</span>
                        Pay in {link.label}
                        <ExternalLink className="w-4 h-4 opacity-80" aria-hidden="true" />
                    </a>
                ))}
            </div>
        </div>
    </div>
);
