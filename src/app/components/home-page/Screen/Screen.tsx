import React from "react";
import styles from "./Screen.module.css";
import { motion } from "framer-motion";

const Screen = () => {
  return (
    <section className={styles.screen}>
      <div className={styles.top}>
        <h3>Wallpapers Like Never Before</h3>
        <p>
          Seamlessly discover, customize, and enjoy live wallpapers — built with
          care to deliver a truly next-generation visual journey on your Mac.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.video}>
          <motion.video
            src={"/video/apply.mp4"}
            autoPlay
            muted
            loop
            playsInline
            className={styles.video_player}
          />
        </div>
      </div>
    </section>
  );
};

export default Screen;
