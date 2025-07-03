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
      {/* <Battery /> */}
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
          <div className={styles.text}>
            <h1>4K Video Wallpapers</h1>
            <span>
              Bring your desktop to life with stunning 4K video wallpapers —
              ultra-smooth, high-performance playback that adds motion, depth,
              and atmosphere to your Mac.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screen;
