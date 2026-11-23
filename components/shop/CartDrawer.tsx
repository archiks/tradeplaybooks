import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, ArrowUpRight, ShoppingBag } from 'lucide-react';
import { findProduct, formatEUR, imageFor, lineTotalFor, PRINTS, QUANTITIES } from '../../catalog';
import { useCart } from './cart';
import { useNav } from './nav';

export const CartDrawer: React.FC = () => {
    const { items, isOpen, close, update, remove, subtotal } = useCart();
    const go = useNav();

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
    }, [isOpen, close]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                    className="fixed inset-0 z-50 bg-forest-deep/70 flex justify-end"
                    onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
                    role="dialog" aria-modal="true" aria-label="Your cart"
                >
                    <motion.aside
                        initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="w-full max-w-md h-full bg-white sm:rounded-l-[2rem] flex flex-col shadow-lift"
                    >
                        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
                            <h2 className="font-display font-bold text-2xl">Your cart</h2>
                            <button onClick={close} aria-label="Close cart" className="grid place-items-center w-10 h-10 rounded-full bg-sage hover:bg-ink hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex-1 grid place-items-center px-6 text-center">
                                <div>
                                    <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-sage"><ShoppingBag className="w-7 h-7" aria-hidden="true" /></span>
                                    <p className="mt-5 font-display font-bold text-xl">Your cart is empty</p>
                                    <p className="mt-1 text-ink/60">Pick a box from the catalog to get started.</p>
                                    <button onClick={() => { close(); go('/#catalog'); }} className="btn-dark mt-6 h-12 px-6">Browse the catalog</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ul className="flex-1 overflow-y-auto px-6 space-y-3 pb-4">
                                    {items.map((item, i) => {
                                        const p = findProduct(item.slug);
                                        if (!p) return null;
                                        const print = PRINTS.find(x => x.id === item.print);
                                        return (
                                            <li key={`${item.slug}-${item.sizeIndex}-${item.print}`} className="flex gap-4 rounded-3xl bg-paper p-3">
                                                <img src={imageFor(p.slug)} alt="" className="w-20 h-20 rounded-2xl object-cover bg-sage shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className="font-semibold leading-tight">{p.name}</p>
                                                        <button onClick={() => remove(i)} aria-label={`Remove ${p.name}`} className="shrink-0 grid place-items-center w-8 h-8 -mt-1 -mr-1 rounded-full text-ink/45 hover:bg-white hover:text-ink transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-ink/55">{p.sizes[item.sizeIndex].label}, {print?.label.toLowerCase()}</p>
                                                    <div className="mt-2 flex items-center justify-between gap-2">
                                                        <label className="sr-only" htmlFor={`qty-${i}`}>Quantity for {p.name}</label>
                                                        <select
                                                            id={`qty-${i}`}
                                                            value={item.qty}
                                                            onChange={(e) => update(i, Number(e.target.value))}
                                                            className="rounded-full bg-white border border-mist pl-3 pr-2 py-1 text-sm font-medium"
                                                        >
                                                            {QUANTITIES.map(q => <option key={q} value={q}>{q} boxes</option>)}
                                                        </select>
                                                        <p className="font-display font-bold">{formatEUR(lineTotalFor(p, item.qty, item.sizeIndex, item.print))}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="px-6 pt-4 pb-6 border-t border-mist">
                                    <div className="flex items-baseline justify-between">
                                        <p className="text-ink/65">Subtotal, excl. VAT</p>
                                        <p className="font-display font-bold text-2xl">{formatEUR(subtotal)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-ink/50">Delivery is confirmed with your proof.</p>
                                    <button onClick={() => { close(); go('/checkout'); }} className="btn-dark mt-4 w-full h-14 text-[17px]">
                                        Checkout <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                    <button onClick={close} className="mt-2 w-full h-11 rounded-full font-semibold text-ink/70 hover:bg-sage transition-colors">Continue shopping</button>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
