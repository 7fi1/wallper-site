import React from "react";
import styles from "./Main.module.css";
import { Apple } from "react-ios-icons";

export const Main = () => {
  return (
    <main className={styles.main}>
      <section className={styles.top}>
        <h1>
          <span>Live Wallpapers</span>
          <div className={styles.flex_row}>
            now for your
            <div className={styles.title_box}>
              <Apple className={styles.apple} /> <span>Mac</span>
            </div>
          </div>
        </h1>
      </section>
    </main>
  );
};
