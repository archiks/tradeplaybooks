import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CallToActionProps {
    onCtaClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onCtaClick }) => (
    <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 rounded-[2.5rem] overflow-hidden bg-lime text-ink">
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                    <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl">Send us your logo. We send back boxes.</h2>
                    <p className="mt-6 text-lg text-ink/75 max-w-md leading-relaxed">
                        Choose a print run today and your proof is in your inbox within one working day of upload.
                    </p>
                    <div className="mt-9">
                        <button onClick={onCtaClick} className="btn-dark h-14 px-8 text-[17px]">
                            See pricing <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <img
                    src="/assets/boxes/cta.jpg"
                    alt="Hands opening a lime green branded mailer box"
                    loading="lazy"
                    className="w-full h-full min-h-[20rem] object-cover"
                />
            </div>
        </div>
    </section>
);
