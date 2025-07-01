"use client";

import React, { useState } from "react";
import styles from "./Main.module.css";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "@/src/app/components/Modals/LicenseModal";
import VideosModal from "@/src/app/components/Modals/VideosModal";
import Footer from "@/src/app/layout/Footer/Footer";
import Bottom from "../../components/home-page/Bottom/Bottom";

const QUESTIONS_DATA = [
  {
    question: "1. What is Wallper?",
    answer:
      "Wallper is a macOS app that transforms your desktop into a vibrant visual experience using stunning 4K live video wallpapers. It's lightweight, smooth, and designed to run beautifully on all modern Macs.",
  },
  {
    question: "2. Which macOS versions are supported?",
    answer:
      "Wallper supports macOS 14 and later. For the best experience, we recommend using macOS 15 or newer.",
  },
  {
    question: "3. Will it slow down my Mac or drain the battery?",
    answer:
      "No. Wallper is highly optimized and uses almost no battery while running. Wallpapers only play when your desktop is visible - if the screen is covered by windows, playback automatically pauses to save power.",
  },
  {
    question: "4. Can I upload my own videos?",
    answer:
      "Yes! Alongside our curated collections and a user-submitted gallery, you can upload your own video files and use them as live wallpapers whenever you want (license required).",
  },
  {
    question: "5. Can I set different wallpapers on multiple monitors?",
    answer:
      "Absolutely. Wallper lets you assign different live wallpapers to each screen individually.",
  },
  {
    question: "6. Does Wallper launch automatically at startup?",
    answer:
      "Yes. Simply enable the 'Launch at Startup' option in settings and your wallpaper will load every time you boot your Mac.",
  },
  {
    question: "7. Is it a one-time purchase or subscription?",
    answer:
      "Wallper is a one-time purchase - no subscriptions. You pay once and get lifetime access, including all future updates.",
  },
  {
    question: "8. How many devices can I use Wallper on?",
    answer:
      "Each license allows you to activate Wallper on up to three devices. You can also unlink old devices in the app settings if you want to switch to a new Mac.",
  },
  {
    question: "9. Is there a free version?",
    answer:
      "Yes. The free version includes 18 high-quality live wallpapers that you can use without a license. However, uploading your own videos and accessing the full library requires a license.",
  },
  {
    question: "10. How can I contact support?",
    answer:
      "If you have any issues or questions, feel free to contact us at support@wallper.app. We're happy to help!",
  },
];

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleBlock = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const { isOpen, modalType } = useModalStore();

  return (
    <div className={styles.top_class}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.image} />
            <h3>FAQ</h3>
            <p>
              Frequently Asked Questions about Wallper 4K Live and its features.
            </p>
          </div>

          <div className={styles.block_holder}>
            {QUESTIONS_DATA.map((item, index) => (
              <motion.div
                key={index}
                className={styles.question}
                onClick={() => toggleBlock(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.question_title}>
                  <h3>{item.question}</h3>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown
                      className={`${styles.chevron} ${
                        openIndex === index ? styles.selected : ""
                      }`}
                      size={14}
                      color="#fcfdffef"
                    />
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      className={styles.description_holder}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className={styles.description}>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
        <Bottom />
      </div>
      <Footer />
    </div>
  );
};
