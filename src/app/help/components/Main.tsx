"use client";

import React, { useEffect, useRef, useState } from "react";
import Footer from "../../layout/Footer/Footer";
import styles from "./Main.module.css";
import { motion } from "framer-motion";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";
import { Apple } from "react-ios-icons";
import COIN_ICON from "../../../../public/icons/coin.json";
import dynamic from "next/dynamic";

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleBlock = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const Player = dynamic(
    () => import("@lordicon/react").then((mod) => mod.Player),
    { ssr: false }
  );

  const playerRef = useRef(null);
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const { isOpen, modalType } = useModalStore();
  const Icon = COIN_ICON;

  return (
    <div className={styles.top_class}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
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
          transition={{ duration: 1 }}
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
              out to us at support@wallper.app. We're here to help!
            </p>
          </motion.div>

          <div className={styles.block_holder}>
            <div className={styles.contact_us}>
              <div
                onMouseEnter={() => {
                  if (isCooldown) return;
                  playerRef.current?.playFromBeginning();
                  setIsCooldown(true);
                  setTimeout(() => setIsCooldown(false), 2000);
                }}
              >
                <Player
                  {...({
                    ref: (el: any) => {
                      playerRef.current[0] = el;
                    },
                  } as any)}
                  size={64}
                  icon={Icon}
                  colorize="#007aff"
                />
              </div>

              <motion.a className={styles.button}>
                <Apple className={styles.apple_s} />
                <div>Contact our team</div>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contaner_footer}>
        <Footer />
      </div>
    </div>
  );
};
