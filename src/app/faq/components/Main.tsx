"use client";

import React, { useState } from "react";
import Footer from "../../layout/Footer/Footer";
import styles from "./Main.module.css";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS_DATA = [
  {
    question: "What is the purpose of this FAQ?",
    answer:
      "The purpose of this FAQ is to provide answers to common questions.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at today@wallper.com. We will get back to you as soon as possible.",
  },
  {
    question: "How do I change my wallpaper?",
    answer:
      "Go to the settings page and choose a new wallpaper from the gallery.",
  },
  {
    question: "Is Wallper 4K Live free to use?",
    answer: "Yes, Wallper 4K Live offers a free version with core features.",
  },
  {
    question: "Can I upload my own wallpapers?",
    answer:
      "Yes, you can upload your own wallpapers through the upload section.",
  },
];

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleBlock = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.top_class}>
      <motion.video
        src={"/video/faq.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className={styles.main}>
        <div className={styles.container}>
          <motion.div
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>FAQ</h2>
            <p>
              Frequently Asked Questions about Wallper 4K Live and its features.
            </p>
          </motion.div>

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
      </div>

      <div className={styles.contaner_footer}>
        <Footer />
      </div>
    </div>
  );
};
