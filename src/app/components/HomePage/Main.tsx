"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import { Apple } from "react-ios-icons";
import { FaAppStore, FaChevronDown, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";

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

import dynamic from "next/dynamic";

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const playerRef = useRef(null);
  const cooldownRef = useRef<boolean[]>([]);

  const iconRefs = useRef([]);

  const toggleBlock = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

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

  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span>Live Wallpapers</span>
          <div className={styles.flex_row}>
            <span>now for your</span>
            <div className={styles.title_box}>
              <Apple className={styles.apple} /> <span>Mac</span>
            </div>
          </div>
        </motion.h1>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button className={styles.download}>
            <Apple className={styles.apple_s} />
            <div>Download for Mac</div>
          </button>
          <button className={styles.purcase}>
            <FaStore color="#fff" className={styles.check} size={22} />
            <p>Purchase</p>
            <div className={styles.price}>9.99$</div>
          </button>
        </motion.div>

        <section className={styles.laptop}>
          <div className={styles.holders}>
            {blocks.map((text, index) => (
              <motion.div
                key={index}
                className={styles.block}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
              >
                <div className={styles.text} onClick={() => toggleBlock(index)}>
                  <h2>{text.title}</h2>
                  <FaChevronDown
                    className={`${styles.chevron} ${
                      openIndex === index ? styles.selected : ""
                    }`}
                    strokeWidth={1}
                    size={20}
                  />
                </div>

                {openIndex === index && (
                  <motion.div
                    className={styles.descrition_holder}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className={styles.descrition}>{text.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className={styles.holders}>
            <div className={styles.image} />
          </div>
        </section>
        <section className={styles.features}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={styles.feature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: index * 0.3 }}
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
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      size={96}
                      icon={Icon}
                    />
                  </div>
                )}
                <h2>{feature.title}</h2>
              </motion.div>
            );
          })}
        </section>
        <button className={styles.download}>
          <Apple className={styles.apple_s} />
          <div>Download for Mac</div>
        </button>
        <section className={styles.footer}>
          <div className={styles.links}>
            <div className={styles.link}>
              <BsTwitterX size={24} />
            </div>
            <div className={styles.link}>
              <BsGithub size={24} />
            </div>
            <div className={styles.link}>
              <BsDiscord size={24} />
            </div>
            <div className={styles.link}>
              <FaAppStore size={24} />
              Available on the App Store
            </div>
          </div>
          <div className={styles.wallper}>
            <h3>Wallper</h3>
          </div>
        </section>
      </section>
    </main>
  );
};
