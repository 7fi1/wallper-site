import React from "react";
import styles from "./Policy.module.css";

export const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h3>Privacy Policy</h3>
          <p>Last update: June 01st, 2025</p>
        </div>
        <div className={styles.privacy}>
          <div className={styles.block}>
            <p>
              Wallper (“we”, “us”, or “our”) respects and values your privacy.
              This Privacy Policy describes the manner in which we collect, use,
              store, and disclose information in connection with the use of our
              macOS application and website, available at wallper.app
              (collectively, the “Services”). By using our Services, you
              acknowledge that you have read, understood, and agreed to the
              terms of this Privacy Policy.
            </p>
          </div>

          <div className={styles.block}>
            <h1>1. Information We Collect</h1>
            <p>
              We do not require users to register or provide personally
              identifiable information (such as name or email address) in order
              to use Wallper. However, certain technical and usage data is
              collected automatically or upon specific user action:
            </p>

            <div className={styles.subparagraph}>
              <h2>• 1.1 Device Information</h2>
              <span>
                We may collect limited technical details about your device,
                which may include:
                <p>
                  <strong>• Hardware Identifier (HWID)</strong> — used to bind
                  license keys to specific machines.
                </p>
                <p>
                  <strong>• Operating System Version</strong> — the version of
                  macOS you are running.
                </p>
                <p>
                  <strong>• Device Name</strong> — as assigned by the operating
                  system.
                </p>
                <p>
                  <strong>• IP Address</strong> — collected for regional
                  analytics and fraud prevention.
                </p>
                <p>
                  <strong>• Approximate Geolocation</strong> — inferred from IP
                  address; country-level only.
                </p>
              </span>
            </div>

            <div className={styles.subparagraph}>
              <h2>• 1.2 Application Usage Data</h2>
              <span>
                We may collect limited technical details about your device,
                which may include: Hardware Identifier (HWID) — used to bind
                license keys to specific machines. Operating System Version —
                the version of macOS you are running. Device Name — as assigned
                by the operating system. IP Address — collected for regional
                analytics and fraud prevention. Approximate Geolocation —
                inferred from IP address; country-level only.
              </span>
            </div>

            <div className={styles.subparagraph}>
              <h2> • 1.3 Purchase and License Data</h2>
              <span>
                For users who purchase a lifetime license, we collect:
                <p>
                  <strong>• Stripe Transaction ID</strong> — used for license
                  validation and support purposes.
                </p>
                <strong>Note:</strong> We do not collect or store your payment
                method details. All transactions are handled securely by Stripe,
                a PCI-DSS compliant payment processor.
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>2. How We Use Collected Data</h1>
            <p>
              We use the information we collect solely for the purposes of
              operating, maintaining, and improving our Services. Specifically,
              we may use your data to:
            </p>
            <div className={styles.separate}>
              <p>• Facilitate the delivery and enforcement of license keys.</p>
              <p>
                • Detect fraudulent activity and ensure licensing compliance.
              </p>
              <p>
                • Enable functionality such as applying wallpapers or submitting
                uploads.
              </p>
              <p>• Facilitate the delivery and enforcement of license keys.</p>
              <p>
                • Improve application performance, detect bugs, and maintain
                stability.
              </p>
              <p>
                • Review and moderate user-submitted content, if applicable.
              </p>
            </div>
            <p>
              We explicitly{" "}
              <strong className={styles.strong}>do not use</strong> your data
              for:
            </p>
            <div className={styles.separate}>
              <p>• Facilitate the delivery and enforcement of license keys.</p>
              <p>
                • Detect fraudulent activity and ensure licensing compliance.
              </p>
              <p>
                • Enable functionality such as applying wallpapers or submitting
                uploads.
              </p>
              <p>• Behavioral profiling</p>
              <p>• Targeted advertising</p>
              <p>• Selling to third parties</p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>3. Data Storage and Processing</h1>
            <p>
              • Amazon S3 (Stockholm, EU region) — used for storing
              user-submitted wallpapers and related metadata.
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>• AWS Lambda (EU)</strong> —
                powers backend logic, submission handling, and license
                management.
              </p>
              <p>
                <strong className={styles.strong}>• Stripe</strong> — handles
                payment transactions and stores relevant billing metadata.
              </p>
              <p>
                <strong className={styles.strong}>• Resend</strong> — sends
                transactional support emails and license confirmations.
              </p>
              <p>
                <strong className={styles.strong}>• Vercel</strong> — hosts the
                Wallper website and performs secure content delivery.
              </p>
            </div>
            <p>
              We have entered into appropriate Data Processing Agreements (DPAs)
              with each of these providers to ensure full compliance with data
              protection regulations.
            </p>
          </div>

          <div className={styles.block}>
            <h1>4. User-Submitted Content</h1>
            <p>
              Users may optionally submit wallpapers for inclusion in Wallper’s
              public gallery. By submitting content, users grant us a{" "}
              <strong className={styles.strong}>
                non-exclusive, irrevocable, worldwide, royalty-free license{" "}
              </strong>
              to store, display, and distribute the submission within our app.
            </p>
            <div className={styles.separate}>
              <p>
                • Submissions are{" "}
                <strong className={styles.strong}>reviewed</strong> by our
                moderation team before publication.
              </p>
              <p>
                • Approved content becomes publicly visible within the
                application.
              </p>
              <p>
                <strong className={styles.strong}>
                  • Submissions are final
                </strong>{" "}
                — users may not request deletion once approved and published.
              </p>
              <p>
                <strong className={styles.strong}>• Private uploads</strong>{" "}
                (used solely within your device) remain local and{" "}
                <strong className={styles.strong}>
                  are not uploaded or collected
                </strong>{" "}
                by us.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>5. Legal Basis for Data Processing (GDPR Compliance)</h1>
            <p>
              If you are located in the European Economic Area (EEA), the United
              Kingdom, or Switzerland, we process your data under the following
              legal bases, in accordance with the{" "}
              <strong className={styles.strong}>
                General Data Protection Regulation (GDPR):
              </strong>
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>
                  • Legitimate Interest{" "}
                </strong>{" "}
                — to ensure the reliability and security of our app and enforce
                our licensing model.
              </p>
              <p>
                <strong className={styles.strong}>
                  • Contractual Necessity{" "}
                </strong>{" "}
                — to process payments and deliver corresponding license
                entitlements.
              </p>
              <p>
                <strong className={styles.strong}>• Consent </strong> — for
                optional public wallpaper uploads and gallery inclusion.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>6. Your Rights</h1>
            <div className={styles.subparagraph}>
              <h2>• 6.1 European Union (GDPR)</h2>
              <span>
                <p>
                  If you reside in the EU, you have the following rights under
                  GDPR:
                </p>
                <p>
                  <strong className={styles.strong}>• Right of Access</strong> —
                  to know what data we hold about you.
                </p>
                <p>
                  <strong className={styles.strong}>
                    • Right to Rectification
                  </strong>{" "}
                  — to correct inaccurate or outdated data.
                </p>
                <p>
                  <strong className={styles.strong}>• Right to Erasure</strong>{" "}
                  — to request deletion of your device’s data.
                </p>
                <p>
                  <strong className={styles.strong}>
                    • Right to Restrict Processing
                  </strong>{" "}
                  — in certain limited situations.
                </p>
                <p>
                  <strong className={styles.strong}>
                    • Right to Data Portability
                  </strong>{" "}
                  — to receive your data in a portable format.
                </p>
                <p>
                  <strong className={styles.strong}>• Right to Object</strong> —
                  to processing based on legitimate interest.
                </p>
                <p>
                  To exercise any of the above rights, contact:{" "}
                  <a href="mailto:support@wallper.app" className={styles.link}>
                    support@wallper.app
                  </a>{" "}
                  You also have the right to file a complaint with your local
                  data protection authority.
                </p>
              </span>
            </div>

            <div className={styles.subparagraph}>
              <h2>• 6.2 United States (California Residents – CCPA/CPRA)</h2>
              <span>
                <p>
                  If you are a resident of California, you may request the
                  following under the California Consumer Privacy Act (CCPA) and
                  California Privacy Rights Act (CPRA):
                </p>
                <p>
                  Disclosure of categories and specific pieces of personal data
                  collected.
                </p>
                <p>Deletion of your personal information.</p>
                <p>Notification that your data is not sold or shared.</p>

                <p>
                  To exercise these rights, please email:{" "}
                  <a href="mailto:support@wallper.app" className={styles.link}>
                    support@wallper.app
                  </a>{" "}
                  We will respond within the timeframe mandated by applicable
                  law (typically within 45 days).
                </p>
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>7. Data Security</h1>
            <p>
              We are committed to protecting your information using commercially
              reasonable safeguards, including:
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>
                  • TLS encryption for all data in transit
                </strong>
              </p>
              <p>
                <strong className={styles.strong}>
                  • Access controls and monitoring of cloud infrastructure
                </strong>
              </p>
              <p>
                <strong className={styles.strong}>
                  • Role-based permissions for support and administrative access
                </strong>
              </p>
              <p>
                However, no system can be guaranteed to be 100% secure. We
                cannot warrant or guarantee the absolute security of any
                information you transmit to us or that we store on your behalf.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>8. Children’s Privacy</h1>
            <p>
              Our Services are not directed to individuals under the age of 13,
              and we do not knowingly collect or solicit data from children. If
              we become aware that we have inadvertently received personal
              information from a minor, we will take reasonable steps to delete
              such information.
            </p>
          </div>

          <div className={styles.block}>
            <h1>9. Changes to This Policy</h1>
            <p>
              We may amend this Privacy Policy at our sole discretion. The most
              current version will always be accessible at:
            </p>
            <a href="https://wallper.app/privacy" className={styles.link}>
              https://wallper.app/privacy
            </a>
            <p>
              We will notify users of material changes through the app or via
              our website. Continued use of the Services following any updates
              constitutes your acceptance of the revised terms.
            </p>
          </div>

          <div className={styles.block}>
            <h1>10. Contact Information</h1>
            <p>
              For any questions, requests, or complaints related to this Privacy
              Policy or your data rights, please contact: <br /> Email:{" "}
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
