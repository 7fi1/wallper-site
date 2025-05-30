import React from "react";
import styles from "./Features.module.css";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.top}>
        <div className={styles.image} />
        <h3>Write using a delightful editor</h3>
        <p>
          A modern editor that makes it easy for anyone to write, format, and
          wallper features. Visually build your wallper and change the design by
          adding custom styles.
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles.bg} />
        <div className={styles.light} />
        {/* <h4>
          Features of all sizes that Wallper can give you for free using. Please
          buy something now.
        </h4>
        <div className={styles.grid}>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
          <h3>FEATURE</h3>
        </div> */}
      </div>
    </section>
  );
};

export default Features;
