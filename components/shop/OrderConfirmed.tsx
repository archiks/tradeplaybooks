import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { findProduct, formatEUR, imageFor, lineTotalFor, PRINTS } from '../../catalog';
import { ShopHeader } from './ShopHeader';
import { useNav } from './nav';
import type { CartItem } from './cart';

interface LastOrder { ref: string; email: string; name: string; items: CartItem[]; subtotal: number }

const STEPS = [
    ['Send your logo', 'We email you an upload link for your artwork.'],
    ['Approve the proof', 'You get a 3D proof within one working day of upload.'],
    ['We print and ship', 'Production takes 7–10 working days after approval.'],
];

export const OrderConfirmed: React.FC = () => {
    const go = useNav();
    const [order, setOrder] = useState<LastOrder | null>(null);

    useEffect(() => {
        document.title = 'Order confirmed | Garsabers';
        try { setOrder(JSON.parse(sessionStorage.getItem('garsabers_last_order') || 'null')); } catch { setOrder(null); }
        return () => { document.title = 'Garsabers | Custom logo-printed boxes'; };
    }, []);

    return (
        <div className="min-h-screen bg-paper">
            <ShopHeader />
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-lime text-ink"><Check className="w-8 h-8" strokeWidth={3} aria-hidden="true" /></span>
                <h1 className="h-display mt-6 text-5xl sm:text-6xl">{order ? `Thank you, ${order.name.split(' ')[0]}.` : 'Thank you.'}</h1>
                <p className="mt-4 text-lg text-ink/70 leading-relaxed">
                    {order
                        ? <>Your order reference is <strong className="text-ink">{order.ref}</strong>. Keep it for your records; we will contact you at <strong className="text-ink">{order.email}</strong>.</>
                        : 'Your order is in.'}
                </p>

                {order && (
                    <section className="mt-10 rounded-[2rem] bg-white border border-mist shadow-soft p-6 sm:p-8">
                        <h2 className="font-display font-bold text-2xl">Your order</h2>
                        <ul className="mt-5 space-y-4">
                            {order.items.map(item => {
                                const p = findProduct(item.slug);
                                if (!p) return null;
                                return (
                                    <li key={`${item.slug}-${item.sizeIndex}-${item.print}`} className="flex gap-4 items-center">
                                        <img src={imageFor(p.slug)} alt="" className="w-14 h-14 rounded-2xl object-cover bg-sage" />
                                        <span className="flex-1">
                                            <span className="block font-semibold leading-tight">{p.name}</span>
                                            <span className="block text-sm text-ink/55">{item.qty} boxes, {p.sizes[item.sizeIndex].label.toLowerCase()}, {PRINTS.find(x => x.id === item.print)?.label.toLowerCase()}</span>
                                        </span>
                                        <span className="font-semibold">{formatEUR(lineTotalFor(p, item.qty, item.sizeIndex, item.print))}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="mt-6 pt-5 border-t border-mist flex justify-between items-baseline">
                            <span className="text-ink/65">Total, excl. VAT</span>
                            <span className="font-display font-bold text-3xl">{formatEUR(order.subtotal)}</span>
                        </p>
                    </section>
                )}

                <section className="mt-10">
                    <h2 className="font-display font-bold text-2xl">What happens next</h2>
                    <ol className="mt-5 space-y-3">
                        {STEPS.map(([t, d], i) => (
                            <li key={t} className="flex gap-4 rounded-3xl bg-white border border-mist p-4">
                                <span className="grid place-items-center w-9 h-9 shrink-0 rounded-full bg-forest text-lime font-display font-bold" aria-hidden="true">{i + 1}</span>
                                <span><span className="block font-semibold">{t}</span><span className="block text-ink/65">{d}</span></span>
                            </li>
                        ))}
                    </ol>
                </section>

                <button onClick={() => go('/#catalog')} className="btn-dark mt-10 h-14 px-8 text-[17px]">Back to the catalog</button>
            </main>
        </div>
    );
};
