import React from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
    { q: 'What file should I send for my logo?', a: 'A vector file (AI, EPS, PDF or SVG) gives the sharpest edges. A PNG at 300 dpi at print size also works. If all you have is a small JPG, send it anyway and we will tell you whether it will print cleanly.' },
    { q: 'Can I see my box before you print the whole run?', a: 'Yes. Every order gets a digital 3D proof showing your artwork on the actual die-line. The Signature run also includes a physical sample sent to you before the full run.' },
    { q: 'How long does it take?', a: 'You receive your proof within one working day of uploading artwork. Production starts when you approve it and takes 7 to 10 working days, then the boxes are shipped flat-packed.' },
    { q: 'Can you match my brand colour?', a: 'Send us your Pantone or HEX reference. One-colour runs are printed with an ink mixed to that reference; full-colour runs are matched as closely as the board allows, and the proof shows what to expect.' },
    { q: 'Do you print boxes in custom sizes?', a: 'Brand and Signature runs can be made to any size you give us, to the millimetre. Starter runs use one of six stock mailer sizes, which fit most clothing, cosmetics and accessories.' },
    { q: 'Can I cancel or get a refund?', a: 'You can cancel for a full refund any time before you approve your proof. After approval your boxes are made to order, so we cannot refund a change of mind, but we reprint or refund anything faulty, misprinted, damaged or late. The full details are in our Refund Policy at garsabers.com/refund-policy.' },
    { q: 'How do I pay?', a: 'Pay by card at checkout. Custom orders are paid through a secure Airwallex payment link once we have agreed your quote, or by bank transfer on a custom invoice. Your order goes into production once payment is received.' },
];

export const FAQ: React.FC = () => (
    <section id="faq" className="py-20 lg:py-28 bg-sage rounded-[2.5rem] sm:rounded-[3.5rem] mx-2 sm:mx-4 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
                <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl">Good questions, straight answers.</h2>
                <p className="mt-5 text-lg text-ink/65 leading-relaxed max-w-md">
                    Something else on your mind? Email{' '}
                    <a href="mailto:info@garsabers.com" className="font-semibold text-press underline underline-offset-4">info@garsabers.com</a>.
                </p>
            </div>
            <div className="lg:col-span-7 space-y-3">
                {FAQS.map(f => (
                    <details key={f.q} className="group rounded-3xl bg-white border border-mist open:shadow-soft transition-shadow">
                        <summary className="flex items-center justify-between gap-6 px-6 py-5 cursor-pointer text-lg font-semibold">
                            {f.q}
                            <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-sage text-ink transition-all group-open:rotate-45 group-open:bg-forest group-open:text-lime">
                                <Plus className="w-5 h-5" aria-hidden="true" />
                            </span>
                        </summary>
                        <p className="px-6 pb-6 -mt-1 text-ink/70 leading-relaxed max-w-[62ch]">{f.a}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);
