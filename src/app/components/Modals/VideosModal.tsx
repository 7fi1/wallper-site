"use client";

import React, { useEffect } from "react";
import styles from "../home-page/Main.module.css";
import { useModalStore } from "../../../store/ModalStore";
import { useVideoStore } from "../../../store/VideoStore";
import { FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../../ui/Spinner";
import PrimaryButton from "../../ui/primaryButton";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const VideosModal = () => {
  const { close } = useModalStore();
  const totalSize = useVideoStore((s) => s.totalSize);
  const fetchTotalSize = useVideoStore((s) => s.fetchTotalSize);
  const loading = useVideoStore((s) => s.loading);

  useEffect(() => {
    fetchTotalSize();
  }, [fetchTotalSize]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.license_modal}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className={styles.close}
          onClick={close}
          whileHover={{ rotate: 90, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <FaXmark size={12} />
        </motion.button>

        <motion.div
          className={styles.videoHolder}
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                className={styles.preload}
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Spinner />
              </motion.div>
            ) : (
              <motion.h1
                key="totalSize"
                className={styles.totalSize}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {totalSize}
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.div
            className={styles.textBlock}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3>Total item size in GB</h3>
            <p>
              You can buy our product license key on the main page. After the
              successful purchase — you will reach them here.
            </p>
          </motion.div>

          <motion.div
            className={styles.buttons_modal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <PrimaryButton
              text="Get Started"
              icon="FaChevronRight"
              iconPosition="right"
              popupButton="D"
              iconSize={8}
              buttonSize={36}
              fontSize={12}
              iconColor="#70757e"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideosModal;
