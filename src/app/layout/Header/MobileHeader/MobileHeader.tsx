import React from "react";
import styles from "./MainHeader.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Apple, XMark } from "react-ios-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { FaLink } from "react-icons/fa6";

interface MobileHeaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const closeVariants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.5 },
  visible: { rotate: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { rotate: 90, opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

const navItems = [
  {
    name: "Buy PRO version",
    link: "",
    onClick: async () => {
      const res = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
  },
  { name: "Frequently Asked Questions", link: "/faq", onClick: null },
  { name: "Get Help", link: "/help", onClick: null },
];

const MobileHeader: React.FC<MobileHeaderProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  return (
    <>
      {isOpen && (
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.logo_container}>
              <button
                className={styles.logo}
                onClick={() => router.push("/")}
                aria-label="На главную"
                type="button"
              >
                <Image
                  alt="Wallper Logo"
                  src="/logo/logo.png"
                  width={1024}
                  height={1024}
                  className={styles.logo_image}
                />
                <h1 className={styles.title}>Wallper 4K Live</h1>
              </button>
              <motion.button
                className={styles.close}
                onClick={onClose}
                aria-label="Close menu"
                type="button"
                variants={closeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileTap={{ scale: 0.85, rotate: 45 }}
              >
                <XMark />
              </motion.button>
            </div>
          </div>
          <div className={styles.links}>
            <ul className={styles.ul}>
              {navItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  className={styles.li}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                >
                  <FaLink color="#007aff" />

                  <Link
                    className={styles.link}
                    href={item.link}
                    onClick={item.onClick}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className={styles.download}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <Apple className={styles.apple} />
              <span>Download for Mac</span>
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
