import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Package, CreditCard, Calendar, Lock, User, CheckCircle, FileText, Mail, ArrowUpRight } from 'lucide-react';
import { Product, OrderStatus } from '../types';
import { MockBackend } from '../services/mockBackend';
import { AIRWALLEX_PAY_URL } from '../constants';

interface PurchaseModalProps {
    onClose: () => void;
    product: Product;
    initialStep?: 'PAYMENT' | 'CUSTOM_INFO';
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ onClose, product, initialStep = 'PAYMENT' }) => {
    const [step, setStep] = useState<'PAYMENT' | 'INVOICE_INFO' | 'CUSTOM_INFO'>(initialStep);
    const isCustomPlan = product.id === 'custom';

    // Lock page scroll while open (pad for the scrollbar so the page doesn't shift), close on Escape
    useEffect(() => {
        const { body } = document;
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
        body.style.overflow = 'hidden';
        if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            body.style.overflow = prev.overflow;
            body.style.paddingRight = prev.paddingRight;
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);
    const [loading, setLoading] = useState(false);

    // Card Form State
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const handleCardPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call to Stripe
        setTimeout(async () => {
            try {
                // In a real app, this is where we'd confirm with Stripe
                await MockBackend.createOrder(
                    product.id,
                    cardName,
                    "customer@example.com", // Placeholder until we add email input or get from auth
                    'STRIPE',
                    OrderStatus.COMPLETED,
                    "123 Stripe St",
                    "US"
                );

                alert("Payment received. We will email your artwork upload link shortly.");
                onClose();
            } catch (error) {
                console.error("Payment failed", error);
                alert("Payment processing failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    const handleInvoice = async () => {
        setStep('INVOICE_INFO');
    };

    // Formatters
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').substring(0, 16);
        const parts = value.match(/[\s\S]{1,4}/g) || [];
        setCardNumber(parts.join(' '));
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setExpiry(value.substring(0, 5));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-deep/80"
            role="dialog" aria-modal="true" aria-label="Checkout"
        >
            <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity' }}
                className="bg-white w-full max-w-md max-h-[92vh] overflow-y-auto rounded-[2rem] shadow-lift"
            >
                <div className="px-6 pt-6 pb-4 flex justify-between items-center">
                    <div>
                        <h3 className="font-display text-2xl font-bold text-ink">Checkout</h3>
                        <p className="text-xs text-press flex items-center gap-1 font-semibold mt-0.5"><Shield className="w-3 h-3" /> Encrypted connection</p>
                    </div>
                    <button onClick={onClose} aria-label="Close checkout" className="grid place-items-center w-10 h-10 rounded-full bg-sage hover:bg-ink hover:text-white transition-colors text-ink">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Product Summary */}
                    <div className="flex items-center gap-4 p-4 bg-sage mb-6 rounded-3xl">
                        <div className="w-14 h-14 shrink-0 bg-forest rounded-2xl flex items-center justify-center">
                            <Package className="w-7 h-7 text-lime" />
                        </div>
                        <div>
                            <h4 className="font-bold text-ink">{product.name}</h4>
                            <p className="text-sm text-ink/60 mb-1">{product.quantity || product.tagline}</p>
                            {isCustomPlan
                                ? <span className="font-display font-bold text-press">Priced for your order</span>
                                : <><span className="font-display font-bold text-lg text-ink">€{product.price}</span> <span className="text-xs text-ink/50">excl. VAT</span></>}
                        </div>
                    </div>

                    {step === 'PAYMENT' ? (
                        <div className="space-y-4">
                            <form onSubmit={handleCardPayment} className="space-y-4">
                                {/* Name on Card */}
                                <div>
                                    <label className="block text-sm font-medium text-ink/70 mb-1.5">Name on Card</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-paper border border-mist rounded-2xl focus:outline-none focus:border-press focus:bg-white transition-colors font-medium text-ink placeholder:text-ink/30"
                                        />
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-sm font-medium text-ink/70 mb-1.5">Card Number</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="0000 0000 0000 0000"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            className="w-full pl-10 pr-4 py-3 bg-paper border border-mist rounded-2xl focus:outline-none focus:border-press focus:bg-white transition-colors font-medium text-ink placeholder:text-ink/30 font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Expiry */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink/70 mb-1.5">Expiry</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={handleExpiryChange}
                                                maxLength={5}
                                                className="w-full pl-10 pr-4 py-3 bg-paper border border-mist rounded-2xl focus:outline-none focus:border-press focus:bg-white transition-colors font-medium text-ink placeholder:text-ink/30 font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* CVC */}
                                    <div>
                                        <label className="block text-sm font-medium text-ink/70 mb-1.5">CVC</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="123"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                                maxLength={4}
                                                className="w-full pl-10 pr-4 py-3 bg-paper border border-mist rounded-2xl focus:outline-none focus:border-press focus:bg-white transition-colors font-medium text-ink placeholder:text-ink/30 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-full bg-forest text-white font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>Processing...</>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" /> Pay €{product.price}
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-board"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-3 text-ink/50 font-medium normal-case text-sm">or</span>
                                </div>
                            </div>

                            <button
                                onClick={handleInvoice}
                                disabled={loading}
                                className="w-full py-4 rounded-full bg-sage text-ink font-semibold hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <img src="/assets/paypal.png" alt="PayPal" className="h-5 w-auto" /> Request Invoice (B2B)
                            </button>

                            <button
                                onClick={() => setStep('CUSTOM_INFO')}
                                disabled={loading}
                                className="w-full py-4 rounded-full bg-sage text-ink font-semibold hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText className="w-5 h-5" /> Custom
                            </button>
                            <p className="text-center text-sm text-ink/55 -mt-1">Have a custom quote? Pay it online, or request one by email.</p>
                            <p className="text-center text-xs text-ink/55 leading-relaxed">
                                By paying, you agree to our{' '}
                                <a href="/user-agreement" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-press">User Agreement</a>{' '}and{' '}
                                <a href="/refund-policy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-press">Refund Policy</a>.
                            </p>
                        </div>
                    ) : step === 'CUSTOM_INFO' ? (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-7 h-7 text-lime" />
                            </div>
                            <h4 className="font-display text-2xl font-bold text-ink mb-2">Pay for your custom order</h4>
                            <p className="text-ink/70 mb-6 px-2 leading-relaxed">
                                Already have a quote from us? Pay it securely online. The payment page opens in a new window.
                            </p>
                            <a
                                href={AIRWALLEX_PAY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 rounded-full bg-forest text-white p-2 pl-2.5 mb-3 text-left transition-colors hover:bg-ink"
                            >
                                <span className="grid place-items-center w-11 h-11 rounded-full bg-white">
                                    <img src="/assets/pay/airwallex.png" alt="" className="h-5 w-auto" />
                                </span>
                                <span className="flex-1">
                                    <span className="block font-semibold leading-tight">Pay your custom order</span>
                                    <span className="block text-sm text-white/65 leading-tight">Secure payment via Airwallex</span>
                                </span>
                                <span className="grid place-items-center w-11 h-11 rounded-full bg-lime text-ink transition-transform group-hover:rotate-45">
                                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                                </span>
                            </a>
                            <p className="text-sm text-ink/55 mt-5 mb-3">No quote yet? Tell us what you need.</p>
                            <a
                                href={`mailto:info@garsabers.com?subject=${encodeURIComponent(isCustomPlan ? 'Custom invoice request' : `Custom invoice: ${product.name} (€${product.price})`)}&body=${encodeURIComponent(`Hello,\n\n${isCustomPlan ? 'Please send a quote and custom invoice for this order:\n\nBox style:\nQuantity:\nSize:\nPrint and finishes:' : `Please issue a custom invoice for the ${product.name} (${product.quantity || ''}, €${product.price} excl. VAT).`}\n\nCompany name:\nBilling address:\nVAT number:\n\nThank you`)}`}
                                className="group flex items-center gap-4 rounded-full bg-sage text-ink p-2 pl-6 mb-5 text-left transition-colors hover:bg-mist"
                            >
                                <span className="flex-1">
                                    <span className="block font-semibold leading-tight">Request a quote by email</span>
                                    <span className="block text-sm text-ink/55 leading-tight">info@garsabers.com</span>
                                </span>
                                <span className="grid place-items-center w-11 h-11 rounded-full bg-white text-ink transition-transform group-hover:rotate-12">
                                    <Mail className="w-5 h-5" aria-hidden="true" />
                                </span>
                            </a>
                            <p className="text-center text-xs text-ink/55 leading-relaxed mb-5">
                                By paying, you agree to our{' '}
                                <a href="/user-agreement" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-press">User Agreement</a>{' '}and{' '}
                                <a href="/refund-policy" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-press">Refund Policy</a>.
                            </p>
                            <button
                                onClick={() => (isCustomPlan ? onClose() : setStep('PAYMENT'))}
                                className="w-full py-4 rounded-full bg-sage text-ink font-semibold hover:bg-ink hover:text-white transition-colors"
                            >
                                {isCustomPlan ? 'Close' : 'Back to payment options'}
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-6">
                                <img src="/assets/paypal.png" alt="PayPal" className="h-8 w-auto" />
                            </div>
                            <h4 className="font-display text-2xl font-bold text-ink mb-2">Request a PayPal invoice</h4>
                            <p className="text-ink/70 mb-6 px-2 leading-relaxed">
                                For company orders that need an invoice first, email us with your company details and the print run you chose. We will reply with a PayPal invoice for your order.
                            </p>
                            <div className="p-4 bg-sage rounded-3xl mb-6">
                                <span className="block text-sm text-ink/60 mb-1">Email</span>
                                <span className="font-semibold text-press select-all">info@garsabers.com</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 rounded-full bg-ink text-white font-semibold hover:bg-forest transition-colors"
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
