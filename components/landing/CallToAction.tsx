import React from 'react';

interface CallToActionProps {
    onCtaClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onCtaClick }) => (
    <section className="relative bg-ink text-white">
        <img
            src="/assets/boxes/delivery.jpg"
            alt="Branded mailer boxes delivered to a shop doorway"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/10" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-28 lg:py-40">
            <h2 className="font-wide font-extrabold text-4xl sm:text-6xl tracking-[-0.025em] leading-[1] max-w-2xl">
                Send us your logo. We send back boxes.
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-lg leading-relaxed">
                Choose a print run today and your proof is in your inbox within one working day of upload.
            </p>
            <button onClick={onCtaClick} className="mt-10 h-14 px-8 bg-press text-white font-semibold text-[17px] hover:bg-white hover:text-press transition-colors">
                See print run prices
            </button>
        </div>
    </section>
);
