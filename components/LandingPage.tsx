import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { HeroSection } from './landing/HeroSection';
import { HowItWorks } from './landing/HowItWorks';
import { WhatYouGet } from './landing/WhatYouGet';
import { Pricing } from './landing/Pricing';
import { WhyUs } from './landing/WhyUs';
import { FAQ } from './landing/FAQ';
import { CallToAction } from './landing/CallToAction';
import { PurchaseModal } from './PurchaseModal';

export const LandingPage: React.FC = () => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleBuy = (product: Product) => {
        setSelectedProduct(product);
        setShowPurchaseModal(true);
    };

    const scrollToPricing = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white text-brand-navy font-sans relative min-h-screen selection:bg-brand-teal selection:text-white">

            <HeroSection onCtaClick={scrollToPricing} />

            <HowItWorks />

            <WhatYouGet />

            <Pricing onSelectPlan={handleBuy} />

            <WhyUs />

            <FAQ />

            <CallToAction onCtaClick={scrollToPricing} />

            {/* FOOTER */}
            <footer className="bg-brand-navy border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="font-serif font-bold text-xl text-white mb-4">Garsabers</p>
                    <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Garsabers. All rights reserved.</p>
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
