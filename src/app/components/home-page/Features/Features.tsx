import React from "react";
import styles from "./Features.module.css";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";
import { motion } from "framer-motion";

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

const Features = () => {
  return (
    <section className={styles.Features}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Заголовок */}
        <motion.div className={styles.title} variants={fadeInUp} custom={0}>
          <h4>A New Way to Experience Your Desktop</h4>
          <p className={styles.paragraph}>
            Transform your Mac into a living canvas. Upload, explore, and set
            stunning video wallpapers — from your own creations or our growing
            library.
          </p>
        </motion.div>

        {/* Блоки с иконками */}
        <div className={styles.holder}>
          <motion.div className={styles.block} variants={fadeInUp} custom={1}>
            <div className={styles.left}></div>
            <div className={styles.text}>
              <RiUploadCloud2Fill
                size={24}
                color="fcfdffef"
                className={styles.icon}
              />
              <h3>Create. Share. Inspire.</h3>
              <p>
                Upload your own videos and share them with the community — your
                creation could become someone’s new favorite.
              </p>
            </div>
            <div className={styles.light} />
          </motion.div>

          <motion.div className={styles.block} variants={fadeInUp} custom={2}>
            <div className={styles.right}></div>
            <div className={styles.text}>
              <MdPhotoLibrary
                size={24}
                color="fcfdffef"
                className={styles.icon}
              />
              <h3>Two Wallpaper Libraries</h3>
              <p>
                Wallper Library — selection of polished, high-performance
                wallpapers. User Library — growing collection created by users
                like you.
              </p>
            </div>
            <div className={styles.light} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
