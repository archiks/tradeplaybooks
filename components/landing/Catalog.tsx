import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATALOG, CATEGORIES, Category, formatEUR, imageFor, unitPriceFor } from '../../catalog';
import { Link } from '../shop/nav';
import { SectionHead } from './SectionHead';

export const ProductCard: React.FC<{ slug: string }> = ({ slug }) => {
    const p = CATALOG.find(x => x.slug === slug)!;
    return (
        <Link to={`/product/${p.slug}`} className="group block rounded-[1.5rem] sm:rounded-[1.75rem] bg-white border border-mist p-2 sm:p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.35rem] bg-sage aspect-square">
                <img
                    src={imageFor(p.slug)}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute top-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-white/90 backdrop-blur text-ink opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                </span>
            </div>
            <div className="px-1.5 sm:px-3 pt-3 sm:pt-4 pb-2 sm:pb-3">
                <p className="text-xs sm:text-sm text-ink/50">{p.category}</p>
                <h3 className="mt-0.5 font-display font-bold text-lg sm:text-xl leading-tight tracking-[-0.02em]">{p.name}</h3>
                <p className="hidden sm:block mt-1 text-ink/65 leading-snug min-h-[2.75rem]">{p.blurb}</p>
                <p className="mt-3 text-sm text-ink/60">
                    from <span className="font-display font-bold text-lg text-ink">{formatEUR(unitPriceFor(p, 1000, 0, 'one'))}</span> per box
                </p>
            </div>
        </Link>
    );
};

export const Catalog: React.FC = () => {
    const [filter, setFilter] = useState<Category | 'All'>('All');
    const shown = filter === 'All' ? CATALOG : CATALOG.filter(p => p.category === filter);

    return (
        <section id="catalog" className="py-20 lg:py-28 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHead title="Product catalog">
                    {CATALOG.length} box styles, each printed with your logo. Pick one, choose size, print and quantity, and order online.
                </SectionHead>

                <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                    {(['All', ...CATEGORIES] as const).map(c => (
                        <button
                            key={c}
                            onClick={() => setFilter(c)}
                            aria-pressed={filter === c}
                            className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${filter === c ? 'bg-forest text-white' : 'bg-white border border-mist text-ink/75 hover:bg-sage'}`}
                        >
                            {c}
                            <span className={`ml-2 text-sm ${filter === c ? 'text-lime' : 'text-ink/40'}`}>
                                {c === 'All' ? CATALOG.length : CATALOG.filter(p => p.category === c).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                    {shown.map(p => <ProductCard key={p.slug} slug={p.slug} />)}
                </div>
            </div>
        </section>
    );
};
