import React from 'react';
import { Droplet, Palette, PackageOpen, Sparkles, Stamp, Feather } from 'lucide-react';
import { SectionHead } from './SectionHead';

// Which print runs include each finish
const FINISHES = [
    { icon: Droplet, name: 'One-colour logo', note: 'A single solid ink, matched to your brand colour.', runs: ['Starter', 'Brand', 'Signature'] },
    { icon: Palette, name: 'Full-colour print', note: 'Photos, gradients and patterns, edge to edge.', runs: ['Brand', 'Signature'] },
    { icon: PackageOpen, name: 'Inside print', note: 'A message or pattern revealed when the lid opens.', runs: ['Brand', 'Signature'] },
    { icon: Sparkles, name: 'Hot foil', note: 'Gold, silver, copper or holographic foil.', runs: ['Signature'] },
    { icon: Stamp, name: 'Embossing', note: 'A raised logo you can feel through the board.', runs: ['Signature'] },
    { icon: Feather, name: 'Soft-touch lamination', note: 'Velvety matte coating that resists scuffs.', runs: ['Signature'] },
];

export const Finishes: React.FC = () => (
    <section id="finishes" className="scroll-mt-20 px-2 sm:px-4">
        <div className="bg-forest text-white rounded-[2.5rem] sm:rounded-[3.5rem] py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHead light title="Finishes people notice.">
                    Every run starts with a crisp one-colour logo. Bigger runs add colour, inside print and the tactile extras.
                </SectionHead>

                <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12">
                    <div className="lg:col-span-5 relative overflow-hidden rounded-[2rem] min-h-[22rem]">
                        <img
                            src="/assets/boxes/finish.jpg"
                            alt="Macro photo of gold foil lettering and an embossed logo on green board"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-4 sm:gap-5">
                        {FINISHES.map(f => (
                            <li key={f.name} className="rounded-[1.75rem] bg-white/[0.07] border border-white/10 p-6 transition-colors hover:bg-white/[0.11]">
                                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-lime text-ink">
                                    <f.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="mt-5 font-display font-bold text-xl tracking-[-0.02em]">{f.name}</h3>
                                <p className="mt-1.5 text-white/70 leading-relaxed">{f.note}</p>
                                <p className="mt-4 flex flex-wrap gap-1.5" aria-label={`Included in: ${f.runs.join(', ')}`}>
                                    {f.runs.map(r => (
                                        <span key={r} className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white/85">{r}</span>
                                    ))}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);
