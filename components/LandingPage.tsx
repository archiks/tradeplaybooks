import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { Header, Logo } from './landing/Header';
import { HeroSection } from './landing/HeroSection';
import { BoxStyles } from './landing/BoxStyles';
import { Finishes } from './landing/Finishes';
import { HowItWorks } from './landing/HowItWorks';
import { Pricing } from './landing/Pricing';
import { FAQ } from './landing/FAQ';
import { CallToAction } from './landing/CallToAction';
import { PurchaseModal } from './PurchaseModal';
import { COMPANY } from './legal/LegalLayout';
import { PaymentStrip } from './landing/PaymentStrip';

interface LandingPageProps {
    onNavigateToPrivacy?: () => void;
    onNavigateToTerms?: () => void;
    onNavigateToRefund?: () => void;
    onNavigateToAgreement?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToPrivacy, onNavigateToTerms, onNavigateToRefund, onNavigateToAgreement }) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleBuy = (product: Product) => {
        setSelectedProduct(product);
        setShowPurchaseModal(true);
    };

    const closePurchaseModal = useCallback(() => setShowPurchaseModal(false), []);

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-paper text-ink font-sans relative min-h-screen">
            <Header onCtaClick={scrollToPricing} />

            <main>
                <HeroSection onCtaClick={scrollToPricing} />
                <BoxStyles />
                <HowItWorks />
                <Finishes />
                <Pricing onSelectPlan={handleBuy} />
                <FAQ />
                <CallToAction onCtaClick={scrollToPricing} />
            </main>

            <footer className="bg-ink text-paper border-t border-paper/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-6">
                        <Logo light />
                        <p className="mt-4 text-paper/65 max-w-sm leading-relaxed">
                            Custom logo-printed mailer boxes, shipping cartons and rigid gift boxes for growing brands.
                        </p>
                        <a href="mailto:info@garsabers.com" className="mt-4 inline-block font-semibold text-[#8C95FF] hover:text-white">info@garsabers.com</a>
                    </div>
                    <nav className="md:col-span-3" aria-label="Footer">
                        <p className="font-semibold mb-3">Boxes</p>
                        <ul className="space-y-2 text-paper/65">
                            <li><a href="#boxes" className="hover:text-white">Box styles</a></li>
                            <li><a href="#finishes" className="hover:text-white">Finishes</a></li>
                            <li><a href="#pricing" className="hover:text-white">Prices</a></li>
                        </ul>
                    </nav>
                    <div className="md:col-span-3">
                        <p className="font-semibold mb-3">Legal</p>
                        <ul className="space-y-2 text-paper/65">
                            {onNavigateToAgreement && <li><button onClick={onNavigateToAgreement} className="hover:text-white text-left">User agreement</button></li>}
                            {onNavigateToRefund && <li><button onClick={onNavigateToRefund} className="hover:text-white text-left">Refund policy</button></li>}
                            {onNavigateToPrivacy && <li><button onClick={onNavigateToPrivacy} className="hover:text-white text-left">Privacy policy</button></li>}
                            {onNavigateToTerms && <li><button onClick={onNavigateToTerms} className="hover:text-white text-left">Terms and conditions</button></li>}
                        </ul>
                    </div>
                </div>
                <PaymentStrip />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-paper/10 text-sm text-paper/50">
                    <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved. Garsabers is a trading name of {COMPANY.name}.</p>
                    <p className="mt-1">Registered in {COMPANY.registeredIn}, company number {COMPANY.number}. Registered office: {COMPANY.address}.</p>
                </div>
            </footer>

            <AnimatePresence>
                {showPurchaseModal && selectedProduct && (
                    <PurchaseModal onClose={closePurchaseModal} product={selectedProduct} initialStep={selectedProduct.id === 'custom' ? 'CUSTOM_INFO' : 'PAYMENT'} />
                )}
            </AnimatePresence>
        </div>
    );
};
