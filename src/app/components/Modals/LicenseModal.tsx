"use client";

import React, { useEffect } from "react";
import styles from "../HomePage/Main.module.css";
import { FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Apple } from "react-ios-icons";
import { useModalStore } from "../../../store/ModalStore";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const checkLicenseKeys = () => {
  const keys = localStorage.getItem("license_keys");
  if (keys) {
    return JSON.parse(keys);
  }
  return [];
};

const LICENSE_KEYS = checkLicenseKeys();

interface LicenseModalProps {
  showCloseButton?: boolean;
  checkLicenseKey?: true;
}

const LicenseModal = ({ showCloseButton }: LicenseModalProps) => {
  const { close } = useModalStore();

  useEffect(() => {
    const keys = checkLicenseKeys();
    if (keys.length > 0) {
      console.log("License keys found:", keys);
    } else {
      console.log("No license keys found.");
    }
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.license_modal}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {showCloseButton && (
          <motion.button
            className={styles.close}
            onClick={close}
            whileHover={{ rotate: 90, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FaXmark size={12} />
          </motion.button>
        )}

        <motion.div
          className={styles.license_modal_header}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <h2>My License Keys</h2>
          <p>
            You can buy our product license key on the main page. After the
            successful purchase — you will reach them here.
          </p>
        </motion.div>

        <motion.div
          className={styles.license_modal_body}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {LICENSE_KEYS.length > 0 ? (
            LICENSE_KEYS.map((key, index) => (
              <div key={index} className={styles.license_key}>
                <div className={styles.key}>{key}</div>
                <motion.button
                  className={styles.copy}
                  onClick={() => {
                    navigator.clipboard.writeText(key);
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Copy
                </motion.button>
              </div>
            ))
          ) : (
            <div className={styles.dont_have}>
              You do not have any license keys yet.
            </div>
          )}
        </motion.div>

        <motion.div
          className={styles.buttons_modal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button className={styles.download} whileTap={{ scale: 0.95 }}>
            <Apple className={styles.apple_s} />
            <div>Download for Mac</div>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LicenseModal;
