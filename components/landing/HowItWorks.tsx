import React from 'react';
import { SectionHead } from './SectionHead';

const STEPS = [
    { title: 'Choose a print run', body: 'Pick Starter, Brand, Signature or Custom and pay securely online.' },
    { title: 'Send your logo', body: 'We email you an upload link. Vector files are best; a 300 dpi PNG also works.' },
    { title: 'Approve the proof', body: 'Within one working day you get a 3D proof. Changes are free until you approve.' },
    { title: 'We print and ship', body: 'Your boxes are printed, checked, flat-packed and sent to your door.' },
];

export const HowItWorks: React.FC = () => (
    <section id="process" className="py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHead title="From logo file to doorstep in four steps.">
                Nothing is printed until you have seen your box and said yes. Most orders go from upload to dispatch in under two weeks.
            </SectionHead>

            <div className="mt-12 relative overflow-hidden rounded-[2rem]">
                <img
                    src="/assets/boxes/process.jpg"
                    alt="Freshly printed box sheets on a digital press, checked by hand"
                    loading="lazy"
                    className="w-full aspect-[16/10] sm:aspect-[21/9] object-cover"
                />
            </div>

            <ol className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {STEPS.map((s, i) => (
                    <li key={s.title} className="rounded-[1.75rem] bg-white border border-mist p-6 shadow-soft">
                        <span className="grid place-items-center w-11 h-11 rounded-full bg-forest text-lime font-display font-bold text-lg" aria-hidden="true">{i + 1}</span>
                        <h3 className="mt-5 font-display font-bold text-xl tracking-[-0.02em]">{s.title}</h3>
                        <p className="mt-1.5 text-ink/65 leading-relaxed">{s.body}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);
