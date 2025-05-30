/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Footer from "@/src/app/layout/Footer/Footer";
import styles from "./Main.module.css";
import { motion } from "framer-motion";

export const Main = () => {
  return (
    <div className={styles.top_class}>
      <div className={styles.overlay}>
        <motion.video
          src={"/video/cancel.mp4"}
          autoPlay
          muted
          loop
          playsInline
          className={styles.video}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className={styles.main}>
        <div className={styles.container}>
          <motion.div
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Oops...</h2>
            <p>
              Something went wrong with your order. Please contact us at
              support@wallper.app or try again later.
            </p>
            <p>
              If you continue to experience issues, please check your payment
              details or try using a different payment method.
            </p>
          </motion.div>

          <div className={styles.block_holder}></div>
        </div>
      </div>

      <motion.div
        className={styles.contaner_footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};
