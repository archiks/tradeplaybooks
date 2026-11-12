import React from 'react';
import { LegalLayout, Clause, COMPANY } from './LegalLayout';

export const RefundPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <LegalLayout
        title="Refund Policy"
        updated="12 November 2026"
        onBack={onBack}
        intro={
            <p>
                Every box we sell is printed with your own artwork, so it can't be resold to anyone else. This policy explains
                when you can cancel, what happens if something goes wrong, and how refunds are paid. It forms part of
                our <a href="/user-agreement" className="text-press font-semibold">User Agreement</a>.
            </p>
        }
    >
        <Clause n={1} title="Cancelling before you approve your proof">
            <p>
                You can cancel your order at any time <strong>before you approve your proof</strong> and we will refund you in full.
                Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with your order reference and the word "cancel".
            </p>
            <p>
                If we have already made more than one round of proof changes for you, we may keep up to 10% of the order
                value to cover design time. We will tell you the amount before we refund the rest.
            </p>
        </Clause>

        <Clause n={2} title="After you approve your proof">
            <p>
                Once you approve your proof, your boxes go into production and the order <strong>can no longer be cancelled or
                refunded for a change of mind</strong>. This is because they are made to your specification and personalised with
                your branding.
            </p>
            <p>
                If you buy as a consumer in the UK, the 14-day cancellation period under the Consumer Contracts
                (Information, Cancellation and Additional Charges) Regulations 2013 does not apply to goods made to your
                specifications or clearly personalised. Your other legal rights, including those for faulty goods, are not affected.
            </p>
        </Clause>

        <Clause n={3} title="Faulty, misprinted or damaged boxes">
            <p>We will reprint or refund boxes that are our fault, including boxes that:</p>
            <ul>
                <li>do not match the proof you approved (wrong artwork, position, size or box style)</li>
                <li>have print defects such as smudging, missing ink or misregistration that is clearly visible</li>
                <li>arrive damaged, crushed or wet</li>
                <li>arrive short of the quantity you paid for</li>
            </ul>
            <p>
                Tell us within <strong>14 days of delivery</strong> by emailing <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> with
                your order reference, a description of the problem and photos of the affected boxes and outer packaging.
                Please keep the boxes until we have reviewed your claim.
            </p>
            <p>
                We will reply within 2 working days. Where the claim is accepted, we will reprint the affected boxes at no
                cost or, if you prefer, refund the value of those boxes. A small number of defective boxes does not make the
                whole order faulty: we refund or replace the affected units.
            </p>
        </Clause>

        <Clause n={4} title="What is not covered">
            <ul>
                <li>Mistakes in artwork, spelling, colours or dimensions that were visible on the proof you approved</li>
                <li>Low-resolution or incorrect files you supplied, where we warned you about print quality before approval</li>
                <li>Small colour differences between your screen, the digital proof and printed board. Board type and finish affect how colours appear, and we print to industry tolerances</li>
                <li>Variations of up to ±3% in the quantity delivered, which is normal in box manufacturing</li>
                <li>Damage caused after delivery, or by storing boxes in damp conditions</li>
            </ul>
        </Clause>

        <Clause n={5} title="Late delivery">
            <p>
                The production times on our site are estimates that start when you approve your proof. If your order has
                not been dispatched within <strong>30 days of proof approval</strong>, you can cancel it and receive a full refund,
                unless the delay was caused by you (for example, by changing the delivery address after dispatch).
            </p>
        </Clause>

        <Clause n={6} title="Custom orders">
            <p>
                Custom orders paid on a custom invoice follow this same policy. If your custom
                quote sets out different terms, such as a deposit or staged payments, the terms in that quote apply where they differ.
            </p>
        </Clause>

        <Clause n={7} title="How refunds are paid">
            <p>
                Refunds go back to the original payment method (card, PayPal or bank transfer) within <strong>14 days</strong> of us
                agreeing the refund. We refund in the currency you paid in. Your bank or payment provider may take a few
                more days to show it. We do not refund currency conversion fees charged by your bank.
            </p>
        </Clause>

        <Clause n={8} title="Contact us first">
            <p>
                If you are unhappy with your order, please contact us before opening a dispute or chargeback with your bank or
                payment provider. Most problems are resolved faster by a reprint than by a dispute.
            </p>
            <p>
                Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We answer on working days, Monday to Friday.
            </p>
        </Clause>
    </LegalLayout>
);
