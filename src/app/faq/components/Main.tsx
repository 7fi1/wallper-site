"use client";

import React, { useState } from "react";
import Footer from "../../layout/Footer/Footer";
import styles from "./Main.module.css";
import { FaChevronDown } from "react-icons/fa";

import { motion } from "framer-motion";

const QUESTIONS_DATA = [
  {
    question: "What is the purpose of this FAQ?",
    answer:
      "The purpose of this FAQ is to provide answers to common questions.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at today @wallper.com. We will get back to you as soon as possible. ",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at today @wallper.com. We will get back to you as soon as possible. ",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at today @wallper.com. We will get back to you as soon as possible. ",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact support via email at today @wallper.com. We will get back to you as soon as possible. ",
  },
];

export const Main = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleBlock = (index: number) => {
    if (openIndex !== index) {
      setOpenIndex(index);
    }
  };

  return (
    <div className={styles.top_class}>
      <motion.video
        src={"/video/abstract.mp4"}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>FAQ</h2>
            <p>
              Frequently Asked Questions about Wallper 4K Live and its features.
            </p>
          </div>
          <div className={styles.block_holder}>
            {QUESTIONS_DATA.map((item, index) => (
              <div
                key={index}
                className={styles.question}
                onClick={() => toggleBlock(index)}
              >
                <div className={styles.question_title}>
                  <h3>{item.question}</h3>
                  <FaChevronDown
                    className={`${styles.chevron} ${
                      openIndex === index ? styles.selected : ""
                    }`}
                    strokeWidth={1}
                  />
                </div>
                {openIndex === index && <p>{item.answer}</p>}
              </div>
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
