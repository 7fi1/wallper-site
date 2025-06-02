import React from "react";
import styles from "./Screen.module.css";
import { motion } from "framer-motion";

const Screen = () => {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <div className={styles.image} />
        <h3>Wallpapers Like Never Before</h3>
        <p>
          Seamlessly discover, customize, and enjoy live wallpapers — built with
          care to deliver a truly next-generation visual journey on your Mac.
        </p>
      </div>
      <div className={styles.container}>
        <motion.video
          src={"/video/apply.mov"}
          autoPlay
          muted
          loop
          playsInline
          className={styles.video_player}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className={styles.bg} />
        <div className={styles.light} />
      </div>
    </section>
  );
};

export default Screen;
