import React from "react";
import styles from "./Refund.module.css";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "../components/Modals/LicenseModal";
import VideosModal from "../components/Modals/VideosModal";
import { motion } from "framer-motion";

export const Main = () => {
  const { isOpen, modalType } = useModalStore();
  return (
    <main className={styles.main}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.image} />
          <h3>Refund Policy</h3>
          <p>Last updated: June 1st, 2025</p>
        </div>
        <div className={styles.privacy}>
          <div className={styles.block}>
            <p>
              At Wallper, we are committed to providing a high-quality product
              and ensuring user satisfaction. However, we recognize that there
              may be circumstances in which you may wish to request a refund.
              This Refund Policy outlines the terms and conditions under which
              refunds may be issued, in accordance with applicable consumer
              protection legislation and our internal procedures.
            </p>
            <p>
              This Refund Policy forms part of the Terms of Use and is
              applicable to all users who have made a purchase via our official
              channels.
            </p>
          </div>

          <div className={styles.block}>
            <h1>1. Eligibility for Refund</h1>
            <p>
              We offer a 14-day money-back guarantee from the date of purchase.
              This policy applies regardless of your country of residence, in
              order to ensure a fair and consistent experience for all
              customers.
            </p>
            <p>To be eligible for a refund:</p>

            <div className={styles.separate}>
              <p>
                • Your request must be received by us within fourteen (14)
                calendar days of the original purchase date.
              </p>
              <p>
                • You must submit your request via email to:{" "}
                <a className={styles.link} href="mailto:support@wallper.app">
                  support@wallper.app
                </a>
              </p>

              <div className={styles.subparagraph}>
                <h2>• Your email must include:</h2>
                <span>
                  <p>• The email address used during checkout.</p>
                  <p>• A brief explanation of the reason for the refund.</p>
                  <p>
                    • Optionally, your order ID or the last 4 digits of the
                    payment card (for verification purposes).
                  </p>
                </span>
              </div>
            </div>
            <p>
              We may request additional information solely for the purpose of
              verifying the purchase and ensuring the authenticity of the
              request.
            </p>

            <div className={styles.subparagraph}>
              <h2>• Important notes:</h2>
              <span>
                <p>
                  • You may request a refund even if the software has already
                  been downloaded, installed, or activated on your device.
                </p>
                <p>
                  • You may have already used the license on up to three (3)
                  personal devices, and still be eligible for a refund if within
                  the 14-day period.
                </p>
              </span>
            </div>
            <p>
              Your eligibility for a refund does not require justification,
              although we welcome feedback to improve our product.
            </p>
          </div>

          <div className={styles.block}>
            <h1>2. Method and Processing of Refunds</h1>
            <p>
              All payments for Wallper are processed securely through Stripe,
              which includes methods such as Apple Pay and major credit/debit
              cards.
            </p>
            <div className={styles.separate}>
              <p>
                • If your refund request is approved, the refund will be issued
                to the original payment method used during the transaction.
              </p>
              <p>• We do not process refunds to alternative payment methods.</p>
              <p>
                • Refund processing times depend on your financial institution
                and may take approximately 3 to 10 business days.
              </p>
            </div>
            <p>We do not charge any refund handling or processing fees.</p>
          </div>

          <div className={styles.block}>
            <h1>3. Cases Where Refunds Are Not Granted</h1>
            <p>Refunds may be declined under the following conditions:</p>
            <div className={styles.separate}>
              <p>• Requests made after the 14-day window has elapsed.</p>
              <p>
                • Violation of our Terms of Use, including use of the software
                for unlawful, harmful, or abusive purposes.
              </p>
              <p>
                • Misuse of license, including sharing, sublicensing,
                redistribution, or resale.
              </p>
              <div className={styles.subparagraph}>
                <h2>• Abuse of the refund policy, including:</h2>
                <span>
                  <p>
                    • Repeated refund requests for the same or multiple
                    purchases.
                  </p>
                  <p>
                    • Fraudulent behavior, false identity, or payment disputes.
                  </p>
                </span>
              </div>
              <p>
                • If the user`s account has been suspended or banned due to
                breach of policy or detected fraud.
              </p>
            </div>
            <p>
              We reserve the right to deny any refund where we have a good-faith
              belief that the request is dishonest or abusive.
            </p>
          </div>

          <div className={styles.block}>
            <h1>4. Additional Considerations</h1>
            <div className={styles.separate}>
              <p>
                • Wallper licenses may be activated on up to three (3) personal
                macOS devices per license key.
              </p>
              <div className={styles.subparagraph}>
                <h2>• Eligibility is based exclusively on:</h2>
                <span>
                  <p>• Compliance with the 14-day timeframe.</p>
                  <p>• Adherence to our Terms of Use and this Refund Policy.</p>
                </span>
              </div>
              <p>
                • Refunds are not guaranteed and are issued at our reasonable
                discretion.
              </p>
            </div>
            <p>
              We reserve the right to interpret, apply, or amend this policy in
              accordance with applicable law and based on specific case
              circumstances.
            </p>
          </div>

          <div className={styles.block}>
            <h1>5. How to Submit a Refund Request</h1>
            <p>
              To submit a refund request, please email us with the following
              details:
            </p>
            <div className={styles.separate}>
              <p>
                • Email subject line:{" "}
                <strong className={styles.strong}>
                  Refund Request – Wallper.
                </strong>
              </p>
              <div className={styles.subparagraph}>
                <h2>• Email body should contain:</h2>
                <span>
                  <p>• The email address used during the original purchase.</p>
                  <p>
                    • A short explanation of your reason for requesting a
                    refund.
                  </p>
                  <p>• Optional: your order number or proof of purchase.</p>
                </span>
              </div>
            </div>
            <p>
              All refund requests should be directed to:{" "}
              <a className={styles.link} href="mailto:support@wallper.app">
                support@wallper.app.
              </a>{" "}
              We aim to respond to all refund inquiries within 3 business days,
              though this may vary based on volume.
            </p>
          </div>

          <div className={styles.block}>
            <h1>6. Your Statutory Rights</h1>
            <p>
              This Refund Policy does not limit or exclude any rights you may
              have under applicable consumer protection laws in your
              jurisdiction. If you are a resident of a country where specific
              statutory refund rights apply (e.g., under the European Union
              Consumer Rights Directive), those rights shall be respected in
              full.
            </p>
          </div>

          <div className={styles.block}>
            <h1>7. Contact Information</h1>
            <p>
              For all inquiries, support requests, or legal concerns, you may
              contact us at: <br /> Email:{" "}
              <a href="mailto:support@wallper.app" className={styles.link}>
                support@wallper.app.
              </a>{" "}
              Website:{" "}
              <a href="https://wallper.app" className={styles.link}>
                https://wallper.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
