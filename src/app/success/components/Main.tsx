/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

declare global {
  interface Window {
    rdt?: (event: string, type?: string, data?: Record<string, any>) => void;
  }
}

import styles from "./Main.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PrimaryButton from "../../ui/primaryButton";
import { FaChevronRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useModalStore } from "@/src/store/ModalStore";
import LicenseModal from "../../components/Modals/LicenseModal";
import VideosModal from "../../components/Modals/VideosModal";
import { useApplicationStore } from "@/src/store/ApplicationStore";

export const Main = () => {
  const searchParams = useSearchParams();
  const uuid = searchParams.get("k");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);

    setTimeout(() => {
      setCopiedKey(null);
    }, 1000);

    toast.success("License key copied!", {
      position: "bottom-right",
      icon: null,
      style: {
        fontSize: "14px",
        backgroundColor: "#2ca76f4b",
        color: "#fff",
        border: "1px solid #44ffaa4b",
        height: "36px",
        padding: "8px",
        borderRadius: "6px",
        fontWeight: "500",
        backdropFilter: "blur(30px) saturate(180%)",
      },
    });
  };

  useEffect(() => {
    if (!uuid || uuid.length < 10) return;

    try {
      const existing = localStorage.getItem("license_keys");
      const keys: string[] = existing ? JSON.parse(existing) : [];

      if (!keys.includes(uuid)) {
        keys.push(uuid);
        localStorage.setItem("license_keys", JSON.stringify(keys));

        if (typeof window !== "undefined" && typeof window.rdt === "function") {
          window.rdt("track", "Purchase", {
            currency: "USD",
            value: 9.99,
          });
          console.log("✅ Reddit Pixel 'Purchase' fired");
        }
      }
    } catch (e) {
      console.error("❌ Failed to save license:", e);
    }
  }, [uuid]);

  const { isOpen, modalType } = useModalStore();

  const { version, fetchApplicationData, size } = useApplicationStore();

  useEffect(() => {
    fetchApplicationData();
  }, [fetchApplicationData]);

  return (
    <section className={styles.top}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
      <div className={styles.light_hero} />
      <motion.div
        className={styles.greed}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.text}>
          <motion.h1 layout>You&apos;re All Set!</motion.h1>

          <motion.p layout className={styles.paragraph}>
            Thanks for your support! Your wallpaper is ready — bring your
            desktop to life with vibrant visuals and smooth performance.
          </motion.p>
          <div className={styles.key}>
            <h3>{uuid}</h3>
            <span onClick={() => handleCopy(uuid)}>
              {copiedKey === uuid ? "Copied!" : "Copy"}
            </span>
          </div>
          <motion.div
            className={styles.container_greed}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.div className={styles.spans} layout>
              <span>v{version} release</span>
              <span>macOS 14+</span>
              <span>App Store soon!</span>
            </motion.div>
          </motion.div>
        </div>
        <div className={styles.content}>
          <div className={styles.model_wrapper}>
            <div className={styles.light} />
            <div className={styles.image} />
            <h2>Wallper</h2>
            <p>Minimum macOS 14 Sonoma</p>
            <span>
              DMG, {size}MB • v{version}
            </span>
          </div>
          <div className={styles.buttons}>
            <PrimaryButton
              text="Download for Free"
              icon="FaChevronRight"
              iconPosition="right"
              iconSize={10}
              buttonSize={48}
              fontSize={16}
              fontWeight={500}
              iconColor="#70757e"
              onClick={() => {
                window.location.href =
                  "https://github.com/alxndlk/wallper-app/releases/download/Release/Wallper.dmg";
              }}
              widthButton="max-content"
            />
            <a className={styles.help} href="mailto:support@wallper.app">
              Help <FaChevronRight color="#70757e" size={10} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
