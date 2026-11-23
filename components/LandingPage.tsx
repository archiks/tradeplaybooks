import React, { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { Header, Logo } from './landing/Header';
import { HeroSection } from './landing/HeroSection';
import { BoxStyles } from './landing/BoxStyles';
import { Catalog } from './landing/Catalog';
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
                <Catalog />
                <HowItWorks />
                <Finishes />
                <Pricing onSelectPlan={handleBuy} />
                <FAQ />
                <CallToAction onCtaClick={scrollToPricing} />
            </main>

            <footer className="bg-forest-deep text-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
                    <PaymentStrip />

                    <div className="mt-14 sm:mt-20 grid gap-10 md:grid-cols-12">
                        <div className="md:col-span-6">
                            <Logo light />
                            <p className="mt-5 text-white/60 max-w-sm leading-relaxed">
                                Custom logo-printed mailer boxes, shipping cartons and rigid gift boxes for growing brands.
                            </p>
                            <a href="mailto:info@garsabers.com" className="mt-5 inline-flex items-center rounded-full bg-white/[0.08] border border-white/10 px-4 py-2 font-medium hover:bg-lime hover:text-ink hover:border-lime transition-colors">
                                info@garsabers.com
                            </a>
                        </div>
                        <nav className="md:col-span-3" aria-label="Footer">
                            <p className="text-sm text-white/45 mb-4">Explore</p>
                            <ul className="space-y-2.5 text-white/80">
                                <li><a href="#catalog" className="hover:text-lime transition-colors">Product catalog</a></li>
                                <li><a href="#boxes" className="hover:text-lime transition-colors">Box styles</a></li>
                                <li><a href="#finishes" className="hover:text-lime transition-colors">Finishes</a></li>
                                <li><a href="#process" className="hover:text-lime transition-colors">How it works</a></li>
                                <li><a href="#pricing" className="hover:text-lime transition-colors">Pricing</a></li>
                            </ul>
                        </nav>
                        <div className="md:col-span-3">
                            <p className="text-sm text-white/45 mb-4">Legal</p>
                            <ul className="space-y-2.5 text-white/80">
                                {onNavigateToAgreement && <li><button onClick={onNavigateToAgreement} className="hover:text-lime transition-colors text-left">User agreement</button></li>}
                                {onNavigateToRefund && <li><button onClick={onNavigateToRefund} className="hover:text-lime transition-colors text-left">Refund policy</button></li>}
                                {onNavigateToPrivacy && <li><button onClick={onNavigateToPrivacy} className="hover:text-lime transition-colors text-left">Privacy policy</button></li>}
                                {onNavigateToTerms && <li><button onClick={onNavigateToTerms} className="hover:text-lime transition-colors text-left">Terms and conditions</button></li>}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-14 pt-6 border-t border-white/10 text-sm text-white/45 leading-relaxed">
                        <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved. Garsabers is a trading name of {COMPANY.name}.</p>
                        <p className="mt-1">Registered in {COMPANY.registeredIn}, company number {COMPANY.number}. Registered office: {COMPANY.address}.</p>
                    </div>
                </div>

                {/* Oversized wordmark */}
                <p aria-hidden="true" className="mt-8 -mb-[0.22em] text-center font-display font-bold tracking-[-0.06em] leading-none text-[23vw] text-white/[0.05] select-none">
                    garsabers
                </p>
            </footer>

            <AnimatePresence>
                {showPurchaseModal && selectedProduct && (
                    <PurchaseModal onClose={closePurchaseModal} product={selectedProduct} initialStep={selectedProduct.id === 'custom' ? 'CUSTOM_INFO' : 'PAYMENT'} />
                )}
            </AnimatePresence>
        </div>
    );
};
