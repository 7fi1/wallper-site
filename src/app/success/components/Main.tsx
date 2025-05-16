/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import Footer from "../../layout/Footer/Footer";
import styles from "./Main.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const Main = () => {
  const { isOpen, modalType } = useModalStore();
  const searchParams = useSearchParams();
  const uuid = searchParams.get("k");

  useEffect(() => {
    if (!uuid) return;

    try {
      const existing = localStorage.getItem("license_keys");
      const keys = existing ? JSON.parse(existing) : [];

      if (!keys.includes(uuid)) {
        keys.push(uuid);
        localStorage.setItem("license_keys", JSON.stringify(keys));
      }
    } catch (e) {
      console.error("❌ Failed to save license:", e);
    }
  }, [uuid]);

  return (
    <div className={styles.top_class}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.license_modal_overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {modalType === "license" && (
                <LicenseModal showCloseButton={true} />
              )}
              {modalType === "videos" && <VideosModal />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.overlay}>
        <motion.video
          src={"/video/success.mp4"}
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
            <h2>Success!</h2>
            <p>
              Thank you for your purchase. Your order has been successfully
              processed. You will receive an email with your license key. You
              also can check your license key in the top left corner of the
              site.
            </p>
          </motion.div>

          <div className={styles.block_holder}>
            <LicenseModal showCloseButton={false} />
          </div>
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
