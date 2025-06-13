import React, { useState } from "react";
import styles from "./Pro.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import PrimaryButton from "../ui/primaryButton";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Bottom from "../components/home-page/Bottom/Bottom";
import { motion } from "framer-motion";
import LicenseModal from "../components/Modals/LicenseModal";
import VideosModal from "../components/Modals/VideosModal";
import { useModalStore } from "@/src/store/ModalStore";

export const Pro = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const FreeArray = [
    { text: "18 Wallpapers", available: true },
    { text: "Full macOS app experience", available: true },
    { text: "Auto-start wallpapers", available: true },
    { text: "No custom uploads", available: false },
    { text: "No access to user gallery", available: false },
    { text: "Full settings experience", available: false },
  ];

  const ProArray = [
    { text: "500+ 4K live wallpapers", available: true },
    { text: "Everything in Free", available: true },
    { text: "Access community gallery", available: true },
    { text: "Upload your own videos", available: true },
    { text: "Use on up to 3 Macs", available: true },
    { text: "Lifetime updates — no subscription", available: true },
  ];

  const CustomerSupport = [
    {
      title: "Payment",
      free: "Once",
      pro: "Subscription",
      description: "How often do you pay? One-time or monthly?",
    },
    {
      title: "Video Quality",
      free: "True 4K",
      pro: "Mixed",
      description: "Actual 4K resolution vs. compressed or low-bitrate video.",
    },
    {
      title: "Library Size",
      free: "500+",
      pro: "50–100",
      description: "How many wallpapers are included out of the box.",
    },
    {
      title: "Multi-Monitor",
      free: "Seamless",
      pro: "Unsupported",
      description:
        "Support for applying different or synced wallpapers on multiple displays.",
    },
    {
      title: "Devices Included",
      free: "3 Macs",
      pro: "1 device",
      description: "How many Macs you can use per license.",
    },
    {
      title: "Custom Uploads",
      free: "Full",
      pro: "Restricted",
      description: "Can you add your own videos as wallpapers?",
    },
    {
      title: "Battery Usage",
      free: "Low",
      pro: "Inconsistent",
      description:
        "How much the wallpapers affect battery drain during daily use.",
    },
    {
      title: "Performance",
      free: "MAX",
      pro: "Slow",
      description: "Impact on system speed and memory usage.",
    },
    {
      title: "Offline Access",
      free: "Available",
      pro: "Cloud",
      description: "Do wallpapers work without internet connection?",
    },
    {
      title: "Cache Control",
      free: "Clearable",
      pro: "No user control",
      description: "Can you manage or clear downloaded data manually?",
    },
    {
      title: "Moderation",
      free: "Videos reviewed",
      pro: "No checks",
      description: "Are community wallpapers reviewed before being published?",
    },
    {
      title: "Support",
      free: "Priority support",
      pro: "Limited or none",
      description: "Access to help, response times, and available channels.",
    },
  ];

  const router = useRouter();
  const { isOpen, modalType } = useModalStore();
  const [opacity, setOpacity] = useState<number>(0);

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
          <h3>Pro version</h3>
          <p>
            Get started for free. Switch to a paid plan when you&apos;re ready.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.content_block}>
            <div className={styles.label}>
              <h1>Free</h1>
            </div>
            <div className={styles.price}>
              <h1>0$</h1>
              <span>per license</span>
            </div>
            <div className={styles.video_count}>18 Wallpapers</div>
            <div className={styles.features}>
              <ul>
                {FreeArray.map((item, idx) => (
                  <div key={idx}>
                    {item.text && (
                      <li>
                        {item.available ? (
                          <FaCheckCircle
                            color="#43fea4ab"
                            className={styles.icon}
                            size={16}
                          />
                        ) : (
                          <FaCircleXmark
                            color="#e5edfd7b"
                            className={styles.icon}
                            size={16}
                          />
                        )}
                        {item.text}
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            </div>
            <PrimaryButton
              text="Get started"
              buttonSize={40}
              fontSize={14}
              widthButton="100%"
              iconColor="#70757e"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              fontWeight={500}
              onClick={() => {
                router.push("/download");
              }}
            />
          </div>
          <div className={styles.content_block}>
            <div className={styles.label}>
              <h1>Pro</h1>
              <span>Recommended</span>
            </div>
            <div className={styles.price}>
              <h1>10$</h1>
              <span>per license</span>
            </div>
            <div className={styles.video_count}>500+ 4K Wallpapers</div>
            <div className={styles.features}>
              <ul>
                {ProArray.map((item, idx) => (
                  <div key={idx}>
                    {item.text && (
                      <li>
                        {item.available ? (
                          <FaCheckCircle
                            color="#43fea4ab"
                            className={styles.icon}
                            size={16}
                          />
                        ) : (
                          <FaCircleXmark
                            color="#e5edfd7b"
                            className={styles.icon}
                            size={16}
                          />
                        )}
                        {item.text}
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            </div>
            <PrimaryButton
              text="Get started"
              buttonSize={40}
              fontSize={14}
              widthButton="100%"
              iconColor="#70757e"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              fontWeight={500}
              onClick={async () => {
                const isBrowser = typeof window !== "undefined";
                const metadata = {
                  license_uuid:
                    typeof crypto !== "undefined" && crypto.randomUUID
                      ? crypto.randomUUID()
                      : Math.random().toString(36).substring(2, 15),
                  user_timezone: isBrowser
                    ? Intl.DateTimeFormat().resolvedOptions().timeZone
                    : "",
                  locale: isBrowser ? navigator.language : "",
                  device_type: isBrowser
                    ? /Mobi|Android/i.test(navigator.userAgent)
                      ? "mobile"
                      : "desktop"
                    : "desktop",
                  referrer: isBrowser
                    ? document.referrer || "direct"
                    : "direct",
                };

                const res = await fetch("/api/checkout_session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ metadata }),
                });

                const data = await res.json();

                const stripe = await stripePromise;
                await stripe?.redirectToCheckout({
                  sessionId: data.sessionId,
                });
              }}
            />
          </div>
        </div>
        <div className={styles.table}>
          <h1>Wallper Advantage</h1>
          <div className={styles.table_content}>
            <div className={styles.table_header}>
              <div className={styles.header}>Wallper</div>
              <div className={styles.header}>Other</div>
            </div>
            <div className={styles.table_rows}>
              {CustomerSupport.map((item, idx) => (
                <div key={idx} className={styles.row}>
                  <div
                    className={styles.row_title}
                    onMouseEnter={() => setOpacity(idx)}
                    onMouseLeave={() => setOpacity(-1)}
                  >
                    {item.title}
                    <div
                      className={styles.title_description}
                      style={{ opacity: opacity === idx ? 1 : 0 }}
                    >
                      {item.description}
                    </div>
                  </div>

                  <div className={styles.row_values}>
                    <div className={styles.row_free}>
                      {typeof item.free === "boolean" ? (
                        item.free ? (
                          <FaCheckCircle
                            color="#43fea4ab"
                            className={styles.icon}
                            size={16}
                          />
                        ) : (
                          <FaCircleXmark
                            color="#e5edfd7b"
                            className={styles.icon}
                            size={16}
                          />
                        )
                      ) : (
                        item.free
                      )}
                    </div>
                    <div className={styles.row_pro}>
                      {typeof item.pro === "boolean" ? (
                        item.pro ? (
                          <FaCheckCircle
                            color="#43fea4ab"
                            className={styles.icon}
                            size={16}
                          />
                        ) : (
                          <FaCircleXmark
                            color="#e5edfd7b"
                            className={styles.icon}
                            size={16}
                          />
                        )
                      ) : (
                        item.pro
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Bottom />
    </main>
  );
};
