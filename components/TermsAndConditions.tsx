import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
    onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white text-brand-navy font-sans py-24 px-6 selection:bg-brand-teal selection:text-white">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-brand-navy mb-12 transition-colors font-medium"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Home
                </button>
                
                <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">Terms and Conditions</h1>
                <p className="text-slate-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-navy prose-a:text-brand-teal">
                    <p className="text-lg leading-relaxed text-slate-600 mb-8">
                        Welcome to Garsabers. These terms and conditions outline the rules and regulations for the use of GARSABER TECH LTD's Website and Services.
                    </p>

                    <h2 className="text-2xl mt-12 mb-4">1. Introduction</h2>
                    <p className="mb-4 text-slate-600">By accessing this website, we assume you accept these terms and conditions. Do not continue to use Garsabers if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h2 className="text-2xl mt-12 mb-4">2. Intellectual Property Rights</h2>
                    <p className="mb-4 text-slate-600">Other than the content you own, under these Terms, GARSABER TECH LTD and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
                    <p className="mb-6 text-slate-600">You are granted limited license only for purposes of viewing the material contained on this Website.</p>

                    <h2 className="text-2xl mt-12 mb-4">3. Restrictions</h2>
                    <p className="mb-4 text-slate-600">You are specifically restricted from all of the following:</p>
                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                        <li>Publishing any Website material in any other media.</li>
                        <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
                        <li>Publicly performing and/or showing any Website material.</li>
                        <li>Using this Website in any way that is or may be damaging to this Website.</li>
                        <li>Using this Website in any way that impacts user access to this Website.</li>
                        <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
                    </ul>

                    <h2 className="text-2xl mt-12 mb-4">4. Limitation of Liability</h2>
                    <p className="mb-6 text-slate-600">In no event shall GARSABER TECH LTD, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract. GARSABER TECH LTD, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.</p>

                    <h2 className="text-2xl mt-12 mb-4">5. Indemnification</h2>
                    <p className="mb-6 text-slate-600">You hereby indemnify to the fullest extent GARSABER TECH LTD from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

                    <h2 className="text-2xl mt-12 mb-4">6. Severability</h2>
                    <p className="mb-6 text-slate-600">If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

                    <h2 className="text-2xl mt-12 mb-4">7. Variation of Terms</h2>
                    <p className="mb-6 text-slate-600">GARSABER TECH LTD is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

                    <h2 className="text-2xl mt-12 mb-4">8. Governing Law & Jurisdiction</h2>
                    <p className="mb-6 text-slate-600">These Terms will be governed by and interpreted in accordance with the laws of the jurisdiction in which GARSABER TECH LTD operates, and you submit to the non-exclusive jurisdiction of the state and federal courts located there for the resolution of any disputes.</p>

                    <h2 className="text-2xl mt-12 mb-4">9. Contact Information</h2>
                    <p className="mb-6 text-slate-600">If you have any inquiries regarding our Terms and Conditions, please contact us at:</p>
                    <p className="text-slate-600 font-medium">GARSABER TECH LTD</p>
                    <p className="text-slate-600">info@garsabers.com</p>
                </div>
            </div>
        </div>
    );
};
