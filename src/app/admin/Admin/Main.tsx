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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useModalStore } from "@/src/store/ModalStore";
import Spinner from "@/src/app/ui/Spinner";
import Footer from "@/src/app/layout/Footer/Footer";
import Details from "@/src/app/components/Modals/DetailsModal";
import PrimaryButton from "../../ui/primaryButton";

type VideoType = {
  url: string;
  name: string;
  age?: string;
  category?: string;
  size?: number;
};

export const Main = () => {
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

  const removeVideoFromServer = async (url: string, endpoint: string) => {
    const key =
      extractKeyFromUrl(url) ??
      url.replace("http://57.129.86.35:9001/browser/wallper-moderate", "");

    setCurrentKey(key);
    console.log("Удаляем видео с ключом:", key);

    try {
      const res = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: key }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка на сервере");
      return true;
    } catch (err) {
      console.error("Ошибка при удалении видео:", err);
      return false;
    }
  };

  const handleApprove = async (url: string) => {
    setFuncLoading(true);
    const toastId = toast.loading("Обработка события.", {
      position: "bottom-right",
    });

    const success = await removeVideoFromServer(url, "/api/upload-video");

    if (success) {
      const statusResponse = await fetch("/api/success-status", {
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

      toast.success("Видео одобрено", {
        id: toastId,
        position: "bottom-right",
      });
    } else {
      setFuncLoading(false);
      toast.error("Ошибка при перемещении видео", {
        id: toastId,
        position: "bottom-right",
      });
    }
  };

  const handleDecline = async (url: string) => {
    setFuncLoading(true);
    const toastId = toast.loading("Перемещаем видео.", {
      position: "bottom-right",
    });

    const success = await removeVideoFromServer(url, "/api/delete-video");
    if (success) {
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
      toast.success("Видео удалено", {
        id: toastId,
        position: "bottom-right",
      });
    } else {
      setFuncLoading(false);
      toast.error("Ошибка при удалении видео", {
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

  if (loading.videos) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Skeleton height={40} count={3} />
        </div>
      </main>
    );
  }

  if (videos.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>
              <span className={styles.quantity}>Опа</span>
            </h2>
            <h1>Все видео прошли проверку.</h1>
            <p>
              Пожалуйста, смотрите видео полностью и проверяйте соответствие
              правилам перед публикацией.
            </p>
          </div>

          <div className={styles.tv}>
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  key="/video/DASH.mp4"
                  className={styles.videoPlayer}
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
                  <source src="/video/DASH.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <>
      <main className={styles.main}>
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
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>
              <span className={styles.quantity}>{videos.length}</span>
            </h2>
            <h1>Видео ждут модерации.</h1>
            <p>
              Пожалуйста, смотрите видео полностью и проверяйте соответствие
              правилам перед публикацией.
            </p>
          </div>

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
                        <FcCheckmark size={20} />
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
      </main>
      <Footer />
    </>
  );
};
