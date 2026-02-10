import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Book, FileText, CreditCard, Calendar, Lock, User, CheckCircle } from 'lucide-react';
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

                alert("Payment Successful! Access to your store will be sent to your email.");
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200"
            >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-xl font-bold text-brand-navy">Secure Checkout</h3>
                        <p className="text-xs text-brand-teal flex items-center gap-1 font-bold"><Shield className="w-3 h-3" /> Encrypted & Safe</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 font-bold">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Product Summary */}
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl mb-6 border border-slate-100">
                        <div className="w-16 h-20 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                            <Book className="w-8 h-8 text-brand-teal" />
                        </div>
                        <div>
                            <h4 className="font-bold text-brand-navy text-sm">{product.name}</h4>
                            <p className="text-xs text-slate-500 mb-2">{product.tagline}</p>
                            <span className="font-bold text-brand-teal">€{product.price}</span>
                        </div>
                    </div>

                    {step === 'PAYMENT' ? (
                        <div className="space-y-4">
                            <form onSubmit={handleCardPayment} className="space-y-4">
                                {/* Name on Card */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Name on Card</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-bold text-brand-navy placeholder:text-slate-300"
                                        />
                                    </div>
                                </div>

                                {/* Card Number */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Card Number</label>
                                    <div className="relative">
                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="0000 0000 0000 0000"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            maxLength={19}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-bold text-brand-navy placeholder:text-slate-300 font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Expiry */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Expiry</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="MM/YY"
                                                value={expiry}
                                                onChange={handleExpiryChange}
                                                maxLength={5}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-bold text-brand-navy placeholder:text-slate-300 font-mono"
                                            />
                                        </div>
                                    </div>

                                    {/* CVC */}
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">CVC</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="123"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                                                maxLength={4}
                                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal font-bold text-brand-navy placeholder:text-slate-300 font-mono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal/90 transition-all shadow-lg shadow-brand-teal/20 flex items-center justify-center gap-2"
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
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-400 font-bold">Or pay via</span>
                                </div>
                            </div>

                            <button
                                onClick={handleInvoice}
                                disabled={loading}
                                className="w-full py-4 bg-white text-brand-navy font-bold rounded-xl border-2 border-slate-200 hover:border-brand-teal hover:text-brand-teal transition-all flex items-center justify-center gap-2"
                            >
                                <FileText className="w-5 h-5" /> Request Invoice (B2B)
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-8 h-8 text-brand-teal" />
                            </div>
                            <h4 className="text-xl font-bold text-brand-navy mb-2">Request an Invoice</h4>
                            <p className="text-sm text-slate-500 mb-6 px-4">
                                For corporate orders and B2B invoicing, please contact our support team directly. We will process your order manually.
                            </p>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
                                <span className="block text-xs text-slate-500 uppercase font-bold mb-1">Contact Email</span>
                                <span className="font-mono text-brand-teal font-bold select-all">support@garsabers.com</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-brand-navy text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
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
