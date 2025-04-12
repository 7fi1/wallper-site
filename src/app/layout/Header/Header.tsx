"use client";

import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { Apple, Message } from "react-ios-icons";
import { motion } from "framer-motion"; // импортируем библиотеку для анимаций

const Header = () => {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <div className={styles.logo}>
            <Image
              alt="123"
              src="/logo/logo.png"
              width={1024}
              height={1024}
              className={styles.logo_image}
            />
            <h1 className={styles.title}>Wallper</h1>
          </div>

          <div className={styles.version}>v1.0</div>
        </div>

        <div className={styles.buttons}>
          <motion.button
            className={styles.FAQs}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Message filled className={styles.message} />
            FAQs
          </motion.button>

          <motion.button
            className={styles.download}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Apple className={styles.apple} />
            <span>Download for Mac</span>
          </motion.button>
        </div>
      </div>
      
    </motion.header>
  );
};

export default Header;
