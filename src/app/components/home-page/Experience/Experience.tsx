import React from "react";
import styles from "./Experience.module.css";
import { FaStore } from "react-icons/fa6";

const Experience = () => {
  return (
    <section className={styles.experience}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h4>First class of development experience</h4>
          <p>
            We are a team of engineers who love building tools for other
            engineers. Our goal is to create the email platform we`ve always
            wished we had — one that just works.
          </p>
        </div>
        <div className={styles.holder}>
          <div className={styles.block}>
            <div className={styles.left}></div>
            <div className={styles.text}>
              <FaStore size={24} color="fcfdffef" />
              <h3>Test Mode</h3>
              <p>
                Simulate events and experiment with our API without the risk of
                accidentally set all wallper with real people.
              </p>
              <a href="">Learn more</a>
            </div>
            <div className={styles.light} />
          </div>
          <div className={styles.block}>
            <div className={styles.right}></div>
            <div className={styles.text}>
              <FaStore size={24} color="fcfdffef" />
              <h3>Test Mode</h3>
              <p>
                Simulate events and experiment with our API without the risk of
                accidentally set all wallper with real people.
              </p>
              <a href="">Learn more</a>
            </div>
            <div className={styles.light} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
