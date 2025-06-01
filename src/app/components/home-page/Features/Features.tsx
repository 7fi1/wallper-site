import React from "react";
import styles from "./Features.module.css";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { MdPhotoLibrary } from "react-icons/md";

const Features = () => {
  return (
    <section className={styles.Features}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h4>A New Way to Experience Your Desktop</h4>
          <p className={styles.paragraph}>
            Transform your Mac into a living canvas. Upload, explore, and set
            stunning video wallpapers — from your own creations or our growing
            library.
          </p>
        </div>
        <div className={styles.holder}>
          <div className={styles.block}>
            <div className={styles.left}></div>
            <div className={styles.text}>
              <RiUploadCloud2Fill size={24} color="fcfdffef" />
              <h3>Create. Share. Inspire.</h3>
              <p>
                Upload your own videos and share them with the community — your
                creation could become someone’s new favorite.
              </p>
            </div>
            <div className={styles.light} />
          </div>
          <div className={styles.block}>
            <div className={styles.right}></div>
            <div className={styles.text}>
              <MdPhotoLibrary size={24} color="fcfdffef" />
              <h3>Two Wallpaper Libraries</h3>
              <p>
                Wallper Library — selection of polished, high-performance
                wallpapers. User Library — growing collection created by users
                like you.
              </p>
            </div>
            <div className={styles.light} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
