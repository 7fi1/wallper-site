import React from "react";
import styles from "./Terms.module.css";
import { motion } from "framer-motion";
import { useModalStore } from "@/src/store/ModalStore";
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
          <h3>Terms of Use</h3>
          <p>Last updated: June 1st, 2025</p>
        </div>
        <div className={styles.privacy}>
          <div className={styles.block}>
            <p>
              These <strong className={styles.strong}>Terms of Use</strong> (“
              <strong className={styles.strong}>Terms</strong>”) are a legally
              binding agreement between you (“you”, “your” or “User”) and
              Wallper (“Wallper”, “we”, “us” or “our”) that governs your use of
              the Wallper macOS application and our official website located at{" "}
              <a href="https://wallper.app" className={styles.link}>
                https://wallper.app
              </a>
              , collectively referred to as the{" "}
              <strong className={styles.strong}>Service</strong>.
            </p>
            <p>
              By accessing or using any part of the Service, you acknowledge
              that you have read, understood, and agreed to be bound by these{" "}
              <strong className={styles.strong}>Terms</strong>. If you do not
              agree with any of these{" "}
              <strong className={styles.strong}>Terms</strong>, you must not use
              or access the <strong className={styles.strong}>Service</strong>.
            </p>
          </div>

          <div className={styles.block}>
            <h1>1. Eligibility</h1>
            <p>
              The Service is intended solely for individuals who are 13 years of
              age or older. By accessing or using the Service, you represent and
              warrant that:
            </p>
            <div className={styles.separate}>
              <p>• You are at least 13 years old</p>
              <p>
                • You are legally competent to enter into a binding contract;
              </p>
              <p>
                • If you are between the ages of 13 and 18 (or the applicable
                age of majority in your jurisdiction), you have obtained
                parental or legal guardian consent.
              </p>
            </div>
            <p>
              We do not knowingly collect personal information from children
              under the age of 13. If we learn that we have inadvertently
              collected such information, we will take reasonable steps to
              delete it.
            </p>
          </div>

          <div className={styles.block}>
            <h1>2. License and Payment Terms</h1>
            <p>
              Upon successful payment, Wallper grants you a limited,
              non-exclusive, non-transferable, revocable license to install and
              use the Wallper application on up to three (3) personal macOS
              devices under your control.
            </p>
            <div className={styles.subparagraph}>
              <h2>Restrictions:</h2>
              <span>
                You agree not to:
                <p>
                  • Copy, distribute, sublicense, lease, or resell the software.
                </p>
                <p>
                  • Circumvent or attempt to circumvent any license
                  restrictions.
                </p>
                <p>• Share license credentials with unauthorized parties.</p>
                <p>
                  • Reverse engineer, decompile, or otherwise attempt to derive
                  source code.
                </p>
              </span>
            </div>
            <div className={styles.subparagraph}>
              <h2>License Revocation:</h2>
              <span>
                We reserve the right to suspend or revoke any license without
                prior notice in cases of:
                <p>• Violation of these Terms.</p>
                <p>• Fraudulent or abusive usage patterns.</p>
                <p>• Security risks to our platform.</p>
              </span>
            </div>
            <div className={styles.subparagraph}>
              <h2>Refund Policy:</h2>
              <span>
                You may request a full refund within 14 calendar days of your
                original purchase date by contacting us at{" "}
                <a href="mailto:support@wallper.app" className={styles.link}>
                  support@wallper.app{" "}
                </a>
                and providing your order ID or transaction details. No
                justification is required. This refund policy does not affect
                any statutory rights available to you under local consumer
                protection laws.
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>3. User Content and Conduct</h1>

            <div className={styles.subparagraph}>
              <h2>Public Content:</h2>
              <span>
                If you choose to submit content (e.g., wallpapers) to Wallper
                public gallery:
                <p>• You retain ownership of your intellectual property.</p>
                <p>
                  • You grant Wallper a non-exclusive, worldwide, royalty-free,
                  sublicensable license to use, display, host, store, reproduce,
                  resize, and distribute your content in connection with the
                  Service.
                </p>
                <p>
                  • Submissions are subject to manual review and moderation.
                </p>
                <p>
                  • We may reject, block, or remove content that, in our sole
                  discretion, violates our standards or these Terms.
                </p>
              </span>
            </div>
            <div className={styles.subparagraph}>
              <h2>Private Content:</h2>
              <span>
                Wallpapers stored or used locally on your device are considered
                private. We:
                <p>• Do not collect, access, or process private wallpapers.</p>
                <p>• Cannot retrieve, remove, or moderate private content.</p>
                <p>
                  • Rely on you to ensure your content complies with applicable
                  laws and intellectual property rights.
                </p>
              </span>
            </div>
            <div className={styles.subparagraph}>
              <h2>Prohibited Content (Public and Private):</h2>
              <span>
                Uploading, distributing, or using content containing the
                following is strictly prohibited:
                <p>• Pornographic, sexually explicit, or NSFW material.</p>
                <p>• Content promoting hatred, violence, or discrimination.</p>
                <p>• Racist or xenophobic propaganda.</p>
                <p>• Content that violates any applicable law or regulation.</p>
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>4. Service Availability and Modifications</h1>
            <p>
              Wallper reserves the right, at any time and without prior notice,
              to:
            </p>
            <div className={styles.separate}>
              <p>
                • Modify, suspend, or discontinue any portion of the Service.
              </p>
              <p>
                • Introduce new features or discontinue existing functionality.
              </p>
              <p>
                • Temporarily or permanently remove access to the public gallery
                or other community-driven content.
              </p>
              <p>• Perform maintenance or upgrades.</p>
            </div>
            <p>
              We are under no obligation to maintain or support any feature of
              the Service indefinitely.
            </p>
          </div>

          <div className={styles.block}>
            <h1>5. Disclaimer of Warranties</h1>
            <p>
              The Service is provided on an “as is” and “as available” basis,
              without warranty of any kind, either express or implied, including
              but not limited to warranties of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
            <div className={styles.subparagraph}>
              <h2>
                While we strive to ensure reliable and stable operation, we do
                not guarantee:
              </h2>
              <span>
                <p>• That the Service will be uninterrupted or error-free.</p>
                <p>• That content will be available at all times.</p>
                <p>• That uploaded files will be retained indefinitely.</p>
              </span>
            </div>
            <p>Your use of the Service is at your sole risk.</p>
          </div>

          <div className={styles.block}>
            <h1>6. Limitation of Liability</h1>
            <p>
              To the maximum extent permitted by applicable law, Wallper, its
              affiliates, officers, employees, licensors, or service providers
              shall not be liable for:
            </p>
            <div className={styles.separate}>
              <p>
                • Any indirect, incidental, special, punitive, or consequential
                damages.
              </p>
              <p>
                • Loss of data, content, revenue, profits, or business
                opportunities.
              </p>
              <p>• Incompatibility with third-party systems or software.</p>
              <p>• Unauthorized access, loss, or alteration of your content.</p>
            </div>
            <p>
              Nothing in these Terms limits or excludes liability for gross
              negligence, willful misconduct, or any liability that cannot be
              excluded under applicable law.
            </p>
          </div>

          <div className={styles.block}>
            <h1>7. Intellectual Property</h1>
            <p>
              All content on the Service, including but not limited to the
              software, source code, designs, interfaces, logos, trademarks, and
              visual elements, are the exclusive property of Wallper or its
              licensors.
            </p>
            <div className={styles.subparagraph}>
              <h2>
                While we strive to ensure reliable and stable operation, we do
                not guarantee:
              </h2>
              <span>
                <p>• Copying, modifying, or creating derivative works.</p>
                <p>
                  • Distributing or redistributing any part of the software or
                  website.
                </p>
                <p>
                  • Reverse-engineering or attempting to extract the source
                  code.
                </p>
              </span>
            </div>
            <p>
              Use of Wallper does not grant you any right or license under any
              intellectual property owned by us or third parties.
            </p>
          </div>

          <div className={styles.block}>
            <h1>8. Privacy and Cookie Policies</h1>
            <p>Your use of the Service is also governed by our:</p>
            <div className={styles.separate}>
              <p>
                •{" "}
                <a className={styles.link} href="/policy">
                  Privacy Policy
                </a>{" "}
                — explains how we collect, process, and store personal data.
              </p>
              <p>
                •{" "}
                <a className={styles.link} href="/cookie">
                  Cookie Policy
                </a>{" "}
                — outlines how we use cookies and similar technologies.
              </p>
            </div>
            <p>
              By using Wallper, you acknowledge that you have reviewed and
              agreed to these policies.
            </p>
          </div>

          <div className={styles.block}>
            <h1>9. Governing Law and Dispute Resolution</h1>
            <p>
              These Terms and any disputes arising out of or relating to them
              shall be governed by and construed in accordance with the laws of
              Ukraine, without regard to conflict of law principles.
            </p>
            <p>
              If you are a resident of the European Union, United Kingdom, or
              other jurisdiction with mandatory consumer protection laws, you
              retain all rights granted under such local laws.
            </p>
            <div className={styles.subparagraph}>
              <h2>Dispute Resolution:</h2>
              <span>
                <p>
                  Before initiating formal legal proceedings, we encourage you
                  to contact us directly at{" "}
                  <a className={styles.link} href="mailto:support@wallper.app">
                    support@wallper.app
                  </a>
                  . We will make reasonable efforts to resolve any disputes
                  amicably.
                </p>
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>10. Changes to These Terms</h1>
            <p>
              We may amend or update these Terms from time to time to reflect
              changes in our practices, applicable laws, or the Service itself.
            </p>
            <div className={styles.separate}>
              <p>
                • All changes will be posted at:{" "}
                <a className={styles.link} href="https://wallper.app/terms">
                  https://wallper.app/terms
                </a>
                .
              </p>
              <p>
                • Material changes will be communicated through notices on the
                Website or app.
              </p>
              <p>
                • Continued use of the Service after the effective date of the
                updated Terms constitutes your acceptance.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>11. Termination</h1>
            <p>You may stop using Wallper at any time.</p>
            <div className={styles.separate}>
              <p>We reserve the right to:</p>
              <p>
                • Suspend or terminate your license and/or access to the Service
                for violation of these Terms.
              </p>
              <p>
                • Delete any public content you have uploaded that violates
                policy.
              </p>
              <p>
                • Revoke access to future updates or services if misuse is
                detected.
              </p>
            </div>
            <p>
              Termination does not limit our rights to pursue legal remedies
              under applicable law.
            </p>
          </div>

          <div className={styles.block}>
            <h1>12. Contact Information</h1>
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
