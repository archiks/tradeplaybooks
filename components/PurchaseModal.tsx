import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Package, CreditCard, Calendar, Lock, User, CheckCircle } from 'lucide-react';
import { Product, OrderStatus } from '../types';
import { MockBackend } from '../services/mockBackend';

interface PurchaseModalProps {
    onClose: () => void;
    product: Product;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ onClose, product }) => {
    const [step, setStep] = useState<'PAYMENT' | 'INVOICE_INFO'>('PAYMENT');
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm"
            role="dialog" aria-modal="true" aria-label="Checkout"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white w-full max-w-md max-h-[92vh] overflow-y-auto border-[1.5px] border-ink"
            >
                <div className="p-6 border-b border-board flex justify-between items-center bg-paper">
                    <div>
                        <h3 className="font-wide text-xl font-extrabold text-ink">Checkout</h3>
                        <p className="text-xs text-press flex items-center gap-1 font-semibold mt-0.5"><Shield className="w-3 h-3" /> Encrypted connection</p>
                    </div>
                    <button onClick={onClose} aria-label="Close checkout" className="p-2 hover:bg-board transition-colors text-ink/60">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Product Summary */}
                    <div className="flex gap-4 p-4 bg-paper mb-6 border border-board">
                        <div className="w-16 h-16 shrink-0 bg-press flex items-center justify-center">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h4 className="font-bold text-ink">{product.name}</h4>
                            <p className="text-sm text-ink/60 mb-1">{product.quantity || product.tagline}</p>
                            <span className="font-wide font-extrabold text-press">€{product.price}</span> <span className="text-xs text-ink/50">excl. VAT</span>
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
                                            className="w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-ink/25  focus:outline-none focus:border-press font-medium text-ink placeholder:text-ink/30"
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
                                            className="w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-ink/25  focus:outline-none focus:border-press font-medium text-ink placeholder:text-ink/30 font-mono"
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
                                                className="w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-ink/25  focus:outline-none focus:border-press font-medium text-ink placeholder:text-ink/30 font-mono"
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
                                                className="w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-ink/25  focus:outline-none focus:border-press font-medium text-ink placeholder:text-ink/30 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-press text-white font-semibold hover:bg-ink transition-colors flex items-center justify-center gap-2"
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
                                className="w-full py-4 bg-white text-ink font-semibold border-[1.5px] border-ink hover:border-press hover:text-press transition-colors flex items-center justify-center gap-2"
                            >
                                <img src="/assets/paypal.png" alt="PayPal" className="h-5 w-auto" /> Request Invoice (B2B)
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-paper rounded-full flex items-center justify-center mx-auto mb-6">
                                <img src="/assets/paypal.png" alt="PayPal" className="h-8 w-auto" />
                            </div>
                            <h4 className="font-wide text-xl font-extrabold text-ink mb-2">Request a PayPal invoice</h4>
                            <p className="text-ink/70 mb-6 px-2 leading-relaxed">
                                For company orders that need an invoice first, email us with your company details and the print run you chose. We will reply with a PayPal invoice for your order.
                            </p>
                            <div className="p-4 bg-paper border border-board mb-6">
                                <span className="block text-sm text-ink/60 mb-1">Email</span>
                                <span className="font-semibold text-press select-all">info@garsabers.com</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-ink text-white font-semibold hover:bg-press transition-colors"
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
