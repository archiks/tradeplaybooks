import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Check, BookOpen, BarChart2, Shield,
    TrendingUp, Activity, Layers, Star, Download,
    ChevronDown, ChevronUp, Clock, Book, X, CreditCard, FileText, Loader2, Globe
} from 'lucide-react';
import { PRODUCTS, COUNTRIES } from '../constants';
import { MockBackend } from '../services/mockBackend';
import { Product, OrderStatus, PayPalSettings } from '../types';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const LandingPage: React.FC = () => {
    const [isBuying, setIsBuying] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleBuy = async (p: Product) => {
        setSelectedProduct(p);
        setShowPurchaseModal(true);
    };

    return (
        <div className="bg-black text-white font-sans relative min-h-screen selection:bg-brand-teal selection:text-black">
            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-black">
                {/* Ambient Background */}
                <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-purple/20 via-black to-black pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_10px_rgba(20,241,149,0.5)]" />
                            <span className="text-xs font-bold tracking-wide uppercase text-slate-300">New: Stocks & Crypto Edition</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                        >
                            One Playbook for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Stocks & Crypto</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-400 max-w-lg leading-relaxed"
                        >
                            Stop switching strategies. Build a unified, rules-based trading system that works across both traditional equity markets and digital assets.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={() => handleBuy(PRODUCTS[0])}
                                disabled={isBuying}
                                className="px-8 py-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-[0_0_20px_rgba(153,69,255,0.3)] flex items-center justify-center gap-2"
                            >
                                {isBuying ? 'Processing...' : 'Get the Trade Playbook – €250'} <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                                See What's Inside
                            </button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm text-slate-500 font-medium"
                        >
                            <span className="text-brand-teal">✓</span> Instant digital access • <span className="text-brand-teal">✓</span> Lifetime updates
                        </motion.p>
                    </div>

                    {/* Right Content - Dual Illustration */}
                    <div className="relative z-10 hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Background Blurs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-[100px]" />

                            {/* Stocks Card (Top Left) */}
                            <motion.div
                                initial={{ opacity: 0, x: -20, y: 20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-10 left-0 w-[320px] bg-[#0F0F12] rounded-2xl shadow-2xl border border-white/10 p-6 z-20 backdrop-blur-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 text-white flex items-center justify-center font-bold text-xs border border-white/10">SPY</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">S&P 500 ETF</div>
                                            <div className="text-xs text-slate-500">Equity Index</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-brand-teal">+1.24%</div>
                                        <div className="text-xs text-slate-500">Session</div>
                                    </div>
                                </div>
                                {/* Fake Chart Line */}
                                <div className="h-16 w-full flex items-end gap-1">
                                    {[40, 45, 30, 50, 65, 55, 70, 85].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-white/10 rounded-sm" />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Crypto Card (Bottom Right) */}
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: -20 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-20 right-0 w-[320px] bg-[#0F0F12] rounded-2xl shadow-2xl border border-white/10 p-6 z-10 backdrop-blur-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-xs border border-brand-purple/20">SOL</div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Solana</div>
                                            <div className="text-xs text-slate-500">Crypto Asset</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-brand-teal">+5.82%</div>
                                        <div className="text-xs text-slate-500">24h</div>
                                    </div>
                                </div>
                                {/* Fake Chart Line */}
                                <div className="h-16 w-full flex items-end gap-1">
                                    {[20, 35, 45, 40, 60, 75, 65, 90].map((h, i) => (
                                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-brand-teal/20 rounded-sm" />
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SNAPSHOT BAR */}
            <section className="bg-white/5 border-y border-white/10 py-8 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 text-slate-400">
                    <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-brand-purple" />
                        <span className="font-medium text-sm text-slate-300">Unified Market Framework</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-brand-teal" />
                        <span className="font-medium text-sm text-slate-300">Risk-First Execution</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-brand-purple" />
                        <span className="font-medium text-sm text-slate-300">Digital Playbooks (PDF)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-brand-teal" />
                        <span className="font-medium text-sm text-slate-300">Volatility & Trend Systems</span>
                    </div>
                </div>
            </section>

            {/* 3. PROBLEM SECTION */}
            <section className="py-24 bg-black relative">
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">The Problem with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Trading Separately</span></h2>
                        <p className="text-lg text-slate-400 leading-relaxed mb-6">
                            Most traders treat stocks and crypto as completely different worlds. They use one set of rules for slow-moving equities and throw them out the window for high-speed crypto markets.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            This leads to fragmented thinking, inconsistent risk management, and the inability to capitalize on opportunities when one market cools off and the other heats up. You need a <strong>unified system</strong>.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { title: 'Random setups from social media', desc: 'Chasing hype instead of structure.' },
                            { title: 'No clear risk model', desc: 'Blowing up accounts when switching volatility profiles.' },
                            { title: 'Overtrading', desc: 'Getting chopped up in range-bound crypto markets.' },
                            { title: 'Missing Playbooks', desc: 'No repeatable process for entries and exits.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl border border-white/5 shadow-sm bg-white/5 hover:border-brand-teal/30 transition-colors">
                                <div className="w-1 bg-gradient-to-b from-brand-purple to-brand-teal rounded-full" />
                                <div>
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. BENEFITS GRID */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/5 via-black to-black pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">What <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Trade Playbooks™</span> Gives You</h2>
                        <p className="text-slate-400">A complete professional infrastructure for your trading business.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: Layers, title: "Unified Framework", desc: "One core logic applied to both legacy and digital markets." },
                            { icon: TrendingUp, title: "Trend & Range Layouts", desc: "Specific playbooks for different market conditions." },
                            { icon: Shield, title: "Risk Engine", desc: "Position sizing models tailored for different volatility tiers." },
                            { icon: Check, title: "Execution Checklists", desc: "Step-by-step rules to validate every trade before entry." },
                            { icon: Book, title: "Review Templates", desc: "Structured journaling to track performance and psychology." },
                            { icon: BarChart2, title: "Portfolio Logic", desc: "How to structure a watchlist and manage exposure." }
                        ].map((Card, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-2xl shadow-sm border border-white/10 hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(153,69,255,0.1)] transition-all duration-300 backdrop-blur-sm group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-purple/20 transition-colors">
                                    <Card.icon className="w-6 h-6 text-brand-purple group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{Card.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{Card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. STOCKS VS CRYPTO SPLIT */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Stocks Panel */}
                        <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-purple/30 transition-colors">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-purple rounded-full" />
                                Stocks Playbooks
                            </h3>
                            <ul className="space-y-4">
                                {['Swing Setups (2-5 Days)', 'Earnings Gap Plays', 'Momentum Breakouts', 'Position Trading'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-brand-purple/20 flex items-center justify-center text-xs font-bold text-brand-purple">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Crypto Panel */}
                        <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-teal/30 transition-colors">
                            <h3 className="text-2xl font-bold text-brand-teal mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-teal rounded-full" />
                                Crypto Playbooks
                            </h3>
                            <ul className="space-y-4">
                                {['Volatility Expansions', 'BTC/ETH Core Strategies', 'Altcoin Rotation Logic', 'Risk Caps & Drawdown Limits'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center text-xs font-bold text-brand-teal">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. MODULE VIEW (TIMELINE) */}
            <section className="py-24 bg-[#0F0F12] text-white relative overflow-hidden border-y border-white/5">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-teal/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Inside the Book</span></h2>
                        <p className="text-slate-400">A structured curriculum from foundations to mastery.</p>
                    </div>

                    <div className="space-y-8">
                        {[
                            { num: "01", title: "Building a Unified Market Framework", points: "Understanding market phases, liquidity, and timeframes." },
                            { num: "02", title: "Risk, Position Sizing & Drawdown", points: "The mathematical edge. How to not blow up." },
                            { num: "03", title: "Stocks Playbooks: Execution", points: "Detailed setups for SP500 names and small caps." },
                            { num: "04", title: "Crypto Playbooks: Volatility", points: "Navigating 24/7 markets and extreme variance." },
                            { num: "05", title: "Workflow & Routine", points: "Daily checklists, weekend reviews, and preparation." },
                            { num: "06", title: "Review, Iteration & Scaling", points: "How to journal and improve month over month." }
                        ].map((module, i) => (
                            <div key={i} className="flex gap-6 group hover:bg-white/5 p-6 rounded-2xl transition-colors border border-transparent hover:border-brand-purple/20">
                                <div className="text-3xl font-bold text-brand-purple opacity-50 font-serif">{module.num}</div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2 group-hover:text-brand-purple transition-colors">{module.title}</h4>
                                    <p className="text-slate-400">{module.points}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. PREVIEW STRIP */}
            <section className="py-24 bg-black overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 text-center mb-12">
                    <h2 className="text-3xl font-bold text-white"><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Visual Strategies.</span> No Fluff.</h2>
                </div>

                {/* Helper for infinite scroll logic would go here, static for now */}
                <div className="flex justify-center gap-8 overflow-hidden px-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="w-[300px] h-[400px] bg-white/5 shadow-xl rounded-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-500 backdrop-blur-sm">
                            <div className="w-16 h-1 bg-white/10 mb-8" />
                            <div className="w-full h-32 bg-white/5 rounded-lg mb-6 flex items-center justify-center border border-white/5">
                                <Activity className="text-slate-600 w-12 h-12" />
                            </div>
                            <h5 className="font-bold text-brand-purple uppercase tracking-widest text-xs mb-2">Playbook {item}</h5>
                            <div className="w-24 h-1 bg-brand-teal" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. PRICING */}
            <section className="py-24 bg-black relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Path to Mastery</span></h2>
                        <p className="text-slate-400">Select the level of support that fits your needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {PRODUCTS.map((p, idx) => (
                            <div key={p.id} className={`bg-[#0F0F12] rounded-2xl shadow-xl border overflow-hidden relative flex flex-col ${idx === 3 ? 'border-brand-teal shadow-[0_0_20px_rgba(20,241,149,0.1)]' : 'border-white/10'}`}>
                                {idx === 3 && (
                                    <div className="absolute top-0 w-full h-1 bg-brand-teal" />
                                )}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                                    <p className="text-xs text-slate-400 mb-6 h-10">{p.tagline}</p>

                                    <div className="flex items-baseline gap-1 mb-8">
                                        <span className="text-3xl font-bold text-white">€{p.price}</span>
                                        <span className="text-xs text-slate-500">/ one-time</span>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {p.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                                <Check className={`w-4 h-4 mt-1 shrink-0 ${idx === 3 ? 'text-brand-teal' : 'text-brand-purple'}`} />
                                                <span className="leading-tight">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleBuy(p)}
                                        className={`w-full py-3 font-bold rounded-xl text-sm transition-all shadow-lg ${idx === 3
                                            ? 'bg-brand-teal text-black hover:opacity-90 shadow-[0_0_15px_rgba(20,241,149,0.3)]'
                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'
                                            }`}
                                    >
                                        {idx === 3 ? 'Get Instant Access' : 'Book Now'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. FAQ */}
            <section className="py-24 bg-black">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">Asked Questions</span></h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is this for beginners?", a: "It assumes you know basic chart mechanics (candles, support/resistance). We focus on strategy and systems." },
                            { q: "Do I need to trade both stocks and crypto?", a: "No. The system works for either, but we show you how they can complement each other." },
                            { q: "Is this a course or video series?", a: "This is a comprehensive text-based Playbook (PDF format). No fluff videos to watch." },
                            { q: "How are updates delivered?", a: "You will receive an email whenever we release a new version of the Playbook." }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white/5 rounded-xl border border-white/10 open:border-brand-purple/50 transition-colors">
                                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white hover:text-brand-purple transition-colors">
                                    {item.q}
                                    <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-black border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="font-serif font-bold text-xl text-white mb-4">Trade Playbooks™</p>
                    <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Trade Playbooks. All rights reserved.</p>
                </div>
            </footer>
            {/* PURCHASE MODAL */}
            <AnimatePresence>
                {showPurchaseModal && selectedProduct && (
                    <PurchaseModal onClose={() => setShowPurchaseModal(false)} product={selectedProduct} />
                )}
            </AnimatePresence>
        </div>
    );
};

const PurchaseModal: React.FC<{ onClose: () => void, product: Product }> = ({ onClose, product }) => {
    const [step, setStep] = useState<'PAYMENT' | 'INVOICE_INFO'>('PAYMENT');
    const [loading, setLoading] = useState(false);

    const [ppSettings, setPPSettings] = useState<PayPalSettings | null>(null);

    useEffect(() => {
        MockBackend.getPayPalSettings().then(setPPSettings);
    }, []);

    const handlePayPalApprove = async (data: any, actions: any) => {
        setLoading(true);
        try {
            // Capture the funds from the transaction
            const details = await actions.order.capture();

            // Create pending order in our system
            await MockBackend.createOrder(
                product.id,
                details.payer.name.given_name + ' ' + details.payer.name.surname,
                details.payer.email_address,
                'PAYPAL',
                OrderStatus.COMPLETED,
                details.purchase_units[0].shipping?.address?.address_line_1,
                details.purchase_units[0].shipping?.address?.country_code
            );
            alert("PayPal Payment Successful! Please check your email for the download link.");
            onClose();
        } catch (e) {
            console.error(e);
            alert("Payment failed or was cancelled.");
        } finally {
            setLoading(false);
        }
    };

    const handleInvoice = async () => {
        setStep('INVOICE_INFO');
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#0F0F12] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/10"
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div>
                        <h3 className="text-xl font-bold text-white">Secure Checkout</h3>
                        <p className="text-xs text-brand-teal flex items-center gap-1"><Shield className="w-3 h-3" /> Encrypted & Safe</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 font-bold">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Product Summary */}
                    <div className="flex gap-4 p-4 bg-white/5 rounded-xl mb-6 border border-white/10">
                        <div className="w-16 h-20 bg-black/50 border border-white/10 rounded-lg flex items-center justify-center shadow-sm">
                            <Book className="w-8 h-8 text-brand-purple" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{product.name}</h4>
                            <p className="text-xs text-slate-400 mb-2">{product.tagline}</p>
                            <span className="font-bold text-brand-teal">€{product.price}</span>
                        </div>
                    </div>

                    {step === 'PAYMENT' ? (
                        <div className="space-y-3">

                            {/* Real PayPal Button */}
                            {ppSettings && ppSettings.enabled ? (
                                <div className="w-full z-0 relative">
                                    <PayPalScriptProvider options={{
                                        clientId: ppSettings.clientId,
                                        currency: "EUR",
                                        intent: "capture"
                                    }}>
                                        <PayPalButtons
                                            style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                            createOrder={async (data, actions) => {
                                                try {
                                                    return await actions.order.create({
                                                        intent: "CAPTURE",
                                                        purchase_units: [
                                                            {
                                                                description: product.name,
                                                                amount: {
                                                                    value: product.price.toString(),
                                                                    currency_code: "EUR"
                                                                }
                                                            }
                                                        ]
                                                    });
                                                } catch (err: any) {
                                                    console.error("Create Order Error:", err);
                                                    alert("Could not initiate PayPal payment: " + (err.message || JSON.stringify(err)));
                                                    throw err;
                                                }
                                            }}
                                            onApprove={handlePayPalApprove}
                                            onError={(err: any) => {
                                                console.error("PayPal Error:", err);
                                                // Show the actual error message or object
                                                const msg = err?.message || err?.toString() || "Unknown error";
                                                alert("PayPal Error: " + msg + "\n\nPlease try again or contact support.");
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            ) : (
                                <div className="text-center text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                    PayPal is currently unavailable.
                                </div>
                            )}

                            <button
                                onClick={handleInvoice}
                                disabled={loading}
                                className="w-full py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <FileText className="w-5 h-5" /> Pay via Invoice (B2B)
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-8 h-8 text-brand-teal" />
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Request an Invoice</h4>
                            <p className="text-sm text-slate-400 mb-6 px-4">
                                For corporate orders and B2B invoicing, please contact our support team directly. We will process your order manually.
                            </p>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                                <span className="block text-xs text-slate-400 uppercase font-bold mb-1">Contact Email</span>
                                <span className="font-mono text-brand-teal font-bold select-all">info@tradeplaybooks.com</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-brand-purple text-white font-bold rounded-xl hover:bg-brand-purple/90 transition-all shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};
