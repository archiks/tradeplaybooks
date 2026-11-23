import React, { useEffect, useState } from 'react';
import { Check, ChevronRight, Clock, FileCheck2, Layers, ShoppingBag, Sparkles, Zap } from 'lucide-react';
import { CATALOG, findProduct, formatEUR, imageFor, lineTotalFor, PRINTS, PrintId, QUANTITIES, unitPriceFor } from '../../catalog';
import { ProductCard } from '../landing/Catalog';
import { ShopHeader } from './ShopHeader';
import { Link, useNav } from './nav';
import { useCart } from './cart';

export const ProductPage: React.FC<{ slug: string }> = ({ slug }) => {
    const p = findProduct(slug);
    const go = useNav();
    const { add, open } = useCart();
    const [sizeIndex, setSizeIndex] = useState(1);
    const [print, setPrint] = useState<PrintId>('one');
    const [qty, setQty] = useState(100);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        setSizeIndex(1); setPrint('one'); setQty(100); setAdded(false);
        if (p) document.title = `${p.name} | Garsabers`;
        return () => { document.title = 'Garsabers | Custom logo-printed boxes'; };
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!p) {
        return (
            <div className="min-h-screen bg-paper">
                <ShopHeader />
                <main className="max-w-3xl mx-auto px-4 py-28 text-center">
                    <h1 className="h-display text-5xl">We couldn't find that box.</h1>
                    <p className="mt-4 text-lg text-ink/65">It may have been renamed or removed from the catalog.</p>
                    <button onClick={() => go('/#catalog')} className="btn-dark mt-8 h-12 px-6">Browse the catalog</button>
                </main>
            </div>
        );
    }

    const unit = unitPriceFor(p, qty, sizeIndex, print);
    const total = lineTotalFor(p, qty, sizeIndex, print);
    const item = { slug: p.slug, qty, sizeIndex, print };
    const related = [...CATALOG.filter(x => x.category === p.category && x.slug !== p.slug), ...CATALOG.filter(x => x.category !== p.category)].slice(0, 4);

    const addToCart = () => { add(item); setAdded(true); open(); };
    const buyNow = () => { add(item); go('/checkout'); };

    return (
        <div className="min-h-screen bg-paper">
            <ShopHeader />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-20">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink/55">
                    <Link to="/" className="hover:text-ink">Home</Link>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    <Link to="/#catalog" className="hover:text-ink">Product catalog</Link>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    <span className="text-ink font-medium">{p.name}</span>
                </nav>

                <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
                    <div className="lg:sticky lg:top-24">
                        <div className="overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-sage">
                            <img src={imageFor(p.slug)} alt={p.name} className="w-full aspect-square object-cover" />
                        </div>
                        <ul className="mt-4 grid grid-cols-3 gap-3 text-sm">
                            {[{ icon: FileCheck2, t: 'Free proof', d: 'before printing' }, { icon: Clock, t: '7–10 days', d: 'to print' }, { icon: Sparkles, t: 'Your logo', d: 'on every box' }].map(f => (
                                <li key={f.t} className="rounded-3xl bg-white border border-mist px-4 py-3">
                                    <f.icon className="w-5 h-5 text-press" aria-hidden="true" />
                                    <p className="mt-2 font-semibold leading-tight">{f.t}</p>
                                    <p className="text-ink/55 leading-tight">{f.d}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="inline-flex rounded-full bg-sage px-3.5 py-1 text-sm font-medium text-ink/75">{p.category}</p>
                        <h1 className="h-display mt-4 text-5xl sm:text-6xl">{p.name}</h1>
                        <p className="mt-5 text-lg text-ink/70 leading-relaxed max-w-xl">{p.description}</p>

                        <div className="mt-8 space-y-7">
                            <fieldset>
                                <legend className="font-semibold">Size <span className="font-normal text-ink/50">(inside, cm)</span></legend>
                                <div className="mt-3 grid grid-cols-3 gap-2.5">
                                    {p.sizes.map((s, i) => (
                                        <button
                                            key={s.label}
                                            type="button"
                                            onClick={() => setSizeIndex(i)}
                                            aria-pressed={sizeIndex === i}
                                            className={`rounded-3xl px-4 py-3 text-left border transition-colors ${sizeIndex === i ? 'bg-forest text-white border-forest' : 'bg-white border-mist hover:border-ink/30'}`}
                                        >
                                            <span className="block font-semibold">{s.label}</span>
                                            <span className={`block text-sm ${sizeIndex === i ? 'text-white/70' : 'text-ink/55'}`}>{s.dims}</span>
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold">Print</legend>
                                <div className="mt-3 grid sm:grid-cols-2 gap-2.5">
                                    {PRINTS.map(o => (
                                        <button
                                            key={o.id}
                                            type="button"
                                            onClick={() => setPrint(o.id)}
                                            aria-pressed={print === o.id}
                                            className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-left border transition-colors ${print === o.id ? 'bg-forest text-white border-forest' : 'bg-white border-mist hover:border-ink/30'}`}
                                        >
                                            <span className={`grid place-items-center w-6 h-6 rounded-full shrink-0 ${print === o.id ? 'bg-lime text-ink' : 'border border-mist'}`}>
                                                {print === o.id && <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />}
                                            </span>
                                            <span>
                                                <span className="block font-semibold">{o.label}</span>
                                                <span className={`block text-sm ${print === o.id ? 'text-white/70' : 'text-ink/55'}`}>{o.note}</span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold">Quantity <span className="font-normal text-ink/50">(bigger runs cost less per box)</span></legend>
                                <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                                    {QUANTITIES.map(q => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => setQty(q)}
                                            aria-pressed={qty === q}
                                            className={`rounded-3xl px-3 py-3 text-center border transition-colors ${qty === q ? 'bg-forest text-white border-forest' : 'bg-white border-mist hover:border-ink/30'}`}
                                        >
                                            <span className="block font-display font-bold text-lg">{q}</span>
                                            <span className={`block text-xs ${qty === q ? 'text-white/70' : 'text-ink/55'}`}>{formatEUR(unitPriceFor(p, q, sizeIndex, print))} each</span>
                                        </button>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                        <div className="mt-8 rounded-[2rem] bg-white border border-mist shadow-soft p-6">
                            <div className="flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-sm text-ink/55">{qty} boxes at {formatEUR(unit)} each</p>
                                    <p className="font-display font-bold text-5xl tracking-[-0.04em] leading-none mt-1">{formatEUR(total)}</p>
                                </div>
                                <p className="text-sm text-ink/55 text-right">excl. VAT<br />delivery confirmed with proof</p>
                            </div>
                            <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                                <button onClick={addToCart} className="btn h-14 bg-sage text-ink hover:bg-ink hover:text-white text-[17px]">
                                    <ShoppingBag className="w-5 h-5" aria-hidden="true" /> {added ? 'Added to cart' : 'Add to cart'}
                                </button>
                                <button onClick={buyNow} className="btn-dark h-14 text-[17px]">
                                    <Zap className="w-5 h-5 text-lime" aria-hidden="true" /> Buy now
                                </button>
                            </div>
                        </div>

                        <dl className="mt-8 divide-y divide-mist border-y border-mist">
                            {[['Material', p.board], ['Best for', p.bestFor], ['Artwork', 'Vector files (AI, PDF, SVG) or PNG at 300 dpi'], ['Delivery', 'Flat-packed, to your door or warehouse']].map(([k, v]) => (
                                <div key={k} className="flex gap-6 py-3.5">
                                    <dt className="w-24 shrink-0 text-ink/55 flex items-center gap-2">{k === 'Material' && <Layers className="w-4 h-4" aria-hidden="true" />}{k}</dt>
                                    <dd className="font-medium">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <section className="mt-24">
                    <div className="flex items-end justify-between gap-4">
                        <h2 className="h-display text-4xl sm:text-5xl">You may also like</h2>
                        <Link to="/#catalog" className="hidden sm:inline-flex font-semibold underline underline-offset-4 hover:text-press">See all boxes</Link>
                    </div>
                    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {related.map(r => <ProductCard key={r.slug} slug={r.slug} />)}
                    </div>
                </section>
            </main>
        </div>
    );
};
