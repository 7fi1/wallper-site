import React from "react";
import styles from "./Video.module.css";
import PrimaryButton from "@/src/app/ui/primaryButton";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

const Video = () => {
  const router = useRouter();

  return (
    <section className={styles.video_holder}>
      <motion.div
        className={styles.top}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.h3 variants={fadeInUp} custom={0}>
          Smart Controls for Daily Comfort
        </motion.h3>
        <motion.p variants={fadeInUp} custom={1}>
          Set wallpapers to change daily, clear cache with a click, manage
          license status, and launch wallpapers automatically at startup — all
          in one place.
        </motion.p>
        <motion.div className={styles.buttons} variants={fadeInUp} custom={2}>
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

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className={styles.video}>
          <motion.video
            src={"/video/wallper.mp4"}
            autoPlay
            muted
            loop
            playsInline
            className={styles.video_player}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Video;
