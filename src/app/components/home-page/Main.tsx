"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Main.module.css";
import Footer from "../../layout/Footer/Footer";

import { motion } from "framer-motion";

import { useModalStore } from "../../../store/ModalStore";
import LicenseModal from "../Modals/LicenseModal";
import VideosModal from "../Modals/VideosModal";
import Hero from "./Hero/Hero";
import Bottom from "./Bottom/Bottom";
import Experience from "./Experience/Experience";
import Video from "./Video/Video";
import Screen from "./Screen/Screen";
import Features from "./Features/Features";
import Statistic from "./Statistic/Main";

export const Main = () => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const { isOpen, modalType } = useModalStore();

  return (
    <main className={styles.main} ref={containerRef}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
      <Hero />
      <Statistic />
      <Screen />
      <Experience />
      <Video />
      <Features />
      <Bottom />
      <Footer />
    </main>
  );
};
