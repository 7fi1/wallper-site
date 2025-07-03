/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";
import { FaReddit } from "react-icons/fa6";
import { FaDiscord, FaGithub, FaTiktok } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  const icons = [
    { icons: <FaReddit />, link: "https://www.reddit.com/r/wallper/" },
    { icons: <FaDiscord />, link: "https://discord.gg/ksxrdnETuc" },
    { icons: <FaTiktok />, link: "https://www.tiktok.com/@wallper.live" },
    { icons: <FaGithub />, link: "https://github.com/alxndlk" },
  ];

  return (
    <motion.section
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.line} />
      <div className={styles.light} />

      <motion.div className={styles.container} variants={fadeInUp} custom={0}>
        <motion.div className={styles.grid} variants={fadeInUp} custom={1}>
          {/* Company Info */}
          <motion.div
            className={styles.company_info}
            variants={fadeInUp}
            custom={2}
          >
            <div>
              <p className={styles.smal_p}>© Wallper App 2025</p>
              <p className={styles.smal_p}>All rights reserved</p>
            </div>

            <motion.div className={styles.icons}>
              {icons.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  className={styles.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeInUp}
                  custom={3 + index}
                >
                  {item.icons}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className={styles.reachability}
              variants={fadeInUp}
              custom={7}
            >
              Wallper API & Database status
            </motion.div>

            <motion.span variants={fadeInUp} custom={8}>
              Made by{" "}
              <a
                className={styles.telegram_link}
                href="https://t.me/alxndlk"
                target="_blank"
                rel="noopener noreferrer"
              >
                @axlndlk
              </a>
            </motion.span>
          </motion.div>

          {/* Links */}
          <motion.div
            className={styles.container_footer}
            variants={fadeInUp}
            custom={9}
          >
            <motion.div
              className={styles.block}
              variants={fadeInUp}
              custom={10}
            >
              <h4>Resources</h4>
              <a href="mailto:support@wallper.app">Contact</a>
              <a href="/download">Download Wallper</a>
              <a href="/faq">FAQ</a>
              <a href="/">Getting Started</a>
              <a href="/pro">Pro</a>
            </motion.div>
            <motion.div
              className={styles.block}
              variants={fadeInUp}
              custom={11}
            >
              <h4>Legal</h4>
              <a href="/cookie">Cookie Policy</a>
              <a href="/policy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/refund">Refund Policy</a>
              <a href="/subprocessors">Subprocessors</a>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
