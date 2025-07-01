import React from "react";
import styles from "./Video.module.css";
import PrimaryButton from "@/src/app/ui/primaryButton";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Video = () => {
  const router = useRouter();
  return (
    <section className={styles.video_holder}>
      <div className={styles.top}>
        <h3>Smart Controls for Daily Comfort</h3>
        <p>
          Set wallpapers to change daily, clear cache with a click, manage
          license status, and launch wallpapers automatically at startup — all
          in one place.
        </p>
        <div className={styles.buttons}>
          <PrimaryButton
            text="Get started"
            icon="FaChevronRight"
            iconPosition="right"
            iconSize={10}
            buttonSize={48}
            fontSize={16}
            fontWeight={500}
            iconColor="#70757e"
            onClick={() => {
              router.push("/download");
            }}
          />
          <SecondaryButton
            text="Contact Us"
            icon="FaChevronRight"
            iconPosition="right"
            iconSize={10}
            buttonSize={48}
            fontSize={16}
            fontWeight={500}
            iconColor="#ccc"
            onClick={() => {
              window.location.href = "mailto:support@wallper.app";
            }}
          />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.video}>
          <motion.video
            src={"/video/wallper.mp4"}
            autoPlay
            muted
            loop
            playsInline
            className={styles.video_player}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Video;
