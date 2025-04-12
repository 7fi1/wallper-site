"use client";

import React, { useState } from "react";
import styles from "./Main.module.css";
import { Apple } from "react-ios-icons";
import { FaAppStore, FaChevronDown, FaLaptop, FaStore } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaMountainSun } from "react-icons/fa6";
import { PiSpeedometerFill } from "react-icons/pi";
import { SiMusicbrainz } from "react-icons/si";
import { IoIosAppstore } from "react-icons/io";
import {
  BsCollectionFill,
  BsDiscord,
  BsGithub,
  BsTwitterX,
} from "react-icons/bs";
import { MdPhotoLibrary } from "react-icons/md";
import { TbFreeRights } from "react-icons/tb";

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleBlock = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  const blocks = [
    {
      title: "prrfff",
      description:
        "Answer calls or messages from your iPhone directly on your Mac. See and control what’s on your iPhone from your Mac with iPhone Mirroring. Use Universal Clipboard to copy images, video, or text from your iPhone, then paste into another app on your nearby Mac. And thanks to iCloud, you can access your files from either your iPhone or your Mac. And so much more.",
    },
    {
      title: "Exclusive for Mac2",
      description:
        "Sketch on your iPad and have it appear instantly on your Mac. Or use your iPad as a second display, so you can work on one screen while you reference the other. You can even start a Final Cut Pro project on your iPad and continue it on your Mac.",
    },
    {
      title: "Exclusive for Mac3",
      description:
        "Automatically log in to your Mac when you’re wearing your Apple Watch with Auto Unlock. No password typing required.",
    },
  ];

  const features = [
    { icon: FaMountainSun, title: "Stunning 4K Live Wallpapers" },
    { icon: PiSpeedometerFill, title: "Ultra-Smooth Performance" },
    { icon: SiMusicbrainz, title: "Smart System Optimization" },
    { icon: IoIosAppstore, title: "Available on the App Store" },
    { icon: BsCollectionFill, title: "Private Collections" },
    { icon: FaLaptop, title: "Up to 3 Devices per License" },
    { icon: MdPhotoLibrary, title: "User-Generated Library" },
    { icon: TbFreeRights, title: "Free Version Available" },
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
                  <Icon
                    className={styles.icon_feature}
                    size={64}
                    // color="#007aff"
                  />
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
