import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import { Apple, Message } from "react-ios-icons";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Image
            alt="123"
            src="/logo/logo.png"
            width={1024}
            height={1024}
            className={styles.logo_image}
          />

          <h1 className={styles.title}>Wallper</h1>
        </div>

        <div className={styles.version}>v1.0</div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.FAQs}>
          <Message filled className={styles.message} />
          FAQs
        </button>
        <button className={styles.download}>
          <Apple className={styles.apple} />
          <span>Download for Mac</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
