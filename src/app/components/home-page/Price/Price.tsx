import React from "react";
import styles from "./Price.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import PrimaryButton from "@/src/app/ui/primaryButton";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { basePrice } from "../Hero/Hero";
import { useAuthorDiscount } from "@/src/hooks/useAuthorDiscount";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

  const discount = useAuthorDiscount();
  const finalPrice = discount
    ? basePrice * (1 - discount.percent / 100)
    : basePrice;

  return (
    <section className={styles.wrapper}>
      <div className={styles.price}>
        <motion.div
          className={styles.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Заголовок и кнопка */}
          <motion.div className={styles.text} variants={fadeInUp} custom={0}>
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
          </motion.div>

          {/* Карточки */}
          <div className={styles.content}>
            {/* FREE PLAN */}
            <motion.div className={styles.block} variants={fadeInUp} custom={1}>
              <h4>0$</h4>
              <h1>Free</h1>
              <ul>
                {FreeArray.map((item, idx) => (
                  <div key={idx}>
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
            </motion.div>

            {/* PRO PLAN */}
            <motion.div className={styles.block} variants={fadeInUp} custom={2}>
              <h4>
                {finalPrice.toFixed(0)}$
                <h3 className={styles.label}>One time</h3>
              </h4>
              <h1 className={styles.pro}>Pro</h1>
              <ul>
                {ProArray.map((item, idx) => (
                  <div key={idx}>
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
                  </div>
                ))}
              </ul>
              <PrimaryButton
                text={`Buy for ${finalPrice.toFixed(0)}$`}
                buttonSize={40}
                fontSize={14}
                widthButton="max-content"
                iconColor="#70757e"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={10}
                fontWeight={500}
                onClick={async () => {
                  const metadata = {
                    license_uuid: crypto.randomUUID(),
                    user_timezone:
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                    locale: navigator.language,
                    device_type: /Mobi|Android/i.test(navigator.userAgent)
                      ? "mobile"
                      : "desktop",
                    referrer: document.referrer || "direct",
                    discount: discount ? discount.code : null,
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Price;
