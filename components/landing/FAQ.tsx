import React from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
    { q: 'What file should I send for my logo?', a: 'A vector file (AI, EPS, PDF or SVG) gives the sharpest edges. A PNG at 300 dpi at print size also works. If all you have is a small JPG, send it anyway and we will tell you whether it will print cleanly.' },
    { q: 'Can I see my box before you print the whole run?', a: 'Yes. Every order gets a digital 3D proof showing your artwork on the actual die-line. The Signature run also includes a physical sample sent to you before the full run.' },
    { q: 'How long does it take?', a: 'You receive your proof within one working day of uploading artwork. Production starts when you approve it and takes 7 to 10 working days, then the boxes are shipped flat-packed.' },
    { q: 'Can you match my brand colour?', a: 'Send us your Pantone or HEX reference. One-colour runs are printed with an ink mixed to that reference; full-colour runs are matched as closely as the board allows, and the proof shows what to expect.' },
    { q: 'Do you print boxes in custom sizes?', a: 'Brand and Signature runs can be made to any size you give us, to the millimetre. Starter runs use one of six stock mailer sizes, which fit most clothing, cosmetics and accessories.' },
    { q: 'How do I pay?', a: 'Pay by card at checkout, or choose PayPal invoice if your company needs an invoice before paying. Your order goes into production once payment is received.' },
];

export const FAQ: React.FC = () => (
    <section id="faq" className="py-20 lg:py-28 bg-paper scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
                <h2 className="font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">Questions we get before every first order.</h2>
                <img
                    src="/assets/boxes/proof.jpg"
                    alt="Unfolded printed mailer box sample next to a colour proof sheet and ink swatches"
                    loading="lazy"
                    className="mt-10 w-full aspect-[4/3] object-cover hidden lg:block"
                />
            </div>
            <div className="lg:col-span-7 border-t-[1.5px] border-ink">
                {FAQS.map(f => (
                    <details key={f.q} className="group border-b border-ink/20">
                        <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer text-lg sm:text-xl font-semibold hover:text-press">
                            {f.q}
                            <Plus className="w-6 h-6 shrink-0 mt-0.5 text-press transition-transform group-open:rotate-45" aria-hidden="true" />
                        </summary>
                        <p className="pb-7 -mt-1 text-ink/75 leading-relaxed max-w-[62ch]">{f.a}</p>
                    </details>
                ))}
            </div>
        </div>
    </section>
);
