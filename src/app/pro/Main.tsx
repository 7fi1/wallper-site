import React from "react";
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
    { title: "Daily Limit", free: "123", pro: "123123" },
    { title: "RESTful API", free: false, pro: true },
    { title: "SMTP Relay", free: false, pro: true },
    { title: "Official SDKs", free: false, pro: true },
    { title: "Schedule Emails", free: false, pro: true },
  ];

  const router = useRouter();
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
                const res = await fetch("/api/checkout_session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
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
          <h1>Customer Support</h1>
          <div className={styles.table_content}>
            <div className={styles.table_header}>
              <div className={styles.header}>Free</div>
              <div className={styles.header}>Pro</div>
            </div>
            <div className={styles.table_rows}>
              {CustomerSupport.map((item, idx) => (
                <div key={idx} className={styles.row}>
                  <div className={styles.row_title}>{item.title}</div>
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
                        item.free
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
