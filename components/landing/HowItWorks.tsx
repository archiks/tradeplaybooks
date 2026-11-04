import React from 'react';

const STEPS = [
    { title: 'Choose a print run', body: 'Pick Starter, Brand or Signature and pay by card or PayPal invoice.' },
    { title: 'Send your logo', body: 'We email you an upload link. Vector files (AI, PDF, SVG) are best; a 300 dpi PNG also works.' },
    { title: 'Approve the proof', body: 'Within one working day you get a 3D proof of your box. Changes are free until you approve.' },
    { title: 'We print and ship', body: 'Your boxes are printed, checked, flat-packed and sent to your door or warehouse.' },
];

export const HowItWorks: React.FC = () => (
    <section id="process" className="py-20 lg:py-28 bg-paper scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 items-end">
                <h2 className="lg:col-span-6 font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">
                    From logo file to pallet in four steps.
                </h2>
                <p className="lg:col-span-5 lg:col-start-8 text-lg text-ink/70 leading-relaxed">
                    Nothing is printed until you have seen your box and said yes. Most orders go from upload to dispatch in under two weeks.
                </p>
            </div>

            <img
                src="/assets/boxes/press.jpg"
                alt="Printed box sheets with blue logos coming off a digital press, checked by a gloved hand"
                loading="lazy"
                className="mt-12 w-full aspect-[16/9] lg:aspect-[21/9] object-cover"
            />

            <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {STEPS.map((s, i) => (
                    <li key={s.title} className="border-t-[1.5px] border-ink pt-5">
                        <span className="font-wide font-extrabold text-5xl text-press leading-none" aria-hidden="true">{i + 1}</span>
                        <h3 className="mt-4 font-bold text-xl">{s.title}</h3>
                        <p className="mt-2 text-ink/70 leading-relaxed">{s.body}</p>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);
