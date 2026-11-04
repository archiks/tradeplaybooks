import React from 'react';
import { Check, Minus } from 'lucide-react';

// Which finish comes with which print run: [Starter, Brand, Signature]
const FINISHES: { name: string; note: string; runs: [boolean, boolean, boolean] }[] = [
    { name: 'One-colour logo', note: 'A single solid ink, matched to your brand colour', runs: [true, true, true] },
    { name: 'Full-colour print', note: 'Photos, gradients and patterns, edge to edge', runs: [false, true, true] },
    { name: 'Inside print', note: 'A message or pattern revealed when the lid opens', runs: [false, true, true] },
    { name: 'Hot foil', note: 'Gold, silver, copper or holographic foil', runs: [false, false, true] },
    { name: 'Embossing', note: 'A raised logo you can feel through the board', runs: [false, false, true] },
    { name: 'Soft-touch lamination', note: 'Velvety matte coating that resists scuffs', runs: [false, false, true] },
];

const RUNS = ['Starter', 'Brand', 'Signature'];

export const Finishes: React.FC = () => (
    <section id="finishes" className="py-20 lg:py-28 bg-ink text-paper scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
                <img
                    src="/assets/boxes/foil.jpg"
                    alt="Macro photo of a blind-embossed logo and silver foil lettering on textured board"
                    loading="lazy"
                    className="w-full aspect-square object-cover"
                />
            </div>

            <div className="lg:col-span-7 min-w-0">
                <h2 className="font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">Finishes that people notice.</h2>
                <p className="mt-5 text-lg text-paper/70 max-w-xl leading-relaxed">
                    Every run starts with a crisp one-colour logo. Bigger runs add colour, inside print and the tactile extras.
                </p>

                <div className="mt-10 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[460px] text-left">
                        <caption className="sr-only">Finishes included in each print run</caption>
                        <thead>
                            <tr className="border-b border-paper/25 text-sm text-paper/60">
                                <th scope="col" className="py-3 pr-4 font-medium">Finish</th>
                                {RUNS.map(r => <th key={r} scope="col" className="py-3 px-2 font-medium text-center w-20">{r}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {FINISHES.map(f => (
                                <tr key={f.name} className="border-b border-paper/15">
                                    <th scope="row" className="py-4 pr-4 font-normal">
                                        <span className="block font-semibold">{f.name}</span>
                                        <span className="block text-sm text-paper/60">{f.note}</span>
                                    </th>
                                    {f.runs.map((on, i) => (
                                        <td key={i} className="py-4 px-2 text-center">
                                            {on
                                                ? <Check className="inline w-5 h-5 text-[#8C95FF]" aria-label="Included" />
                                                : <Minus className="inline w-4 h-4 text-paper/30" aria-label="Not included" />}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
);
