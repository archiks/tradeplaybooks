import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { HeroSection } from './landing/HeroSection';
import { HowItWorks } from './landing/HowItWorks';
import { WhatYouGet } from './landing/WhatYouGet';
import { HighEndWebsites } from './landing/HighEndWebsites';
import { Pricing } from './landing/Pricing';
import { WhyUs } from './landing/WhyUs';
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

            <HighEndWebsites />

            <Pricing onSelectPlan={handleBuy} />

            <WhyUs />

            <FAQ />

            <CallToAction onCtaClick={scrollToPricing} />

            {/* FOOTER */}
            <footer className="bg-brand-navy border-t border-white/10 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <p className="font-serif font-bold text-2xl text-white mb-4">Garsabers<span className="text-brand-teal">.</span></p>
                            <p className="text-slate-400 text-sm mb-4">Empowering your business with premium Shopify stores and high-end standard website builds.</p>
                            <a href="mailto:info@garsabers.com" className="text-brand-teal hover:text-white transition-colors text-sm font-medium">info@garsabers.com</a>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Legal</p>
                            <ul className="space-y-3">
                                {onNavigateToPrivacy && (
                                    <li><button onClick={onNavigateToPrivacy} className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</button></li>
                                )}
                                {onNavigateToTerms && (
                                    <li><button onClick={onNavigateToTerms} className="text-slate-400 hover:text-white text-sm transition-colors">Terms & Conditions</button></li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Partners</p>
                            <div className="flex items-center gap-3 text-slate-400">
                                <img src="/assets/shopify-partner-wt-customparadigm-icons2x.png" alt="Shopify Partner" className="h-16 object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} GARSABER TECH LTD. All rights reserved.</p>
                    </div>
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
