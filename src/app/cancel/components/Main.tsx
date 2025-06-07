/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useModalStore } from "@/src/store/ModalStore";
import styles from "./Main.module.css";
import { motion } from "framer-motion";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";

export const Main = () => {
  const { isOpen, modalType } = useModalStore();
  return (
    <section className={styles.top}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
      <div className={styles.light_hero} />
      <motion.div
        className={styles.greed}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.text}>
          <motion.h1 layout>Oops...</motion.h1>

          <motion.p layout className={styles.paragraph}>
            Something went wrong with your order. Please contact us at{" "}
            <a className={styles.link} href="mailto:support@wallper.app">
              support@wallper.app
            </a>{" "}
            or try again later.
          </motion.p>

          <motion.p layout className={styles.paragraph}>
            If you continue to experience issues, please check your payment
            details or try using a different payment method.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};
