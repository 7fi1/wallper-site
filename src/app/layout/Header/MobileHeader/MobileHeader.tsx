import React from "react";
import styles from "./MainHeader.module.css";
import { useRouter } from "next/navigation";
import { XMark } from "react-ios-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import PrimaryButton from "@/src/app/ui/primaryButton";
import SecondaryButton from "@/src/app/ui/secondaryButton";

interface MobileHeaderProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const navItems = [
  {
    name: "Buy Pro version",
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
  { name: "Videos", link: "/videos", onClick: null },
  { name: "FAQ", link: "/faq", onClick: null },
  { name: "Get Help", link: "/help", onClick: null },
  { name: "Cookie Policy", link: "/cookie", onClick: null },
  { name: "Privacy Policy", link: "/privacy", onClick: null },
  { name: "Terms of Service", link: "/terms", onClick: null },
];

const MobileHeader: React.FC<MobileHeaderProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.main}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <div className={styles.container}>
            <div className={styles.logo_container}>
              <motion.button
                className={styles.logo}
                onClick={() => router.push("/")}
                aria-label="На главную"
                type="button"
                whileHover={{ y: -2 }}
              >
                <h1 className={styles.title}>Wallper</h1>
              </motion.button>

              <motion.button
                className={styles.close}
                onClick={onClose}
                aria-label="Close menu"
                type="button"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ rotate: 90 }}
              >
                <XMark />
              </motion.button>
            </div>
          </div>

          <motion.div className={styles.links}>
            <motion.ul className={styles.ul}>
              {navItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  className={styles.li}
                  variants={linkVariants}
                >
                  <Link
                    className={styles.link}
                    href={item.link}
                    onClick={item.onClick}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className={styles.buttons}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <PrimaryButton
                text="Get started"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={8}
                iconColor="#70757e"
              />
              <SecondaryButton
                text="Contact Us"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={8}
                iconColor="#ccc"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MobileHeader;
