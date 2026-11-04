import React, { useState } from 'react';
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

interface LandingPageProps {
    onNavigateToPrivacy?: () => void;
    onNavigateToTerms?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToPrivacy, onNavigateToTerms }) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleBuy = (product: Product) => {
        setSelectedProduct(product);
        setShowPurchaseModal(true);
    };

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
                    <div className="md:col-span-5">
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
                    <div className="md:col-span-2">
                        <p className="font-semibold mb-3">Legal</p>
                        <ul className="space-y-2 text-paper/65">
                            {onNavigateToPrivacy && <li><button onClick={onNavigateToPrivacy} className="hover:text-white">Privacy policy</button></li>}
                            {onNavigateToTerms && <li><button onClick={onNavigateToTerms} className="hover:text-white">Terms and conditions</button></li>}
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <p className="font-semibold mb-3">We accept</p>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="h-8 px-2.5 inline-flex items-center bg-white text-ink text-xs font-bold">Card</span>
                            <span className="h-8 px-2 inline-flex items-center bg-white"><img src="/assets/paypal.png" alt="PayPal" className="h-5 w-auto" /></span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-paper/10 text-sm text-paper/50">
                    © {new Date().getFullYear()} GARSABER TECH LTD. All rights reserved.
                </div>
            </footer>

            <AnimatePresence>
                {showPurchaseModal && selectedProduct && (
                    <PurchaseModal onClose={() => setShowPurchaseModal(false)} product={selectedProduct} />
                )}
            </AnimatePresence>
        </div>
    );
};
