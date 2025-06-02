"use client";
import { motion } from "framer-motion";
import React from "react";
import styles from "./Main.module.css";
import PrimaryButton from "../ui/primaryButton";
import { useRouter } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

const Main = () => {
  const router = useRouter();

  return (
    <section className={styles.top}>
      <div className={styles.light_hero} />
      <motion.div
        className={styles.greed}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.text}>
          <motion.h1 layout>Download Wallper for Free</motion.h1>

          <motion.p layout>
            Bring your desktop to life with stunning dynamic wallpapers.
            Seamless performance, elegant control, and effortless customization
            — all in one place.
          </motion.p>

          <motion.div
            className={styles.container_greed}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.div className={styles.spans} layout>
              <span>v1.0.0 release</span>
              <span>macOS 14+</span>
              <span>App Store soon!</span>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.content}>
          <div className={styles.model_wrapper}>
            <div className={styles.light} />
            <div className={styles.image} />
            <h2>Wallper</h2>
            <p>Minimum macOS 14 Sonoma</p>
            <span>DMG, 10MB • v1.0.0</span>
          </div>
          <div className={styles.buttons}>
            <PrimaryButton
              text="Download for Free"
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
              widthButton="max-content"
            />
            <a className={styles.help} href="mailto:support@wallper.app">
              Help <FaChevronRight color="#70757e" size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Main;
