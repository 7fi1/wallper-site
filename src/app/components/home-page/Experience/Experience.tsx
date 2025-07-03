import React from "react";
import styles from "./Experience.module.css";
import { MdMonitor } from "react-icons/md";
import { TbDeviceDesktopX } from "react-icons/tb";
import { motion } from "framer-motion";

// Анимации
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Experience = () => {
  return (
    <section className={styles.experience}>
      <div className={styles.container}>
        {/* Заголовок */}
        <motion.div
          className={styles.title}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h4>Effortless Control, Personalized Experience</h4>
          <p>
            Manage your wallpapers and devices with flexibility — apply designs
            across all screens instantly or tailor each monitor individually.
            Stay in control of your licenses and connected devices, with support
            for up to 3 per account.
          </p>
        </motion.div>

        {/* Блоки */}
        <div className={styles.holder}>
          {[0, 1].map((index) => (
            <motion.div
              key={index}
              className={styles.block}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              custom={index + 1}
            >
              {index === 0 ? (
                <>
                  <div className={styles.left}></div>
                  <div className={styles.text}>
                    <MdMonitor
                      size={32}
                      color="fcfdffef"
                      className={styles.icon}
                    />
                    <h3>Instant Apply Mode</h3>
                    <p>
                      Set wallpapers on all screens with a single click — or
                      assign different wallpapers to each monitor. The app
                      remembers your setup for the next launch.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.right}></div>
                  <div className={styles.text}>
                    <TbDeviceDesktopX
                      size={32}
                      color="fcfdffef"
                      className={styles.icon}
                    />
                    <h3>Device Management</h3>
                    <p>
                      View and manage all your linked devices. Remove old ones,
                      check device details, and use your license on up to 3
                      devices at the same time.
                    </p>
                  </div>
                </>
              )}
              <div className={styles.light} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
