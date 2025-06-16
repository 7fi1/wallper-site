/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import styles from "./Footer.module.css";

import { motion } from "framer-motion";
import { FaReddit } from "react-icons/fa6";
import { FaDiscord, FaGithub, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const icons = [
    { icons: <FaReddit />, link: "https://www.reddit.com/r/wallper/" },
    { icons: <FaDiscord />, link: "https://discord.gg/ksxrdnETuc" },
    { icons: <FaTiktok />, link: "https://www.tiktok.com/@wallper.live" },
    { icons: <FaGithub />, link: "https://github.com/alxndlk" },
  ];

  return (
    <motion.section className={styles.footer}>
      <div className={styles.line} />
      <div className={styles.light} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.company_info}>
            <div>
              <p className={styles.smal_p}>© Wallper App 2025</p>
              <p className={styles.smal_p}>All rights reserved</p>
            </div>

            <div className={styles.icons}>
              {icons.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={styles.icon}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icons}
                </a>
              ))}
            </div>

            <div className={styles.reachability}>
              Wallper API & Database status
            </div>

            <span>
              Made by{" "}
              <a
                className={styles.telegram_link}
                href="https://t.me/alxndlk"
                target="_blank"
                rel="noopener noreferrer"
              >
                @axlndlk
              </a>
            </span>
          </div>
          <div className={styles.container_footer}>
            <div className={styles.block}>
              <h4>Resources</h4>
              <a href="mailto:support@wallper.app">Contact</a>
              <a href="/download">Download Wallper</a>
              <a href="/faq">FAQ</a>
              <a href="/">Getting Started</a>
              <a href="pro">Pro</a>
            </div>
            <div className={styles.block}>
              <h4>Legal</h4>
              <a href="/cookie">Cookie Policy</a>
              <a href="/policy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/refund">Refund Policy</a>
              <a href="/subprocessors">Subprocessors</a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Footer;
