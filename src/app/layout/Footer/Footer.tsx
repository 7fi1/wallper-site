import React from "react";
import styles from "./Footer.module.css";

import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord, FaGithub, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const icons = [
    { icons: <FaXTwitter />, link: "/" },
    { icons: <FaDiscord />, link: "/" },
    { icons: <FaTiktok />, link: "/" },
    { icons: <FaGithub />, link: "/" },
  ];

  return (
    <motion.section
      className={styles.footer}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.line} />
      <div className={styles.light} />

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.company_info}>
            <div>
              <p className={styles.smal_p}>Karlovo náměstí 317/5</p>
              <p className={styles.smal_p}>Prague, CZ 120 00 </p>
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
          </div>
          <div className={styles.container_footer}>
            <div className={styles.block}>
              <h4>Resources</h4>
              <a>Getting Started</a>
              <a>API Reference</a>
              <a>Integrations</a>
              <a>Examples</a>
              <a>SDKs</a>
            </div>
            <div className={styles.block}>
              <h4>Company</h4>
              <a>About</a>
              <a>Blog</a>
              <a>Careers</a>
              <a>Contact</a>
              <a>Customers</a>
              <a>Philosophy</a>
            </div>
            <div className={styles.block}>
              <h4>Company</h4>
              <a>About</a>
              <a>Blog</a>
              <a>Careers</a>
              <a>Contact</a>
              <a>Customers</a>
              <a>Philosophy</a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Footer;
