import React from "react";
import styles from "../../components/HomePage/Main.module.css";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import { FaAppStore } from "react-icons/fa";

import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.section
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.links}>
        <motion.div className={styles.link}>
          <BsTwitterX size={24} />
        </motion.div>
        <motion.div className={styles.link}>
          <BsGithub size={24} />
        </motion.div>
        <motion.div className={styles.link}>
          <BsDiscord size={24} />
        </motion.div>
        <motion.div className={styles.link}>
          <FaAppStore size={24} />
          App Store soon!
        </motion.div>
      </div>
      <motion.div
        className={styles.wallper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
      >
        <h3>Wallper</h3>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
