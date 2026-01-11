
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Lock, Star, Zap, BarChart2, BookOpen, Layers, ShieldCheck, ChevronDown, ChevronRight, X, CreditCard, FileText, Mail, Copy, AlertTriangle, Percent, Shield, TrendingUp, Sliders, RefreshCw, Workflow } from 'lucide-react';
import { PRODUCTS, TESTIMONIALS, PAIN_POINTS } from '../constants';
import { MockBackend } from '../services/mockBackend';
import { Product } from '../types';

export const LandingPage: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);

    const [buyingProduct, setBuyingProduct] = useState<Product | null>(null);
    const [showPayPal, setShowPayPal] = useState(false);
    const [showSupportPopup, setShowSupportPopup] = useState(false);

    const handleBuy = (product: Product) => {
        setBuyingProduct(product);
        setShowPayPal(true);
    };

    const closePayPal = () => {
        setShowPayPal(false);
        setBuyingProduct(null);
    }

    const completePurchase = async () => {
        if (!buyingProduct) return;
        await MockBackend.createOrder(buyingProduct.id, 'Guest User', 'guest@example.com', 'PAYPAL');
        alert(`Payment Successful! Order for ${buyingProduct.name} confirmed. Please check your email.`);
        closePayPal();
    };

    return (
        <div className="bg-dark-950 text-white overflow-hidden selection:bg-accent-cyan selection:text-black">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center px-6 pt-24 pb-12">
                {/* Background Ambient Glows */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-amber/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(66,245,227,0.1)]">
                                <Zap className="w-3 h-3 fill-current" /> Mastery in Leverage
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
                                Master Perpetual Futures with <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Institutional Precision.</span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                                Turn chaotic leverage into a structured execution playbook. Master funding rates, liquidate avoidance, and scalable systematized setups.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => handleBuy(PRODUCTS[0])}
                                className="group bg-accent-cyan text-black px-8 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(66,245,227,0.3)] hover:shadow-[0_0_30px_rgba(66,245,227,0.5)]"
                            >
                                Get the Perpetual Futures Playbook – €250
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => document.getElementById('inside')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-full font-semibold text-sm text-white border border-white/10 hover:border-accent-cyan/50 transition-all glass hover:bg-white/5 flex items-center justify-center gap-2"
                            >
                                View What’s Inside
                            </button>
                        </div>

                        <div className="flex items-center gap-6 pt-4 grayscale opacity-50">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Compatible with</span>
                            <div className="flex gap-4">
                                <span className="text-xs font-mono">BINANCE</span>
                                <span className="text-xs font-mono">BYBIT</span>
                                <span className="text-xs font-mono">OKX</span>
                                <span className="text-xs font-mono">DERIBIT</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Futures Control Panel Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="relative"
                    >
                        <div className="relative z-10 glass border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-amber/5"></div>

                            {/* Mock Status Bar */}
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse"></div>
                                    <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-tighter">Live Connection: OKX-PERP</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-1.5 rounded-full bg-white/10"></div>
                                    <div className="w-8 h-1.5 rounded-full bg-white/10"></div>
                                </div>
                            </div>

                            {/* Mock Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Mark Price</p>
                                    <p className="text-2xl font-mono text-white tracking-tighter">$42,842<span className="text-accent-cyan italic ml-1">.50</span></p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Funding Rate</p>
                                    <p className="text-2xl font-mono text-accent-amber tracking-tighter">+0.0100%</p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Open Interest</p>
                                    <p className="text-xl font-mono text-white tracking-tighter">2.4B <span className="text-[10px] text-gray-600">USD</span></p>
                                </div>
                                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">R:R Projection</p>
                                    <p className="text-xl font-mono text-accent-cyan tracking-tighter">1:4.2</p>
                                </div>
                            </div>

                            {/* Mock Chart Area */}
                            <div className="h-40 bg-black/40 rounded-2xl border border-white/5 relative overflow-hidden flex items-end p-2 gap-1 px-4">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 rounded-t-sm transition-all duration-1000 ${i > 15 ? 'bg-accent-amber animate-pulse' : 'bg-accent-cyan/40'}`}
                                        style={{ height: `${20 + Math.random() * 60}%` }}
                                    />
                                ))}
                                <div className="absolute inset-x-0 bottom-12 border-t border-accent-cyan/20 border-dashed"></div>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="h-2 w-12 bg-accent-cyan/20 rounded-full"></div>
                                    <div className="h-2 w-8 bg-accent-amber/20 rounded-full"></div>
                                </div>
                            </div>

                            {/* Glowing Accent Borders */}
                            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-accent-cyan/10 blur-[100px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity"></div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/5 rounded-3xl -z-10 rotate-12"></div>
                        <div className="absolute -top-6 -left-6 w-24 h-24 border border-accent-cyan/10 rounded-full -z-10 animate-pulse"></div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Strip */}
            <section className="border-y border-white/10 bg-black/50 backdrop-blur-md relative z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between items-center gap-8">
                    <div className="flex items-center gap-3 text-gray-400">
                        <ShieldCheck className="w-5 h-5 text-accent-cyan" />
                        <span className="text-xs font-bold uppercase tracking-widest">Built for Perpetual Futures & Swaps</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <BarChart2 className="w-5 h-5 text-accent-amber" />
                        <span className="text-xs font-bold uppercase tracking-widest">Risk-First Execution Framework</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Layers className="w-5 h-5 text-accent-cyan" />
                        <span className="text-xs font-bold uppercase tracking-widest">Includes Funding & Liquidation Playbook</span>
                    </div>
                </div>
            </section>

            {/* Section 3: Why Futures Traders Fail */}
            <section className="py-32 px-6 relative border-t border-white/5 bg-dark-950 overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 text-red-500 font-bold tracking-widest uppercase text-[10px] mb-4">
                            <AlertTriangle className="w-3 h-3" /> The Liquidation Reality
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Why <span className="text-red-500">95% of Futures Traders</span> Get Wiped Out.
                        </h2>
                        <ul className="space-y-5">
                            {PAIN_POINTS.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-gray-400 group">
                                    <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-1">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                    <span className="text-lg font-light group-hover:text-gray-200 transition-colors uppercase tracking-tight">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-black/60 rounded-3xl border border-white/10 p-2 overflow-hidden shadow-2xl">
                            {/* Simulated Liquidity Heatmap */}
                            <div className="aspect-square relative bg-[#05060B] rounded-2xl overflow-hidden p-1 grid grid-cols-10 grid-rows-10 gap-0.5 opacity-40">
                                {Array.from({ length: 100 }).map((_, i) => {
                                    const isHeat = Math.random() > 0.85;
                                    return (
                                        <div
                                            key={i}
                                            className={`rounded-[1px] transition-all duration-1000 ${isHeat ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-gray-800/20'}`}
                                        />
                                    );
                                })}
                                <div className="absolute inset-x-0 top-1/3 border-t border-red-500/30 border-dashed"></div>
                                <div className="absolute inset-x-0 bottom-1/4 border-t border-accent-cyan/30 border-dashed"></div>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="glass border border-white/10 p-6 rounded-2xl w-full max-w-sm backdrop-blur-xl shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-red-500/5 pulse"></div>
                                    <div className="flex items-center gap-3 mb-4 text-red-500">
                                        <Zap className="w-6 h-6 fill-current" />
                                        <span className="font-mono text-xs uppercase font-bold tracking-tighter">Liquidation Risk Detected</span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                        "The Perpetual Futures market is a zero-sum game of liquidity extraction. Without a mechanical playbook, YOU are the liquidity."
                                    </p>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "88%" }}
                                            transition={{ duration: 2 }}
                                            className="h-full bg-red-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 4: What This Playbook Gives You */}
            <section className="py-32 px-6 bg-dark-950 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-accent-cyan font-bold tracking-widest uppercase text-[10px] mb-4 block">The Solution</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Systematize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-white">Perpetual Edge.</span></h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Funding Rate Mastery",
                                desc: "Learn to stop paying funding burn and start collecting it or exploiting the local bias they create.",
                                icon: Percent
                            },
                            {
                                title: "Liquidity Buffer Rules",
                                desc: "Exact mechanical rules for margin isolation and stop placement based on price-action liquidity pockets.",
                                icon: Shield
                            },
                            {
                                title: "Scaling & Pyramiding",
                                desc: "A systematic approach to adding to winners while lowering the overall risk of the position.",
                                icon: TrendingUp
                            },
                            {
                                title: "Leverage Guardrails",
                                desc: "No more 'guessing' leverage. Use our 1:x formula based on volatility (ATR) and notional caps.",
                                icon: Sliders
                            },
                            {
                                title: "The Reset Protocol",
                                desc: "Mechanical steps to take after a drawdown strike or a winning streak to preserve discipline.",
                                icon: RefreshCw
                            },
                            {
                                title: "Basis Arbitrage Theory",
                                desc: "Introductory logic for market-neutral yield using the spot/perp spread for low-risk hedging.",
                                icon: Workflow
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass border border-white/5 hover:border-accent-cyan/30 p-8 rounded-3xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <benefit.icon className="w-24 h-24" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-6 group-hover:scale-110 transition-transform">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5: Perpetual System Overview (Timeline) */}
            <section className="py-32 px-6 bg-dark-950 border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-accent-cyan border-dashed opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">The Perps Playbook Workflow</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">From market analysis to post-trade review — here is your mechanical daily cycle.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {/* Horizontal progress line */}
                        <div className="hidden md:block absolute top-[2.25rem] left-[10%] right-[10%] h-px bg-white/10"></div>

                        {[
                            { step: "01", title: "Funding/Basis Scan", desc: "Identify high-funding regimes and basis divergences." },
                            { step: "02", title: "Liquidity Mapping", desc: "Define HTF support/resistance and internal liquidity pools." },
                            { step: "03", title: "Execution Trigger", desc: "Execute only when price enters the 'Execution Window' with valid triggers." },
                            { step: "04", title: "Margin Management", desc: "Active monitoring involving stop trailing and partial scaling." }
                        ].map((it, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center text-center group relative"
                            >
                                <div className="w-12 h-12 rounded-full bg-dark-950 border border-white/10 group-hover:border-accent-cyan transition-all flex items-center justify-center mb-6 relative z-10 shadow-lg">
                                    <span className="font-mono text-sm group-hover:text-accent-cyan transition-colors">{it.step}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{it.title}</h3>
                                <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed group-hover:text-gray-300 transition-colors">{it.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: What's Inside the eBook */}
            <section id="inside" className="py-32 px-6 bg-dark-950">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-accent-amber font-bold tracking-widest uppercase text-[10px] mb-4 block">The Curriculum</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Inside the Perpetual Playbook</h2>
                    </div>

                    <div className="space-y-4">
                        {PRODUCTS[0].chapters?.map((chapter, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all overflow-hidden"
                            >
                                <details className="group">
                                    <summary className="p-6 md:p-8 cursor-pointer flex justify-between items-center list-none outline-none">
                                        <div className="flex gap-6 items-center">
                                            <span className="font-mono text-2xl text-white/10 group-hover:text-accent-cyan/50 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                                            <h3 className="text-xl font-bold text-white group-hover:text-accent-cyan transition-colors tracking-tight">{chapter.title}</h3>
                                        </div>
                                        <div className="p-2 rounded-full border border-white/10 group-hover:border-accent-cyan/30 text-gray-500 group-hover:text-accent-cyan transition-all transform group-open:rotate-180">
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </summary>
                                    <div className="px-8 pb-8 pl-[4.5rem] text-gray-400 text-sm border-t border-white/5 pt-6 animate-in slide-in-from-top-2">
                                        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-3">
                                            {chapter.points.map((pt, pIdx) => (
                                                <li key={pIdx} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan/30 mt-1.5"></div>
                                                    <span className="leading-relaxed">{pt}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 py-8 border-t border-white/5 text-gray-500 text-xs font-mono uppercase tracking-widest">
                        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-cyan" /> 180+ Pages</div>
                        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-cyan" /> High-Res Charts</div>
                        <div className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-cyan" /> PDF Checklist</div>
                    </div>
                </div>
            </section>

            {/* Section 7: Visual Trading Strip (Proof of Execution) */}
            <section className="py-24 bg-dark-950 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-cyan/5 [mask-image:linear-gradient(to_right,transparent,black,transparent)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide no-scrollbar">
                        {[
                            { pair: "BTC-PERP", entry: "42,210.5", exit: "43,840.0", pnl: "+154.2%", type: "LONG" },
                            { pair: "ETH-PERP", entry: "2,240.2", exit: "2,180.5", pnl: "+24.5%", type: "SHORT" },
                            { pair: "SOL-PERP", entry: "94.20", exit: "108.40", pnl: "+110.8%", type: "LONG" },
                            { pair: "TIA-PERP", entry: "16.40", exit: "18.20", pnl: "+65.4%", type: "LONG" },
                            { pair: "ARB-PERP", entry: "2.10", exit: "1.85", pnl: "+45.2%", type: "SHORT" }
                        ].map((trade, i) => (
                            <div key={i} className="min-w-[280px] glass border border-white/10 rounded-2xl p-5 hover:border-accent-cyan/30 transition-all group">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${trade.type === 'LONG' ? 'bg-accent-cyan' : 'bg-red-500'}`}></div>
                                        <span className="font-mono text-sm font-bold text-white">{trade.pair}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${trade.type === 'LONG' ? 'bg-accent-cyan/10 text-accent-cyan' : 'bg-red-500/10 text-red-500'}`}>
                                        {trade.type}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Execution PnL</p>
                                        <p className={`text-2xl font-mono font-bold ${trade.pnl.startsWith('+') ? 'text-accent-cyan' : 'text-red-500'}`}>{trade.pnl}</p>
                                    </div>
                                    <div className="text-right text-[10px] text-gray-400 font-mono">
                                        <p>IN: {trade.entry}</p>
                                        <p>OUT: {trade.exit}</p>
                                    </div>
                                </div>
                                <div className="h-12 mt-4 flex items-end gap-0.5">
                                    {Array.from({ length: 15 }).map((_, j) => (
                                        <div
                                            key={j}
                                            className={`flex-1 ${trade.type === 'LONG' ? 'bg-accent-cyan/20' : 'bg-red-500/20'} rounded-t-sm`}
                                            style={{ height: `${20 + Math.random() * 80}%` }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 8: Testimonials */}
            <section className="py-32 px-6 bg-dark-950">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white tracking-tight">Voices of the Playbook</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="glass p-8 rounded-3xl border border-white/5 relative group"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Star className="w-12 h-12 fill-current text-accent-cyan" />
                                </div>
                                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan to-accent-amber p-px">
                                        <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-white font-bold text-xs uppercase">
                                            {t.initials}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold tracking-tight">{t.name}</p>
                                        <p className="text-[10px] text-accent-cyan uppercase tracking-widest font-mono">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 9: Pricing + Guarantee */}
            <section id="pricing" className="py-32 px-6 bg-dark-950 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="glass border border-accent-cyan/20 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 py-2 px-6 bg-accent-cyan text-black text-[10px] font-bold uppercase tracking-widest rounded-bl-2xl">
                            Most Popular Choice
                        </div>

                        <span className="text-accent-cyan font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Lifetime Access</span>
                        <h2 className="text-5xl font-bold text-white mb-2 tracking-tighter">Perpetual Futures Playbook™</h2>
                        <p className="text-gray-400 mb-8 font-light">The complete system for mastering leverage & funding.</p>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-6xl font-bold text-white tracking-tighter">€250</span>
                            <div className="text-left leading-tight">
                                <p className="text-xs text-gray-500 line-through">WAS €450</p>
                                <p className="text-xs text-accent-amber font-bold">Limited Time Offer</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-10">
                            {PRODUCTS[0].features.map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-accent-cyan/10 flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-accent-cyan" />
                                    </div>
                                    {f}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleBuy(PRODUCTS[0])}
                            className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-accent-cyan transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3"
                        >
                            Get Instant Access Now
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase font-mono tracking-widest">
                            <Lock className="w-3 h-3" /> Secure SSL Checkout
                            <div className="w-px h-3 bg-white/10"></div>
                            <CreditCard className="w-3 h-3" /> Instant PDF Delivery
                        </div>
                    </div>

                    {/* Confidence Guarantee */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 bg-accent-amber/5 border border-accent-amber/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 text-left"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center text-accent-amber shrink-0">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-white mb-1">7-Day Confidence Guarantee</h4>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                The futures market rewards confidence. If this playbook doesn’t give you 100% confidence in your system, request a full refund within 7 days.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 10: FAQ */}
            <section className="py-32 px-6 bg-dark-950 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-white tracking-tight">Common Inquiries</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { q: "Is this for crypto or traditional futures?", a: "Both. While perpetual swaps are crypto-specific, the core logic of basis, liquidity, and margin applies to both ES/NQ and BTC/ETH markets." },
                            { q: "Will I need to pay for external indicators?", a: "No. Our system is built on raw price action and exchange data (funding/OI), necessitating only a standard TradingView account." },
                            { q: "How fast will I receive the playbook?", a: "Instantly. Upon successful payment, you will be redirected to a unique, 30rd-day rolling download link." },
                            { q: "Does the playbook cover liquidation math?", a: "Extensively. We provide the manual calculations for isolated and cross margin to help you build your own risk sheets." },
                            { q: "Is there a support community included?", a: "The playbook is a standalone manual, but our support team is available via email for any content-related questions." },
                            { q: "Can I get a VAT invoice for my business?", a: "Yes. You can request a manual VAT-compliant invoice during the checkout process." }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                <h4 className="text-white font-bold mb-3 flex items-center gap-3">
                                    <span className="text-accent-cyan">?</span> {faq.q}
                                </h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 text-center bg-dark-950">
                <p className="text-gray-600 text-[10px] uppercase font-bold tracking-[0.2em]">© 2024 Perpetual Futures Playbook™</p>
                <div className="flex justify-center gap-8 mt-6">
                    <a href="#" className="text-xs text-gray-400 hover:text-accent-cyan transition-colors">Privacy</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-accent-cyan transition-colors">Terms</a>
                    <a href="#" className="text-xs text-gray-400 hover:text-accent-cyan transition-colors">Support</a>
                </div>
            </footer>

            {/* PayPal Checkout Modal */}
            <AnimatePresence>
                {showPayPal && buyingProduct && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closePayPal}
                            className="absolute inset-0 bg-dark-950/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            {/* Fake PayPal Header */}
                            <div className="bg-[#003087] p-5 flex justify-between items-center">
                                <span className="text-white font-bold italic text-xl">PayPal</span>
                                <div className="flex gap-2">
                                    <button onClick={closePayPal} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
                                </div>
                            </div>

                            <div className="p-10">
                                <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-1">Perpetual Futures Playbook™</h3>
                                        <p className="text-xs text-gray-400">Digital Item Delivery</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-3xl font-bold text-gray-900 tracking-tighter">€{buyingProduct.price.toFixed(2)}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase">EUR</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button onClick={completePurchase} className="w-full bg-[#FFC439] hover:brightness-105 text-black font-bold py-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2">
                                        Pay with <span className="font-bold italic text-[#003087]">PayPal</span>
                                    </button>
                                    <div className="relative text-center my-6">
                                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                                        <span className="relative bg-white px-3 text-[10px] text-gray-400 uppercase tracking-widest">Secure Card Payment</span>
                                    </div>
                                    <button onClick={completePurchase} className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                                        <CreditCard className="w-4 h-4" /> Debit or Credit Card
                                    </button>

                                    {/* Request Invoice Button */}
                                    <button
                                        onClick={() => setShowSupportPopup(true)}
                                        className="w-full bg-white text-gray-400 font-bold py-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all flex items-center justify-center gap-2 mt-4 text-xs"
                                    >
                                        <FileText className="w-4 h-4" /> Request VAT-Compliant Invoice
                                    </button>
                                </div>

                                <p className="text-center text-[9px] text-gray-400 mt-8 font-mono uppercase leading-relaxed">
                                    Secure checkout powered by PayPal.<br />
                                    Your payment information is encrypted.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Support Popup Modal */}
            <AnimatePresence>
                {showSupportPopup && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSupportPopup(false)}
                            className="absolute inset-0 bg-dark-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
                        >
                            <div className="w-16 h-16 bg-accent-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent-cyan">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Business Invoice</h3>
                            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                For corporate orders and manual invoicing, please send your business credentials to our support desk.
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center justify-center gap-2 mb-8 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => { navigator.clipboard.writeText('invoices@perpetualplaybook.com'); alert('Copied!') }}>
                                <code className="text-xs font-mono text-gray-800">invoices@perpetualplaybook.com</code>
                                <Copy className="w-3 h-3 text-gray-400" />
                            </div>

                            <button
                                onClick={() => setShowSupportPopup(false)}
                                className="w-full bg-black text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                            >
                                Dismiss
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
