import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle, CreditCard, Lock, ShieldCheck, Truck, Wallet } from 'lucide-react';
import { COUNTRIES, API_BASE } from '../../constants';
import { findProduct, formatEUR, imageFor, lineTotalFor, PRINTS, unitPriceFor } from '../../catalog';
import { ShopHeader } from './ShopHeader';
import { Link, useNav } from './nav';
import { useCart } from './cart';

const field = 'w-full h-12 px-4 bg-paper border border-mist rounded-2xl placeholder:text-ink/30 focus:outline-none focus:border-press focus:bg-white transition-colors';
const label = 'block text-sm font-medium text-ink/70 mb-1.5';

const CARD_FEE_RATE = 0.04;
const INSURANCE = 7.99;
const ORDER_KEY = 'garsabers_last_order';

const Step: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
    <section className="rounded-[2rem] bg-white border border-mist shadow-soft p-6 sm:p-8">
        <h2 className="flex items-center gap-3 font-display font-bold text-2xl">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-forest text-lime text-base" aria-hidden="true">{n}</span>
            {title}
        </h2>
        <div className="mt-6">{children}</div>
    </section>
);

const Method: React.FC<{
    value: string; current: string; onPick: (v: string) => void;
    title: string; note: string; icons: string[]; disabled?: boolean;
}> = ({ value, current, onPick, title, note, icons, disabled }) => (
    <label className={`flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-colors ${current === value ? 'border-press bg-paper' : 'border-mist hover:border-press/40'} ${disabled ? 'opacity-60' : ''}`}>
        <input type="radio" name="pay" value={value} checked={current === value} disabled={disabled} onChange={() => onPick(value)} className="mt-1 w-4 h-4 accent-press" />
        <span className="flex-1">
            <span className="block font-medium">{title}</span>
            <span className="block text-sm text-ink/55 mt-0.5">{note}</span>
            <span className="flex items-center gap-1.5 mt-2.5">
                {icons.map(i => <span key={i} className="grid place-items-center w-10 h-7 rounded-md bg-white border border-mist"><img src={`/assets/pay/${i}`} alt="" className="max-h-4 max-w-[1.6rem]" /></span>)}
            </span>
        </span>
    </label>
);

export const CheckoutPage: React.FC = () => {
    const { items, subtotal, clear } = useCart();
    const go = useNav();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [method, setMethod] = useState('card');
    const [insurance, setInsurance] = useState(false);
    const [f, setF] = useState({ email: '', phone: '', name: '', company: '', address: '', city: '', postcode: '', country: 'United Kingdom', notes: '' });

    useEffect(() => {
        document.title = 'Checkout | Garsabers';
        return () => { document.title = 'Garsabers | Custom logo-printed boxes'; };
    }, []);

    /* Came back from the card page: put the details back instead of asking for
       them twice. */
    useEffect(() => {
        if (!new URLSearchParams(location.search).get('resume')) return;
        try {
            const raw = JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null');
            if (raw?.form) { setF(prev => ({ ...prev, ...raw.form })); setError(''); }
            if (raw?.insurance) setInsurance(true);
        } catch { /* best effort */ }
    }, []);

    const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF(prev => ({ ...prev, [k]: e.target.value }));

    const fee = useMemo(() => Math.round(subtotal * CARD_FEE_RATE * 100) / 100, [subtotal]);
    const total = useMemo(() => Math.round((subtotal + (method === 'bank_transfer' ? 0 : fee) + (insurance ? INSURANCE : 0)) * 100) / 100, [subtotal, fee, insurance, method]);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const ref = 'GB-' + Date.now().toString(36).toUpperCase().slice(-6) + Math.random().toString(36).slice(2, 4).toUpperCase();
        const lines = items.flatMap(item => {
            const p = findProduct(item.slug);
            if (!p) return [];
            return [{
                code: p.code,
                size: p.sizes[item.sizeIndex].label,
                print: PRINTS.find(x => x.id === item.print)?.id === 'full' ? 'FC' : '1C',
                qty: item.qty,
                unit_amount: Math.round(unitPriceFor(p, item.qty, item.sizeIndex, item.print) * 100),
            }];
        });

        try {
            sessionStorage.setItem(ORDER_KEY, JSON.stringify({
                ref, form: f, insurance, method,
                items, subtotal, total,
                placedAt: new Date().toISOString(),
            }));
        } catch { /* storage may be blocked */ }

        if (method === 'bank_transfer') {
            clear();
            go(`/order-confirmed?ref=${ref}&method=bank`);
            return;
        }

        try {
            const r = await fetch(`${API_BASE}/stripe/create-session-lines`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    ref, email: f.email, items: lines, shipping: 0, insurance,
                }),
            });
            const j = await r.json().catch(() => ({}));
            if (!r.ok || !j.url) throw new Error(j.message || 'Could not start the card payment.');
            window.location.href = j.url;
        } catch (err: any) {
            setError(err?.message || 'Could not start the card payment.');
            setLoading(false);
        }
    };

    if (items.length === 0 && !loading) {
        return (
            <div className="min-h-screen bg-paper">
                <ShopHeader minimal />
                <main className="max-w-3xl mx-auto px-4 py-28 text-center">
                    <h1 className="h-display text-5xl">Your cart is empty.</h1>
                    <p className="mt-4 text-lg text-ink/65">Add a box from the catalog and come back to check out.</p>
                    <button onClick={() => go('/#catalog')} className="btn-dark mt-8 h-12 px-6">Browse the catalog</button>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper">
            <ShopHeader minimal />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20">
                <h1 className="h-display text-5xl sm:text-6xl">Checkout</h1>
                <p className="mt-3 flex items-center gap-2 text-ink/65"><ShieldCheck className="w-5 h-5 text-press" aria-hidden="true" /> Encrypted connection. Nothing is printed until you approve your proof.</p>

                <form onSubmit={submit} className="mt-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    <div className="lg:col-span-7 space-y-5">
                        <Step n={1} title="Contact">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={label} htmlFor="co-email">Email</label>
                                    <input id="co-email" type="email" required autoComplete="email" value={f.email} onChange={set('email')} placeholder="you@company.com" className={field} />
                                </div>
                                <div>
                                    <label className={label} htmlFor="co-phone">Phone <span className="text-ink/40">(optional)</span></label>
                                    <input id="co-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="+44 20 7946 0000" className={field} />
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-ink/55">We send your artwork upload link and proof to this email.</p>
                        </Step>

                        <Step n={2} title="Delivery">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={label} htmlFor="co-name">Full name</label>
                                    <input id="co-name" required autoComplete="name" value={f.name} onChange={set('name')} className={field} />
                                </div>
                                <div>
                                    <label className={label} htmlFor="co-company">Company <span className="text-ink/40">(optional)</span></label>
                                    <input id="co-company" autoComplete="organization" value={f.company} onChange={set('company')} className={field} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={label} htmlFor="co-address">Address</label>
                                    <input id="co-address" required autoComplete="street-address" value={f.address} onChange={set('address')} placeholder="Street and number" className={field} />
                                </div>
                                <div>
                                    <label className={label} htmlFor="co-city">City</label>
                                    <input id="co-city" required autoComplete="address-level2" value={f.city} onChange={set('city')} className={field} />
                                </div>
                                <div>
                                    <label className={label} htmlFor="co-postcode">Postcode</label>
                                    <input id="co-postcode" required autoComplete="postal-code" value={f.postcode} onChange={set('postcode')} className={field} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={label} htmlFor="co-country">Country</label>
                                    <select id="co-country" required autoComplete="country-name" value={f.country} onChange={set('country')} className={field}>
                                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={label} htmlFor="co-notes">Order notes <span className="text-ink/40">(optional)</span></label>
                                    <textarea id="co-notes" rows={2} value={f.notes} onChange={set('notes')} placeholder="Brand colours, deadline, anything we should know" className={`${field} h-auto py-3`} />
                                </div>
                            </div>
                        </Step>

                        <Step n={3} title="Payment">
                            <div className="space-y-3">
                                <Method value="card" current={method} onPick={setMethod}
                                    title="Pay with card" note="You are redirected to our payment provider to pay securely, then brought straight back."
                                    icons={['visa.svg', 'mastercard.svg', 'amex.svg']} />
                                <Method value="wallet" current={method} onPick={setMethod}
                                    title="Apple Pay / Google Pay" note="Use the wallet on your device — no card details typed."
                                    icons={[]} />
                                <Method value="bank_transfer" current={method} onPick={setMethod}
                                    title="Direct bank transfer" note="We email the invoice and bank details; printing starts when it clears."
                                    icons={[]} />
                            </div>
                            {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
                        </Step>
                    </div>

                    <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-[2rem] bg-forest text-white p-6 sm:p-8">
                        <h2 className="font-display font-bold text-2xl">Order summary</h2>
                        <ul className="mt-6 space-y-4">
                            {items.map(item => {
                                const p = findProduct(item.slug);
                                if (!p) return null;
                                return (
                                    <li key={`${item.slug}-${item.sizeIndex}-${item.print}`} className="flex gap-4">
                                        <span className="relative shrink-0">
                                            <img src={imageFor(p.slug)} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                                        </span>
                                        <span className="flex-1 min-w-0">
                                            <span className="block font-semibold leading-tight">{p.name}</span>
                                            <span className="block text-sm text-white/65">{item.qty} boxes, {p.sizes[item.sizeIndex].label.toLowerCase()}, {PRINTS.find(x => x.id === item.print)?.label.toLowerCase()}</span>
                                        </span>
                                        <span className="font-semibold">{formatEUR(lineTotalFor(p, item.qty, item.sizeIndex, item.print))}</span>
                                    </li>
                                );
                            })}
                        </ul>

                        <dl className="mt-6 pt-6 border-t border-white/15 space-y-2.5">
                            <div className="flex justify-between"><dt className="text-white/70">Subtotal</dt><dd>{formatEUR(subtotal)}</dd></div>
                            <div className="flex justify-between"><dt className="text-white/70">Delivery</dt><dd className="text-white/70">Confirmed with your proof</dd></div>
                            {method !== 'bank_transfer' && (
                                <div className="flex justify-between"><dt className="text-white/70">Card fee (4%)</dt><dd>{formatEUR(fee)}</dd></div>
                            )}
                            <label className="flex items-center gap-3 pt-3 border-t border-white/15 cursor-pointer text-sm text-white/75">
                                <input type="checkbox" checked={insurance} onChange={e => setInsurance(e.target.checked)} className="w-4 h-4 accent-lime" />
                                <span className="flex-1">Delivery parcel insurance (optional)</span>
                                <span className="text-white">{formatEUR(INSURANCE)}</span>
                            </label>
                            <div className="flex justify-between items-baseline pt-4 mt-2 border-t border-white/15">
                                <dt className="font-semibold">Total <span className="font-normal text-white/60">excl. VAT</span></dt>
                                <dd className="font-display font-bold text-4xl tracking-[-0.03em]">{formatEUR(total)}</dd>
                            </div>
                        </dl>

                        <button type="submit" disabled={loading} className="btn-lime mt-7 w-full h-14 text-[17px] disabled:opacity-70 disabled:cursor-wait">
                            {loading
                                ? <span className="w-5 h-5 border-2 border-ink/30 border-t-ink rounded-full animate-spin" aria-label="Processing" />
                                : <><CheckCircle className="w-5 h-5" aria-hidden="true" /> Pay {formatEUR(total)}</>}
                        </button>
                        <p className="mt-4 text-center text-xs text-white/55 leading-relaxed">
                            By paying, you agree to our{' '}
                            <a href="/user-agreement" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-lime">User Agreement</a>{' '}and{' '}
                            <a href="/refund-policy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-lime">Refund Policy</a>.
                        </p>
                        <p className="mt-3 text-center text-sm"><Link to="/#catalog" className="text-white/70 underline underline-offset-4 hover:text-lime">Keep shopping</Link></p>
                    </aside>
                </form>
            </main>
        </div>
    );
};
