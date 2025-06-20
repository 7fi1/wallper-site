/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import { FaChevronLeft, FaChevronRight, FaVideo } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";
import { XMark } from "react-ios-icons";
import { FcCheckmark } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion, useAnimation } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import { useModalStore } from "@/src/store/ModalStore";
import Spinner from "@/src/app/ui/Spinner";
import Details from "@/src/app/components/Modals/DetailsModal";
import PrimaryButton from "../../ui/primaryButton";

type VideoType = {
  url: string;
  name: string;
  age?: string;
  category?: string;
  size?: number;
};

interface BucketStat {
  name: string;
  videoCount: number;
  sizeMB: number;
}

interface Props {
  videos: any[];
}

export default function Main() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      console.log("Видео элемент найден:", videoRef.current);
      videoRef.current
        .play()
        .then(() => {
          console.log("Видео запущено");
        })
        .catch((err) => {
          console.error("Ошибка при запуске видео:", err);
        });

      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    } else {
      console.warn("videoRef.current отсутствует");
    }
  };

  const [videos, setVideos] = useState<VideoType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [meta, setMeta] = useState({
    width: 0,
    height: 0,
    duration: 0,
  });
  const [loading, setLoading] = useState({
    videos: true,
    meta: true,
  });

  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [funcLoading, setFuncLoading] = useState<boolean>(false);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVideos(data);
      setLoading((prev) => ({ ...prev, videos: false }));
    } catch (err) {
      toast.error("Ошибка загрузки видео");
      console.error("Ошибка загрузки видео", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const currentVideo = videos[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, videos.length - 1));
    setLoading((prev) => ({ ...prev, meta: true }));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setLoading((prev) => ({ ...prev, meta: true }));
  };

  const extractKeyFromUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url, window.location.origin);
      return parsed.searchParams.get("name");
    } catch {
      console.error("Невалидный URL:", url);
      return null;
    }
  };

  useEffect(() => {
    if (currentKey) {
      console.log("Обрабатываю новый currentKey:", currentKey);
    }
  }, [currentKey]);

  const handleApprove = async (url: string) => {
    setFuncLoading(true);
    const toastId = toast.loading("Обработка события.", {
      position: "bottom-right",
    });

    try {
      const key = extractKeyFromUrl(url);

      const statusResponse = await fetch("/api/success-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentKey: key }),
      });

      if (!statusResponse.ok) {
        toast.error("Ошибка обновления статуса", {
          id: toastId,
          position: "bottom-right",
        });
        setFuncLoading(false);
        return;
      }

      const uploadResponse = await fetch("/api/upload-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: key }),
      });

      if (!uploadResponse.ok) {
        toast.error("Ошибка при копировании видео", {
          id: toastId,
          position: "bottom-right",
        });
        setFuncLoading(false);
        return;
      }

      await fetchVideos();
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setFuncLoading(false);

      toast.success("Видео одобрено ✅", {
        id: toastId,
        position: "bottom-right",
      });
    } catch (err) {
      console.error("❌ handleApprove error:", err);
      setFuncLoading(false);
      toast.error("Ошибка при переносе видео", {
        id: toastId,
        position: "bottom-right",
      });
    }
  };

  const handleDecline = async (url: string) => {
    setFuncLoading(true);
    const toastId = toast.loading("Transfering video.", {
      position: "bottom-right",
    });

    try {
      const statusResponse = await fetch("/api/decline-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentKey: extractKeyFromUrl(url) }),
      });

      if (!statusResponse.ok) {
        toast.error("Ошибка обновления статуса", {
          id: toastId,
          position: "bottom-right",
        });
        setFuncLoading(false);
        return;
      }

      await fetchVideos();
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
      setFuncLoading(false);
      toast.success("Video declined", {
        id: toastId,
        position: "bottom-right",
      });
    } catch {
      setFuncLoading(false);
      toast.error("Fatal error", {
        id: toastId,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (currentIndex >= videos.length && videos.length > 0) {
      setCurrentIndex(videos.length - 1);
    }
  }, [videos]);

  const { isOpen, modalType } = useModalStore();
  const { open } = useModalStore();
  const jumpControls = useAnimation();

  const handleDetailsClick = async () => {
    if (!currentVideo?.url) {
      toast.error("Видео не выбрано");
      return;
    }

    const keyFromUrl = extractKeyFromUrl(currentVideo.url) ?? currentVideo.url;
    setCurrentKey(keyFromUrl);

    await jumpControls.start({
      y: [0, -15, 0],
      transition: { duration: 0.3, ease: "easeInOut" },
    });

    open("details");
  };

  const [stats, setStats] = useState<BucketStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/bucket-stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Ошибка загрузки статистики", err);
      }
    };

    fetchStats();
  }, []);

  if (videos.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Нет видео для модерации</h1>
          <p>
            Видео появятся в скором времени, после того как люди их опубликуют.
            Можете посмотреть на статистику справа.
          </p>
        </div>

        <section className={styles.stats}>
          {stats.map((bucket) => (
            <div key={bucket.name} className={styles.butcket_stats}>
              <div className={styles.round}>
                <span>{bucket.sizeMB}</span>
                <p className={styles.weigth}>Объем бакета</p>
              </div>
              <div className={styles.text_stats}>
                <h1>{bucket.name}</h1>
                <p>Кол-во видео: {bucket.videoCount}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>{videos.length} видео ждет модерации</h1>
          <p className={styles.description}>
            Пожалуйста, смотрите видео полностью и проверяйте соответствие
            правилам перед публикацией.
          </p>
          <div className={styles.container}>
            <motion.div
              className={styles.sliderWrapper}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className={styles.videoCard}
                animate={jumpControls}
                initial={{ y: 0 }}
              >
                <div className={styles.videoContainer}>
                  <video
                    ref={videoRef}
                    key={currentVideo.url}
                    className={styles.videoPlayer}
                    autoPlay
                    loop
                    muted
                    onLoadedMetadata={(e) => {
                      const video = e.currentTarget;
                      setMeta({
                        width: video.videoWidth,
                        height: video.videoHeight,
                        duration: video.duration,
                      });
                      setLoading((prev) => ({ ...prev, meta: false }));
                    }}
                  >
                    <source src={currentVideo.url} type="video/mp4" />
                  </video>

                  {isOpen && (
                    <div className={styles.license_modal_overlay}>
                      <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {modalType === "details" && (
                          <Details showCloseButton videoID={currentKey} />
                        )}
                      </motion.div>
                    </div>
                  )}

                  {!loading.meta ? (
                    <>
                      <div className={styles.playButton}>
                        <button onClick={handlePlayClick}>
                          <IoPlayCircle size={48} color="#fff" />
                        </button>
                      </div>

                      <div className={styles.name}>{currentVideo.name}</div>

                      <div className={styles.details}>
                        <button
                          className={styles.details_buttons}
                          onClick={() => handleApprove(currentVideo.url)}
                        >
                          <FcCheckmark size={20} className={styles.checkmark} />
                        </button>
                        <button
                          className={styles.details_buttons}
                          onClick={() => handleDecline(currentVideo.url)}
                        >
                          <XMark className={styles.Xicon} />
                        </button>
                        <PrimaryButton
                          text="Details"
                          icon="FaChevronRight"
                          iconPosition="right"
                          iconSize={10}
                          fontSize={16}
                          iconColor="#70757e"
                          onClick={handleDetailsClick}
                        />
                      </div>

                      <div className={styles.arrowButtons}>
                        <button
                          className={styles.arrowButton}
                          onClick={goToPrev}
                          disabled={currentIndex === 0}
                        >
                          <FaChevronLeft size={12} />
                        </button>
                        <button
                          className={styles.arrowButton}
                          onClick={goToNext}
                          disabled={currentIndex === videos.length - 1}
                        >
                          <FaChevronRight size={12} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.loading}>
                      <Spinner />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <section className={styles.stats}>
          {stats.map((bucket) => (
            <div key={bucket.name} className={styles.butcket_stats}>
              <div className={styles.round}>
                <span>{bucket.sizeMB}</span>
                <p className={styles.weigth}>Объем бакета</p>
              </div>
              <div className={styles.text_stats}>
                <h1>{bucket.name}</h1>
                <p>Кол-во видео: {bucket.videoCount}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
