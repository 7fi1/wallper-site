/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useMemo, useRef, useState } from "react";
import Footer from "../../layout/Footer/Footer";
import styles from "./Main.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";
import MAIL_ICON from "../../../../public/icons/mail.json";
import dynamic from "next/dynamic";
import { MdContactSupport } from "react-icons/md";
import Link from "next/link";
import Spinner from "../../components/Spinner/Spinner";

export const Main = () => {
  const Player = useMemo(
    () =>
      dynamic(() => import("@lordicon/react").then((mod) => mod.Player), {
        ssr: false,
      }),
    []
  );

  const cooldownRef = useRef<boolean[]>([]);
  const iconRefs = useRef<any[]>([]);

  const features = [{ icon: MAIL_ICON, title: "Support team" }];
  const [iconLoaded, setIconLoaded] = useState<boolean[]>(
    Array(features.length).fill(false)
  );

  const { isOpen, modalType } = useModalStore();

  const handleIconReady = (index: number) => {
    setIconLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

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
              {modalType === "license" && <LicenseModal />}
              {modalType === "videos" && <VideosModal />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.overlay}>
        <motion.video
          src={"/video/help.mp4"}
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
            <h2>Need Help?</h2>
            <p>
              If you have any questions or need assistance, feel free to reach
              out to us at support@wallper.app. We&apos;re here to help!
            </p>
          </motion.div>

          <div className={styles.block_holder}>
            <div className={styles.contact_us}>
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={index}
                    className={styles.feature}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    <motion.div
                      className={styles.icon}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onMouseEnter={() => {
                        if (cooldownRef.current[index]) return;
                        iconRefs.current[index]?.playFromBeginning();
                        cooldownRef.current[index] = true;
                        setTimeout(() => {
                          cooldownRef.current[index] = false;
                        }, 2000);
                      }}
                    >
                      {!iconLoaded[index] ? (
                        <div className={styles.icon_spinner_wrapper}>
                          <Spinner />
                        </div>
                      ) : null}

                      <div
                        style={{
                          display: iconLoaded[index] ? "block" : "none",
                        }}
                      >
                        <Player
                          {...({
                            ref: (el: any) => {
                              iconRefs.current[index] = el;
                            },
                            onReady: () => handleIconReady(index),
                          } as any)}
                          size={128}
                          icon={Icon}
                          colorize="#007aff"
                        />
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.25 + 0.2,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    >
                      {feature.title}
                    </motion.h2>
                  </motion.div>
                );
              })}

              <motion.div
                className={styles.button}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <MdContactSupport size={16} />
                <Link href="mailto:support@wallper.app">Contact our team</Link>
              </motion.div>
            </div>
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
