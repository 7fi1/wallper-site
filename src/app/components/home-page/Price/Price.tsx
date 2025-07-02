import React from "react";
import styles from "./Price.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import PrimaryButton from "@/src/app/ui/primaryButton";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

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
  { text: "Lifetime updates", available: true },
];

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Price = () => {
  const router = useRouter();

  return (
    <section className={styles.wrapper}>
      <div className={styles.price}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h1>Pricing</h1>
            <p>
              Get started for free. Switch to a paid plan when you&apos;re
              ready.
            </p>
            <PrimaryButton
              text="More Details"
              buttonSize={40}
              fontSize={14}
              widthButton="max-content"
              iconColor="#70757e"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              fontWeight={500}
              onClick={() => {
                router.push("/pro");
              }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.block}>
              <h4>0$</h4>
              <h1>Free</h1>
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

              <PrimaryButton
                text="Download"
                buttonSize={40}
                fontSize={14}
                widthButton="max-content"
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
            <div className={styles.block}>
              <h4>
                10$<h3 className={styles.label}>One time</h3>
              </h4>
              <h1 className={styles.pro}>Pro</h1>
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

              <PrimaryButton
                text="Buy for 9.99$"
                buttonSize={40}
                fontSize={14}
                widthButton="max-content"
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
        </div>
      </div>
    </section>
  );
};

export default Price;
