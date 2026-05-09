import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                
                <h1 className="font-serif font-bold text-4xl md:text-5xl mb-4">Privacy Policy</h1>
                <p className="text-slate-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
                
                <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-brand-navy prose-a:text-brand-teal">
                    <p className="text-lg leading-relaxed text-slate-600 mb-8">
                        At GARSABER TECH LTD ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by GARSABER TECH LTD.
                    </p>

                    <h2 className="text-2xl mt-12 mb-4">1. Information We Collect</h2>
                    <p className="mb-4 text-slate-600">We collect information from you when you visit our website, register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form.</p>
                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                        <li><strong>Personal Data:</strong> Email address, first name and last name, phone number, address, State, Province, ZIP/Postal code, City.</li>
                        <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
                    </ul>

                    <h2 className="text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4 text-slate-600">Any of the information we collect from you may be used in one of the following ways:</p>
                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                        <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
                        <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
                        <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
                        <li>To process transactions: We use third-party payment processors (such as PayPal). We do not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy.</li>
                        <li>To send periodic emails</li>
                    </ul>

                    <h2 className="text-2xl mt-12 mb-4">3. Data Security</h2>
                    <p className="mb-6 text-slate-600">We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access.</p>

                    <h2 className="text-2xl mt-12 mb-4">4. Cookies and Tracking Technologies</h2>
                    <p className="mb-6 text-slate-600">We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>

                    <h2 className="text-2xl mt-12 mb-4">5. Third-Party Disclosure</h2>
                    <p className="mb-6 text-slate-600">We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>

                    <h2 className="text-2xl mt-12 mb-4">6. Your Data Protection Rights</h2>
                    <p className="mb-4 text-slate-600">Depending on your location, you may have the following rights regarding your personal data:</p>
                    <ul className="list-disc pl-6 mb-6 text-slate-600 space-y-2">
                        <li>The right to access, update or to delete the information we have on you.</li>
                        <li>The right of rectification.</li>
                        <li>The right to object.</li>
                        <li>The right of restriction.</li>
                        <li>The right to data portability.</li>
                        <li>The right to withdraw consent.</li>
                    </ul>

                    <h2 className="text-2xl mt-12 mb-4">7. Contact Us</h2>
                    <p className="mb-6 text-slate-600">If there are any questions regarding this privacy policy, you may contact us using the information below:</p>
                    <p className="text-slate-600 font-medium">GARSABER TECH LTD</p>
                    <p className="text-slate-600">info@garsabers.com</p>
                </div>
            </div>
        </div>
    );
};
