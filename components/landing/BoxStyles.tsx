import React from 'react';

type Style = {
    name: string;
    use: string;
    img: string;
    alt: string;
    specs: [string, string][];
};

const STYLES: Style[] = [
    {
        name: 'Mailer box',
        use: 'The unboxing box. Tuck-front lid, strong enough to post on its own, room to print inside the lid.',
        img: '/assets/boxes/mailer.jpg',
        alt: 'Open white mailer box with a blue patterned interior print and a skincare bottle inside',
        specs: [['Board', 'White or kraft corrugated, 1.5 mm'], ['Sizes', '6 stock sizes or custom'], ['Print', 'Outside, inside, or both']],
    },
    {
        name: 'Shipping carton',
        use: 'Brown boxes that still say who sent them. Built for warehouses, couriers and wholesale orders.',
        img: '/assets/boxes/carton.jpg',
        alt: 'Kraft shipping cartons on a pallet printed in black with a coffee roaster logo',
        specs: [['Board', 'Kraft corrugated, single or double wall'], ['Print', 'One or two colours, outside']],
    },
    {
        name: 'Rigid gift box',
        use: 'Heavy board, magnetic lid, foil or embossed logo. For jewellery, gift sets and launches.',
        img: '/assets/boxes/rigid.jpg',
        alt: 'Navy rigid gift box with a gold foil monogram on the lid',
        specs: [['Board', '2 mm greyboard, wrapped paper'], ['Finish', 'Hot foil, emboss, soft-touch']],
    },
];

const Specs: React.FC<{ specs: [string, string][] }> = ({ specs }) => (
    <dl className="mt-5 border-t border-ink/15 text-sm">
        {specs.map(([k, v]) => (
            <div key={k} className="flex gap-4 py-2.5 border-b border-ink/15">
                <dt className="w-16 shrink-0 text-ink/55">{k}</dt>
                <dd className="font-medium">{v}</dd>
            </div>
        ))}
    </dl>
);

export const BoxStyles: React.FC = () => {
    const [mailer, carton, rigid] = STYLES;
    return (
        <section id="boxes" className="py-20 lg:py-28 bg-white border-y border-board scroll-mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="max-w-2xl">
                    <h2 className="font-wide font-extrabold text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.02]">Three box styles. One print standard.</h2>
                    <p className="mt-5 text-lg text-ink/70 leading-relaxed">
                        Every run is printed on the same presses and checked sheet by sheet, whether it is 100 mailers or a pallet of cartons.
                    </p>
                </div>

                <div className="mt-14 grid lg:grid-cols-12 gap-x-10 gap-y-14">
                    <article className="lg:col-span-7">
                        <img src={mailer.img} alt={mailer.alt} loading="lazy" className="w-full aspect-[4/3] object-cover bg-paper" />
                        <div className="mt-6 grid sm:grid-cols-2 gap-x-8">
                            <div>
                                <h3 className="font-wide font-bold text-2xl">{mailer.name}</h3>
                                <p className="mt-2 text-ink/70 leading-relaxed">{mailer.use}</p>
                            </div>
                            <Specs specs={mailer.specs} />
                        </div>
                    </article>

                    <div className="lg:col-span-5 grid gap-14">
                        {[carton, rigid].map((s, i) => (
                            <article key={s.name} className={i === 1 ? 'grid sm:grid-cols-[0.8fr_1fr] gap-6 items-start' : ''}>
                                <img src={s.img} alt={s.alt} loading="lazy" className={`w-full object-cover bg-paper ${i === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
                                <div className={i === 0 ? 'mt-6' : ''}>
                                    <h3 className="font-wide font-bold text-2xl">{s.name}</h3>
                                    <p className="mt-2 text-ink/70 leading-relaxed">{s.use}</p>
                                    <Specs specs={s.specs} />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
