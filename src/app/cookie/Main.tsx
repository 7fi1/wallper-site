import React from "react";
import styles from "./Cookie.module.css";

export const Main = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.image} />
          <h3>Cookie Policy</h3>
          <p>Last update: June 01st, 2025</p>
        </div>
        <div className={styles.privacy}>
          <div className={styles.block}>
            <p>
              This Cookie Policy{" "}
              <strong className={styles.strong}>(“Policy”) </strong> describes
              how Wallper (“Wallper”, “we”, “us”, or “our”) utilizes cookies and
              related technologies in connection with your access to and use of
              our website, available at{" "}
              <a href="https://www.wallper.app/" className={styles.link}>
                https://wallper.app{" "}
              </a>
              (the “Website”). This Policy should be read in conjunction with
              our{" "}
              <a href="/policy" className={styles.link}>
                Privacy Policy
              </a>
              , which outlines how we process personal data.
            </p>
            <p>
              By continuing to browse or use our Website, you consent to our use
              of cookies and similar technologies as described herein, unless
              you opt out or adjust your browser settings as described below.
            </p>
          </div>

          <div className={styles.block}>
            <h1>1. Definitions: What Are Cookies and Similar Technologies?</h1>
            <p>
              Cookies are small data files that are downloaded to your browser
              or device when you visit a website. They serve a variety of
              functions, including enabling core website operations, improving
              user experience, performing analytics, and facilitating secure
              transactions. In addition to cookies, we may use:
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>• Local Storage </strong> –
                Used to store data locally within your browser for functionality
                purposes (e.g., license key persistence).
              </p>
              <p>
                <strong className={styles.strong}>
                  • Device Fingerprinting
                </strong>{" "}
                – Used in a limited scope for security and anti-fraud
                mechanisms, not for behavioral tracking or advertising.
              </p>

              <p>
                These technologies do not allow us to directly identify you, but
                some may be considered personal data under applicable privacy
                laws, such as the{" "}
                <strong className={styles.strong}>
                  General Data Protection Regulation (GDPR)
                </strong>{" "}
                or the{" "}
                <strong className={styles.strong}>
                  California Consumer Privacy Act (CCPA).
                </strong>
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>2. Categories of Cookies We Use</h1>

            <div className={styles.subparagraph}>
              <h2>a) Strictly Necessary Cookies</h2>
              <span>
                These cookies are fundamental to the operation of the Website.
                Without them, essential features—such as session security and
                licensing—would not function properly.
                <br />
                Examples include:
                <p>
                  • Stripe session management:{" "}
                  <code className={styles.code}>stripe_mid</code>,{" "}
                  <code className={styles.code}>stripe_sid</code>,{" "}
                  <code className={styles.code}>stripe_orig_props</code>,{" "}
                  <code className={styles.code}>stripe.csrf</code>
                </p>
                <p>
                  • Session and authentication:{" "}
                  <code className={styles.code}>admin_session</code>,{" "}
                  <code className={styles.code}>jwt_token</code>,{" "}
                  <code className={styles.code}>Secure-has_logged_in</code>
                </p>
                <p>
                  • Consent and preference:{" "}
                  <code className={styles.code}>cookie-perms</code>
                </p>
                <p>
                  • Device recognition:{" "}
                  <code className={styles.code}>machine_identifier</code>,{" "}
                  <code className={styles.code}>
                    private_machine_identifier
                  </code>
                  , <code className={styles.code}>cookie-fingerprint</code>
                </p>
                <p>
                  • Local License Key Storage:{" "}
                  <code className={styles.code}>localStorage:license_key</code>{" "}
                  (contains license ID and HWID)
                </p>
                Retention Period:
                <p>• Session cookies: Deleted upon browser closure.</p>
                <p>
                  • Persistent cookies: Retained for up to 1 year unless deleted
                  by the user.
                </p>
              </span>
            </div>

            <div className={styles.subparagraph}>
              <h2>b) Analytics Cookies</h2>
              <span>
                Used to gain insights into how visitors interact with our
                Website and to improve performance.
              </span>
              <p>
                • Examples: <code className={styles.code}>_ga</code>,{" "}
                <code className={styles.code}>_gid</code>,{" "}
                <code className={styles.code}>cid</code>, (set by Google
                Analytics)
              </p>
              <p>
                • Consent Requirement: Yes — these are only enabled after user
                consent is provided via the cookie banner.
              </p>
              <p>• Storage Duration: Up to 26 months</p>
            </div>

            <div className={styles.subparagraph}>
              <h2>c) Functional Cookies (Optional)</h2>
              <span>
                Not currently in use, but may be introduced in the future to
                enhance user personalization (e.g., saving wallpaper
                preferences). These will only be activated with your explicit
                consent.
              </span>
            </div>
          </div>

          <div className={styles.block}>
            <h1>3. Third-Party Services and Their Cookies</h1>
            <p>
              We integrate third-party services that may set their own cookies
              under their respective policies:
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>• Stripe </strong> — For
                secure payment processing.{" "}
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  className={styles.link}
                >
                  Stripe Privacy Policy
                </a>
              </p>
              <p>
                <strong className={styles.strong}>• Google Analytics</strong> —
                For aggregate usage metrics.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  className={styles.link}
                >
                  Google Privacy Policy
                </a>
              </p>
              <p>
                • (Potential) Email delivery and CDN platforms – e.g., Vercel,
                Resend
              </p>
            </div>
            <p>
              We encourage you to review the privacy and cookie policies of any
              third parties that may interact with our Website.
            </p>
          </div>

          <div className={styles.block}>
            <h1>4. Cookie Consent Mechanism</h1>
            <p>
              In compliance with applicable laws (e.g., GDPR, ePrivacy
              Directive, and CPRA), Wallper implements a{" "}
              <strong className={styles.strong}>Cookie Consent Banner</strong>{" "}
              on first visit that allows users to:
            </p>
            <div className={styles.separate}>
              <p>• Accept all cookies</p>
              <p>• Reject non-essential cookies</p>
              <p>• Customize preferences by category (where available)</p>
            </div>
            <p>
              Users can later update or withdraw their consent at any time via:
            </p>
            <div className={styles.separate}>
              <p>• The cookie settings panel on our Website (if available)</p>
              <p>• Clearing cookies through browser settings</p>
            </div>
            <p>
              <strong className={styles.strong}>Important:</strong> Disabling
              certain cookies may impair functionality, including secure login,
              license validation, or transaction capabilities.
            </p>
          </div>

          <div className={styles.block}>
            <h1>5. Legal Basis for Using Cookies</h1>
            <p>
              Under the{" "}
              <strong className={styles.strong}>
                General Data Protection Regulation (GDPR)
              </strong>{" "}
              and equivalent international privacy laws, we rely on the
              following legal bases:
            </p>
            <div className={styles.separate}>
              <p>
                <strong className={styles.strong}>
                  • Legitimate Interests
                </strong>{" "}
                – for cookies essential to security, licensing, or platform
                stability.
              </p>
              <p>
                <strong className={styles.strong}>• User Consent</strong> — for
                analytics and optional functionality cookies.
              </p>
              <p>
                <strong className={styles.strong}>
                  • Contractual Necessity{" "}
                </strong>{" "}
                – for session and payment cookies that facilitate completion of
                transactions.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>6. Your Rights as a Data Subject</h1>
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data collected via cookies:
            </p>
            <div className={styles.subparagraph}>
              <h2>Under GDPR (EU/EEA/UK):</h2>
              <span>
                <p>• The right to access, rectify, or erase personal data.</p>
                <p>• The right to object to processing or restrict it.</p>
                <p>• The right to withdraw cookie consent at any time.</p>
                <p>
                  • The right to lodge a complaint with your local Data
                  Protection Authority (DPA).
                </p>
              </span>
            </div>

            <div className={styles.subparagraph}>
              <h2>Under CCPA/CPRA (California, USA):</h2>
              <span>
                <p>
                  • The right to know what personal data is collected via
                  cookies.
                </p>
                <p>• The right to delete cookie-derived personal data.</p>
                <p>
                  • The right to opt out of the sale or sharing of personal data
                  (Wallper does not sell any user data).
                </p>
                <p>
                  • The right to non-discrimination for exercising your data
                  rights.
                </p>
              </span>
            </div>
            <p>
              To exercise your rights, please contact:{" "}
              <a className={styles.link} href="mailto:support@wallper.app">
                support@wallper.app
              </a>
            </p>
          </div>

          <div className={styles.block}>
            <h1>7. Security of Cookie Data</h1>
            <p>
              We implement appropriate technical and organizational safeguards
              to protect cookie-derived data, including:
            </p>
            <div className={styles.separate}>
              <p>• Secure HTTPS connections (TLS encryption)</p>
              <p>• Limited access by authorized personnel</p>
              <p>• Use of privacy-focused, compliant third-party tools</p>
              <p>
                Despite these efforts, no system can guarantee absolute
                security. Users are encouraged to manage their own cookie
                settings for enhanced privacy.
              </p>
            </div>
          </div>

          <div className={styles.block}>
            <h1>8. Policy Updates</h1>
            <p>
              We reserve the right to update this Cookie Policy at our
              discretion to reflect changes in technology, law, or our
              practices. The most current version will always be published at:{" "}
              <a href="https://wallper.app/cookies" className={styles.link}>
                https://wallper.app/cookies.
              </a>
            </p>
            <p>
              Where legally required, we will notify users of material changes
              via a cookie banner, on-site notice, or direct email communication
              (if contact has been established).
            </p>
          </div>

          <div className={styles.block}>
            <h1>9. Contact Information</h1>
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
