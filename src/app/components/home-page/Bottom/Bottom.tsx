import React from "react";
import styles from "./Bottom.module.css";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import PrimaryButton from "@/src/app/ui/primaryButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Анимация появления
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

const Bottom = () => {
  const router = useRouter();
  return (
    <section className={styles.bottom}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.div className={styles.title} variants={fadeInUp} custom={0}>
          <h2>Desktop reimagined. Available today.</h2>
          <motion.div className={styles.buttons} variants={fadeInUp} custom={1}>
            <PrimaryButton
              text="Get started"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              buttonSize={48}
              fontSize={16}
              fontWeight={500}
              iconColor="#70757e"
              onClick={() => {
                router.push("/download");
              }}
            />
            <SecondaryButton
              text="Contact Us"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              buttonSize={48}
              fontSize={16}
              fontWeight={500}
              iconColor="#ccc"
              onClick={() => {
                window.location.href = "mailto:support@wallper.app";
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Bottom;
