import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, X, Book, FileText } from 'lucide-react';
import { Product, OrderStatus, PayPalSettings } from '../types';
import { MockBackend } from '../services/mockBackend';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PurchaseModalProps {
    onClose: () => void;
    product: Product;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ onClose, product }) => {
    const [step, setStep] = useState<'PAYMENT' | 'INVOICE_INFO'>('PAYMENT');
    const [loading, setLoading] = useState(false);
    const [ppSettings, setPPSettings] = useState<PayPalSettings | null>(null);

    useEffect(() => {
        MockBackend.getPayPalSettings().then(setPPSettings);
    }, []);

    const handlePayPalApprove = async (data: any, actions: any) => {
        setLoading(true);
        try {
            const details = await actions.order.capture();
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
                        <div className="space-y-3">
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
                                                        purchase_units: [{
                                                            description: product.name,
                                                            amount: {
                                                                value: product.price.toString(),
                                                                currency_code: "EUR"
                                                            }
                                                        }]
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
                                                const msg = err?.message || err?.toString() || "Unknown error";
                                                alert("PayPal Error: " + msg + "\n\nPlease try again or contact support.");
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            ) : (
                                <div className="text-center text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                    PayPal is currently unavailable.
                                </div>
                            )}

                            <button
                                onClick={handleInvoice}
                                disabled={loading}
                                className="w-full py-4 bg-white text-brand-navy font-bold rounded-xl border-2 border-slate-200 hover:border-brand-teal hover:text-brand-teal transition-all flex items-center justify-center gap-2"
                            >
                                <FileText className="w-5 h-5" /> Pay via Invoice (B2B)
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
