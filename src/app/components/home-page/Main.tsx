/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Main.module.css";
// import { Apple } from "react-ios-icons";
// import { FaChevronDown } from "react-icons/fa";
import Footer from "../../layout/Footer/Footer";

import { motion } from "framer-motion";
// import dynamic from "next/dynamic";

// const Player = dynamic(
//   () => import("@lordicon/react").then((mod) => mod.Player),
//   { ssr: false }
// );

// import { FaCircleXmark, FaDroplet } from "react-icons/fa6";
import { useModalStore } from "../../../store/ModalStore";
import LicenseModal from "../Modals/LicenseModal";
import VideosModal from "../Modals/VideosModal";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { blocks, features } from "../../constants";
import Hero from "./Hero/Hero";
import Bottom from "./Bottom/Bottom";
import Experience from "./Experience/Experience";
import Video from "./Video/Video";
import Screen from "./Screen/Screen";
import Features from "./Features/Features";

export const Main = () => {
  // const [openIndex, setOpenIndex] = useState<number | null>(0);

  const playerRef = useRef(null);
  // const cooldownRef = useRef<boolean[]>([]);
  // const iconRefs = useRef([]);
  const containerRef = useRef(null);

  // const toggleBlock = (index: number) => {
  //   if (openIndex !== index) {
  //     setOpenIndex(index);
  //   }
  // };

  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);

  const { isOpen, modalType } = useModalStore();

  return (
    <main className={styles.main} ref={containerRef}>
      {isOpen && (
        <div className={styles.license_modal_overlay}>
          <motion.div className={styles.modal}>
            {modalType === "license" && <LicenseModal showCloseButton={true} />}
            {modalType === "videos" && <VideosModal />}
          </motion.div>
        </div>
      )}
      <Hero />
      <Screen />
      <Experience />
      <Video />
      <Features />
      <Bottom />

      {/* LAPTOP
      <motion.section
        className={styles.laptop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.holders}>
          {blocks.map((text, index) => (
            <motion.div
              key={index}
              className={styles.block}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <div className={styles.text} onClick={() => toggleBlock(index)}>
                <h2>{text.title}</h2>
                <FaChevronDown
                  className={`${styles.chevron} ${
                    openIndex === index ? styles.selected : ""
                  }`}
                  strokeWidth={1}
                />
              </div>
              {openIndex === index && (
                <motion.div
                  className={styles.description_holder}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.description}>{text.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.holders}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={styles.prices_block}>
            <div className={styles.free}>
              <div className={styles.header}>
                <span>User Free</span>
                <div className={styles.price_check}>
                  <h3>$0</h3>
                  <span>/ per license</span>
                </div>
              </div>
              <div className={styles.main_price_block}>
                <div className={styles.mobile}>
                  <h4>What’s included</h4>
                  <ul>
                    <p>
                      <IoIosCheckmarkCircle size={20} />9 free 4K wallpapers
                    </p>
                    <p>
                      <IoIosCheckmarkCircle size={20} />
                      Full macOS app experience
                    </p>
                    <p>
                      <FaCircleXmark size={17} />
                      No custom uploads
                    </p>
                    <p>
                      <FaCircleXmark size={17} />
                      No access to user gallery
                    </p>
                  </ul>
                </div>
                <motion.button
                  className={styles.download_free}
                  whileTap={{ scale: 0.95 }}
                >
                  <Apple className={styles.apple_s} />
                  <div>Download for Mac</div>
                </motion.button>
              </div>
            </div>
            <div className={styles.pro}>
              <div className={styles.header}>
                <span className={styles.type}>PRO version</span>
                <div className={styles.price_check}>
                  <h3>$10</h3>
                  <div className={styles.flex_col}>
                    <span>/ per license</span>
                    <p>-17%</p>
                  </div>
                </div>
              </div>
              <div className={styles.main_price_block}>
                <div className={styles.mobile}>
                  <h4>What’s included</h4>
                  <ul>
                    <p>
                      <IoIosCheckmarkCircle size={20} color="#007aff" />
                      500+ exclusive 4K live wallpapers
                    </p>
                    <p>
                      <IoIosCheckmarkCircle size={20} color="#007aff" />
                      Upload your own videos
                    </p>
                    <p>
                      <IoIosCheckmarkCircle size={20} color="#007aff" />
                      Access community gallery
                    </p>
                    <p>
                      <IoIosCheckmarkCircle size={20} color="#007aff" />
                      Use on up to 3 MACs
                    </p>
                    <p>
                      <IoIosCheckmarkCircle size={20} color="#007aff" />
                      Lifetime updates — no subscription
                    </p>
                  </ul>
                </div>
                {/* <motion.button
                    className={styles.download_free}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const res = await fetch("/api/checkout_session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      });

                      const data = await res.json();

                      const stripe = await stripePromise;
                      await stripe?.redirectToCheckout({
                        sessionId: data.sessionId,
                      });
                    }}
                  >
                    <FaStore className={styles.check} />
                    <div>Purchase </div>
                  </motion.button> */}
      {/* </div>
            </div>
            <div className={styles.text_mobile}>
              Experience Wallper now – unlock a new level of beauty, motion, and
              personalization for your Mac.
            </div>
          </div>
        </motion.div>
      </motion.section>
      <motion.section
        className={styles.features}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="features"
      >
        <div className={styles.features_inner}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={styles.feature}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {Icon && (
                  <div
                    onMouseEnter={() => {
                      if (cooldownRef.current[index]) return;
                      iconRefs.current[index]?.playFromBeginning();
                      cooldownRef.current[index] = true;
                      setTimeout(() => {
                        cooldownRef.current[index] = false;
                      }, 2000);
                    }}
                  >
                    <Player
                      {...({
                        ref: (el: any) => {
                          iconRefs.current[index] = el;
                        },
                      } as any)}
                      icon={Icon}
                      colorize="#007aff"
                    />
                  </div>
                )}
                <h2>{feature.title}</h2>
              </motion.div>
            );
          })}
        </div>
      </motion.section> */}
      <Footer />
    </main>
  );
};
