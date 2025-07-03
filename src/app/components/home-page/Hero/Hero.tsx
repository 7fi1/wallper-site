"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import styles from "./Hero.module.css";
import { loadStripe } from "@stripe/stripe-js";
import PrimaryButton from "@/src/app/ui/primaryButton";
import SecondaryButton from "@/src/app/ui/secondaryButton";
import { useApplicationStore } from "@/src/store/ApplicationStore";
import { useRouter } from "next/navigation";
import { FaDiscord, FaGithub, FaReddit, FaTiktok } from "react-icons/fa6";
import { Block } from "./Block/Block";
// import Image from "next/image";

const Hero = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const icons = [
    { icons: <FaReddit />, link: "https://www.reddit.com/r/wallper/" },
    { icons: <FaDiscord />, link: "https://discord.gg/ksxrdnETuc" },
    { icons: <FaTiktok />, link: "https://www.tiktok.com/@wallper.live" },
    { icons: <FaGithub />, link: "https://github.com/alxndlk" },
  ];

  const router = useRouter();
  const { version, fetchApplicationData } = useApplicationStore();

  useEffect(() => {
    fetchApplicationData();
  }, [fetchApplicationData]);

  return (
    <section className={styles.top}>
      {/* <a
        href="https://www.producthunt.com/products/wallper-wallpaper-engine-for-macos?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-wallper"
        target="_blank"
        className={styles.link_hero}
      >
        <Image
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=983449&theme=light&t=1751407863720"
          className={styles.ph}
          alt="Wallper - 4K&#0032;wallpapers&#0032;for&#0032;Mac&#0046;&#0032;Use&#0032;built&#0045;in&#0032;or&#0032;your&#0032;own&#0032;videos | Product Hunt"
          width="100"
          height="100"
        />
      </a> */}
      <motion.div
        className={styles.greed}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.text}>
          <div className={styles.logo}>
            <div className={styles.image_logo}></div>
            <div className={styles.light_r}></div>
            <div className={styles.light_l}></div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Live Wallpapers now for your Mac
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Bring your desktop to life with stunning dynamic wallpapers.
            Seamless performance, elegant control, and effortless customization
            — all in one place.
          </motion.p>

          <motion.div
            className={styles.container_greed}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
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
                  router.push("/download");
                }}
              />
              <SecondaryButton
                text="Pro for 9.99$"
                icon="FaChevronRight"
                iconPosition="right"
                iconSize={10}
                buttonSize={48}
                fontSize={16}
                fontWeight={500}
                iconColor="#ccc"
                onClick={async () => {
                  const metadata = {
                    license_uuid: crypto.randomUUID(),
                    user_timezone:
                      Intl.DateTimeFormat().resolvedOptions().timeZone,
                    locale: navigator.language,
                    device_type: /Mobi|Android/i.test(navigator.userAgent)
                      ? "mobile"
                      : "desktop",
                    referrer: document.referrer || "direct",
                  };

                  const res = await fetch("/api/checkout_session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ metadata }),
                  });

                  const data = await res.json();

                  const stripe = await stripePromise;
                  await stripe?.redirectToCheckout({
                    sessionId: data.sessionId,
                  });
                }}
              />
            </div>

            <motion.div
              className={styles.spans}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              <span>v{version} release</span>
              <span>macOS 14+</span>
              <span>App Store soon!</span>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.icons}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {icons.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className={styles.icon}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icons}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <Block />
    </section>
  );
};

export default Hero;
