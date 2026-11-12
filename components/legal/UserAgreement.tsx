import React from 'react';
import { LegalLayout, Clause, COMPANY } from './LegalLayout';

export const UserAgreement: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <LegalLayout
        title="User Agreement"
        updated="12 November 2026"
        onBack={onBack}
        intro={
            <p>
                This agreement sets out the terms on which {COMPANY.name} ("Garsabers", "we", "us") prints and supplies
                custom boxes to you ("you"). By placing an order or paying through this website, you agree to it. Please read
                it together with our <a href="/refund-policy" className="text-press font-semibold">Refund Policy</a> and{' '}
                <a href="/privacy-policy" className="text-press font-semibold">Privacy Policy</a>.
            </p>
        }
    >
        <Clause n={1} title="Who we are">
            <p>
                Garsabers is a trading name of {COMPANY.name}, a private limited company registered in {COMPANY.registeredIn} under
                company number {COMPANY.number}, with its registered office at {COMPANY.address}. You can contact us
                at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
        </Clause>

        <Clause n={2} title="Business and consumer customers">
            <p>
                Most of our customers buy for a business. Some parts of this agreement apply differently if you buy as a
                consumer (for purposes outside your trade or business). Nothing in this agreement limits the rights you have
                as a consumer under UK law, including the Consumer Rights Act 2015.
            </p>
        </Clause>

        <Clause n={3} title="How a contract is formed">
            <ul>
                <li>When you pay for a print run on our site, or pay a custom quote or invoice, you make an offer to buy.</li>
                <li>The contract starts when we confirm your order by email. If we cannot accept your order (for example, because the artwork breaks clause 5), we will tell you and refund any payment in full.</li>
                <li>The order is for the box style, quantity, print and finishes shown in the print run you chose, or set out in your custom quote.</li>
            </ul>
        </Clause>

        <Clause n={4} title="Your artwork">
            <ul>
                <li>After you order, we email you a link to upload your logo and artwork. Vector files (AI, EPS, PDF, SVG) give the best result; raster files should be at least 300 dpi at print size.</li>
                <li>You keep ownership of your artwork. You give us a licence to use it only to produce, proof and deliver your order.</li>
                <li>We will only show photos of your boxes in our portfolio or marketing if you agree in writing.</li>
                <li>We may adjust files only as needed for printing (for example, converting colours or fitting to the die-line), and these changes will be visible on your proof.</li>
            </ul>
        </Clause>

        <Clause n={5} title="Content you may not ask us to print">
            <p>
                You confirm that you own or have permission to use everything you send us, including logos, trade marks,
                images and fonts, and that printing it will not break any law or anyone else's rights. We may refuse any
                artwork that is unlawful, infringing, hateful, obscene or misleading, and refund you in full.
            </p>
            <p>
                If you are a business customer, you agree to compensate us for losses we suffer because artwork you supplied
                infringed someone else's rights.
            </p>
        </Clause>

        <Clause n={6} title="Proofs and approval">
            <ul>
                <li>We send a digital proof within one working day of receiving usable artwork. Signature runs also get a physical sample before the full run.</li>
                <li>Please check every proof carefully: spelling, colours, size, position and box style. Changes are free until you approve, within the proof rounds included in your print run.</li>
                <li><strong>Production starts only after you approve the proof in writing.</strong> Once you approve it, you accept the design as shown, and we are not responsible for errors that were visible on the approved proof.</li>
                <li>If we have not received usable artwork or a proof approval within 60 days of your order, we may cancel the order and refund it, less any design work already done.</li>
            </ul>
        </Clause>

        <Clause n={7} title="Prices and payment">
            <ul>
                <li>Prices are shown in euros and exclude VAT unless stated. VAT is added where it applies.</li>
                <li>Fixed print runs are paid in full when you order, by card or by PayPal invoice.</li>
                <li>Custom orders are paid through a Stripe payment link (USD or GBP) or a custom invoice, as set out in your quote.</li>
                <li>Delivery costs, if any, are confirmed with your proof before you approve it.</li>
                <li>Payments are processed by our payment providers (Stripe and PayPal). We do not store your full card details.</li>
                <li>If a price on our site is clearly wrong, we will contact you before production and you may cancel for a full refund.</li>
            </ul>
        </Clause>

        <Clause n={8} title="Production and delivery">
            <ul>
                <li>Production times shown on our site are estimates and start when you approve your proof.</li>
                <li>Boxes are delivered flat-packed to the address you give us. Please check the outer packaging on delivery and note any visible damage with the courier.</li>
                <li>Delivered quantities may vary by up to ±3%, which is normal in box manufacturing.</li>
                <li>Responsibility for the boxes passes to you on delivery. Ownership passes to you once we have received full payment.</li>
            </ul>
        </Clause>

        <Clause n={9} title="Cancellations and refunds">
            <p>
                Because every order is personalised, cancellations and refunds are handled as set out in
                our <a href="/refund-policy">Refund Policy</a>. In short: you can cancel for a full refund before you approve your
                proof, and we will reprint or refund boxes that are faulty, misprinted, damaged or late as described there.
            </p>
        </Clause>

        <Clause n={10} title="Our responsibility to you">
            <ul>
                <li>We will supply boxes that match your approved proof, using reasonable care and skill.</li>
                <li>We are not responsible for losses that were not foreseeable when the contract was made, or for delays caused by events outside our reasonable control (such as courier failures, strikes or supplier shortages). If such an event lasts more than 30 days, either of us may cancel and you will be refunded for anything not yet supplied.</li>
                <li>If you are a business customer, we are not liable for loss of profit, sales or business, and our total liability for an order is limited to the price you paid for it.</li>
                <li>Nothing in this agreement limits our liability for death or personal injury caused by our negligence, for fraud, or for anything else that cannot be limited by law.</li>
            </ul>
        </Clause>

        <Clause n={11} title="Your personal data">
            <p>
                We use your personal data only to process and deliver your order and to contact you about it, as explained in
                our <a href="/privacy-policy">Privacy Policy</a>.
            </p>
        </Clause>

        <Clause n={12} title="Changes to this agreement">
            <p>
                We may update this agreement from time to time. The version on our site when you place your order applies to
                that order.
            </p>
        </Clause>

        <Clause n={13} title="Complaints, law and courts">
            <p>
                If you have a problem, please email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> first and we will try
                to resolve it quickly.
            </p>
            <p>
                This agreement is governed by the law of England and Wales, and the courts of England and Wales have
                jurisdiction. If you are a consumer living in Scotland or Northern Ireland, you may also bring proceedings in your
                local courts.
            </p>
        </Clause>
    </LegalLayout>
);
