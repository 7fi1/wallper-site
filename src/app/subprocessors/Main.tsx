import React from "react";
import styles from "./Subprocessors.module.css";
import { useModalStore } from "@/src/store/ModalStore";
import { motion } from "framer-motion";
import LicenseModal from "../components/Modals/LicenseModal";
import VideosModal from "../components/Modals/VideosModal";

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
          <h3>Subprocessors</h3>
          <p>Last updated: June 1st, 2025</p>
        </div>
        <div className={styles.privacy}>
          <div className={styles.block}>
            <p>
              At Wallper (“we”, “us”, or “our”), we are committed to
              transparency regarding how your data is handled. This includes
              disclosing the subprocessors we engage to provide and support our
              macOS application and related services on{" "}
              <a className={styles.link} href="https://www.wallper.app/">
                wallper.app.
              </a>
            </p>
            <p>
              This page outlines the third-party service providers (“
              <strong className={styles.strong}>subprocessors”</strong>) that
              may process limited personal data on our behalf in order to
              operate our platform securely, efficiently, and in compliance with
              applicable legal obligations.
            </p>
          </div>

          <div className={styles.block}>
            <h1>1. What is a Subprocessor?</h1>
            <p>
              A subprocessor is a third-party data processor engaged by Wallper,
              who has or potentially will have access to certain personal data
              that is processed on behalf of our users. This access is strictly
              limited to the scope required for providing specific services such
              as infrastructure hosting, payment processing, email delivery, or
              analytics.
            </p>

            <p>
              Each subprocessor is contractually obligated to comply with
              applicable data protection laws (such as the GDPR, CCPA/CPRA) and
              to provide adequate safeguards in terms of confidentiality,
              integrity, and security.
            </p>
          </div>

          <div className={styles.block}>
            <h1>2. List of Subprocessors</h1>
            <div className={styles.separate}>
              <p>
                •{" "}
                <strong className={styles.strong}>
                  Amazon Web Services, Inc. (USA)
                </strong>{" "}
                — Cloud infrastructure, file and wallpaper storage.
              </p>
              <p>
                • <strong className={styles.strong}>Stripe, Inc. (USA)</strong>{" "}
                — Payment processing and licensing.
              </p>
              <p>
                • <strong className={styles.strong}>Vercel Inc. (USA)</strong> —
                Website hosting and global CDN.
              </p>
              <p>
                • <strong className={styles.strong}>Resend, Inc (USA)</strong> —
                Transactional email delivery (e.g., license emails, support
                replies).
              </p>
              <p>
                • <strong className={styles.strong}>Google, Inc. (USA)</strong>{" "}
                — Site usage analytics (if consented).
              </p>
              <p>
                <strong className={styles.strong}>Note:</strong> All
                subprocessors are carefully reviewed and bound by appropriate
                Data Processing Agreements (DPAs) or Standard Contractual
                Clauses (SCCs) where applicable.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>3. Data Transfers Outside the EU</h1>
            <p>
              When data is transferred outside of the European Economic Area
              (EEA), we ensure that adequate safeguards are in place. This
              includes reliance on:
            </p>
            <div className={styles.separate}>
              <p>
                • Standard Contractual Clauses (SCCs) approved by the European
                Commission.
              </p>
              <p>
                • Vendor certifications under frameworks such as the EU-U.S.
                Data Privacy Framework.
              </p>
              <p>
                • Physical and technical protections like encryption in transit
                and at rest.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>4. How We Evaluate Subprocessors</h1>
            <p>
              Before engaging any subprocessor, Wallper performs a due diligence
              process that includes:
            </p>
            <div className={styles.separate}>
              <p>
                • Reviewing the provider’s security policies and certifications
                (e.g., ISO 27001, SOC 2).
              </p>
              <p>
                • Assessing compliance with applicable privacy regulations
                (e.g., GDPR, CCPA/CPRA).
              </p>
              <p>
                • Ensuring clear contractual obligations for data
                confidentiality and integrity.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>5. Updates to This List</h1>
            <p>
              We may update this list of subprocessors as our infrastructure or
              services evolve. When we do so, we will:
            </p>
            <div className={styles.separate}>
              <p>• Post the updated list on this page.</p>
              <p>• Update the effective date at the top.</p>
              <p>
                • Where required by law or contract, provide advance notice to
                affected users.
              </p>
            </div>
            <p>
              We recommend checking this page periodically to remain informed.
            </p>
          </div>

          <div className={styles.block}>
            <h1>6. Contact Information</h1>
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
