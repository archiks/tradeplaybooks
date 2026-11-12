import React from 'react';
import { SectionHead } from './SectionHead';

type Style = { name: string; use: string; img: string; alt: string; tags: string[] };

const STYLES: Style[] = [
    {
        name: 'Mailer boxes',
        use: 'The unboxing box. Tuck-front lid, tough enough to post on its own, with room to print inside.',
        img: '/assets/boxes/mailer.jpg',
        alt: 'Open white mailer box with a lime green printed interior',
        tags: ['White or kraft board', '6 stock sizes or custom', 'Print outside and inside'],
    },
    {
        name: 'Shipping cartons',
        use: 'Brown boxes that still say who sent them. Built for warehouses, couriers and wholesale.',
        img: '/assets/boxes/carton.jpg',
        alt: 'Stack of kraft shipping cartons printed with a black logo',
        tags: ['Single or double wall', 'One or two colours'],
    },
    {
        name: 'Rigid gift boxes',
        use: 'Heavy board, magnetic lid, foil or embossed logo. For gift sets and launches.',
        img: '/assets/boxes/rigid.jpg',
        alt: 'Matte black rigid gift box with a gold foil monogram',
        tags: ['2 mm greyboard', 'Foil, emboss, soft-touch'],
    },
];

const Card: React.FC<{ s: Style; className?: string; big?: boolean }> = ({ s, className = '', big }) => (
    <article className={`group relative overflow-hidden rounded-[2rem] bg-forest text-white min-h-[26rem] flex ${className}`}>
        <img
            src={s.img}
            alt={s.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-transparent" aria-hidden="true" />
        <div className="relative mt-auto p-6 sm:p-8">
            <h3 className={`font-display font-bold tracking-[-0.03em] ${big ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{s.name}</h3>
            <p className={`mt-2 text-white/80 leading-relaxed ${big ? 'max-w-md text-lg' : 'max-w-sm'}`}>{s.use}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map(t => (
                    <li key={t} className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-sm font-medium">{t}</li>
                ))}
            </ul>
        </div>
    </article>
);

export const BoxStyles: React.FC = () => {
    const [mailer, carton, rigid] = STYLES;
    return (
        <section id="boxes" className="py-20 lg:py-28 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHead title="Three box styles, endless looks.">
                    Pick the box that fits how you ship. Every style is printed on the same presses and checked sheet by sheet.
                </SectionHead>

                <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-2">
                    <Card s={mailer} big className="lg:col-span-7 lg:row-span-2 lg:min-h-[44rem]" />
                    <Card s={carton} className="lg:col-span-5" />
                    <Card s={rigid} className="lg:col-span-5" />
                </div>
            </div>
        </section>
    );
};
