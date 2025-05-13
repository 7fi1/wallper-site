/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import { Apple } from "react-ios-icons";
import { FaChevronDown, FaStore } from "react-icons/fa";
import Footer from "../../layout/Footer/Footer";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import dynamic from "next/dynamic";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const Player = dynamic(
  () => import("@lordicon/react").then((mod) => mod.Player),
  { ssr: false }
);

import COIN_ICON from "../../../../public/icons/coin.json";
import FINGERPRINT_ICON from "../../../../public/icons/fingerprint.json";
import COMPUTER_ICON from "../../../../public/icons/computer.json";
import WAND_ICON from "../../../../public/icons/wand.json";
import BATTERY_ICON from "../../../../public/icons/battery.json";
import GLOBE_ICON from "../../../../public/icons/globe.json";
import PYRAMIDS_ICON from "../../../../public/icons/pyramids.json";
import CONFETTI_ICON from "../../../../public/icons/confetti.json";
import { FaDroplet } from "react-icons/fa6";
import { useModalStore } from "../../../store/ModalStore";
import LicenseModal from "../Modals/LicenseModal";
import VideosModal from "../Modals/VideosModal";

const VIDEOS = [
  "/video/green-bmw.mp4",
  "/video/white lines.mp4",
  "/video/check2.mp4",
  "/video/abstract.mp4",
];

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [previousVideoIndex, setPreviousVideoIndex] = useState<number | null>(
    null
  );
  const playerRef = useRef(null);
  const cooldownRef = useRef<boolean[]>([]);
  const iconRefs = useRef([]);
  const containerRef = useRef(null);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      console.log("Fingerprint visitorId:", result.visitorId);

      let id = localStorage.getItem("device_id");
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("device_id", id);
      }
      console.log("Stored device_id:", id);
    })();
  }, []);

  const toggleBlock = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const sectionSteps = [0, 0.25, 0.5, 0.75];

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      let newIndex = 0;
      if (v < sectionSteps[1]) newIndex = 0;
      else if (v < sectionSteps[2]) newIndex = 1;
      else if (v < sectionSteps[3]) newIndex = 2;
      else newIndex = 3;

      if (newIndex !== videoIndex) {
        setPreviousVideoIndex(videoIndex);
        setVideoIndex(newIndex);
      }
    });
  }, [scrollYProgress, videoIndex, sectionSteps]);

  const width = useTransform(scrollYProgress, [0, 0.2], ["80vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.2], ["80vw", "100vh"]);
  const borderTopRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["10px", "0px"]
  );
  const borderWidth = useTransform(scrollYProgress, [0, 0.2], ["1px", "0px"]);
  const showDots = useTransform(scrollYProgress, [0, 0.2], [true, false]);
  const videoBrightness = useTransform(scrollYProgress, [0, 0.2], [0.6, 0.6]);
  const videoFilter = useTransform(videoBrightness, (v) => `brightness(${v})`);
  const greedOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.175, 0.2], [1, 0]);

  const blocks = [
    {
      title: "4K Live Wallpapers",
      description:
        "Not just pretty. These are cinematic, ultra-fluid scenes crafted to transform your Mac into something alive. Every motion is intentional. Every loop, seamless.",
    },
    {
      title: "Blazing macOS App",
      description:
        "No clunky web views, no lag. Built natively for macOS with buttery-smooth transitions, swipe gestures, and full Lock Screen support. It just feels right.",
    },
    {
      title: "Upload Your Own",
      description:
        "Got a drone shot? A dreamy video loop? Make it your wallpaper in seconds. Your screen, your story.",
    },
  ];

  const features = [
    { icon: PYRAMIDS_ICON, title: "Stunning 4K Live Wallpapers" },
    { icon: WAND_ICON, title: "Ultra-Smooth Performance" },
    { icon: BATTERY_ICON, title: "Smart System Optimization" },
    { icon: CONFETTI_ICON, title: "Available on the App Store" },
    { icon: FINGERPRINT_ICON, title: "Private Collections" },
    { icon: COMPUTER_ICON, title: "Up to 3 Devices per License" },
    { icon: GLOBE_ICON, title: "User-Generated Library" },
    { icon: COIN_ICON, title: "Free Version Available" },
  ];

  const { isOpen, modalType } = useModalStore();

  return (
    <main className={styles.main} ref={containerRef}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}

      <button
        className={styles.blur}
        onClick={() => setIsBlurred((prev) => !prev)}
      >
        {isBlurred ? "Unblur Video" : "Blur Video"} <FaDroplet size={12} />
      </button>

      <motion.div
        className={styles.progress}
        animate={{ opacity: scrollYProgress.get() <= sectionSteps[3] ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {sectionSteps.map((step, index) => (
          <motion.div
            key={index}
            className={styles.progress_step}
            style={{
              width: `${(1 / sectionSteps.length) * 100}%`,
              backgroundColor:
                scrollYProgress.get() >= step
                  ? "#007aff"
                  : "rgba(255, 255, 255, 0.1)",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className={styles.videoWrapper}
        style={{
          width,
          height,
          borderTopRightRadius: borderTopRadius,
          borderTopLeftRadius: borderTopRadius,
          borderWidth: borderWidth,
        }}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {showDots && (
          <div className={styles.windowDots}>
            <div className={styles.red} />
            <div className={styles.yellow} />
            <div className={styles.green} />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.video
            key={VIDEOS[videoIndex]}
            src={VIDEOS[videoIndex]}
            autoPlay
            muted
            loop
            playsInline
            className={`${styles.video_player} ${
              isBlurred ? styles.video_blurred : ""
            }`}
            style={{ filter: videoFilter }}
            initial={{ opacity: previousVideoIndex === videoIndex ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: previousVideoIndex === videoIndex ? 0 : 1.2,
              ease: "easeInOut",
            }}
          />
        </AnimatePresence>
      </motion.div>

      {/* GREED */}
      <section className={styles.top}>
        <motion.div
          className={styles.greed}
          style={{ opacity: greedOpacity }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 layout>
            <span>Live Wallpapers</span>
            <div className={styles.flex_row}>
              <span>now for your</span>
              <motion.div
                className={styles.title_box}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Apple className={styles.apple} /> <span>Mac</span>
              </motion.div>
            </div>
          </motion.h1>

          <motion.p layout>
            A collection of powerful productivity tools all within an extendable
            launcher. Fast, ergonomic and reliable.
          </motion.p>

          <motion.div
            className={styles.container_greed}
            style={{ opacity: buttonsOpacity }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className={styles.buttons}>
              <motion.button className={styles.download}>
                <Apple className={styles.apple_s} />
                <div>Download for Mac</div>
              </motion.button>
              <motion.button className={styles.purchase}>
                <FaStore color="#fff" className={styles.check} size={14} />
                <p>Purchase</p>
                <div className={styles.price}>9.99$</div>
              </motion.button>
            </div>
            <motion.div className={styles.spans} layout>
              <span>v1.0.0 release</span>
              <span>macOS 14+</span>
              <span>App Store soon!</span>
            </motion.div>
          </motion.div>
        </motion.div>
        {/* LAPTOP */}
        <motion.section
          className={styles.laptop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.holders}>
            {blocks.map((text, index) => (
              <motion.div
                key={index}
                className={styles.block}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <div className={styles.text} onClick={() => toggleBlock(index)}>
                  <h2>{text.title}</h2>
                  <FaChevronDown
                    className={`${styles.chevron} ${
                      openIndex === index ? styles.selected : ""
                    }`}
                    strokeWidth={1}
                  />
                </div>
                {openIndex === index && (
                  <motion.div
                    className={styles.description_holder}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={styles.description}>{text.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className={styles.holders}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className={styles.image} />
          </motion.div>
        </motion.section>
        {/* FEATURES */}
        <motion.section
          className={styles.features}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          id="features"
        >
          <div className={styles.features_inner}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.feature}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {Icon && (
                    <div
                      onMouseEnter={() => {
                        if (cooldownRef.current[index]) return;
                        iconRefs.current[index]?.playFromBeginning();
                        cooldownRef.current[index] = true;
                        setTimeout(() => {
                          cooldownRef.current[index] = false;
                        }, 2000);
                      }}
                    >
                      <Player
                        {...({
                          ref: (el: any) => {
                            iconRefs.current[index] = el;
                          },
                        } as any)}
                        size={64}
                        icon={Icon}
                        colorize="#007aff"
                      />
                    </div>
                  )}
                  <h2>{feature.title}</h2>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
        <Footer />
      </section>
    </main>
  );
};
