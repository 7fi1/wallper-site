"use client";

import React, { useEffect, useState } from "react";
import styles from "./Main.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";
import { Video, XMark } from "react-ios-icons";
import { FcCheckmark } from "react-icons/fc";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Video = {
  url: string;
  name: string;
  age?: string;
  category?: string;
  size?: number;
};

export const Main = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [metaLoading, setMetaLoading] = useState(true);

  // Функция для загрузки видео
  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching videos", err);
      toast.error("Ошибка загрузки видео");
    }
  };

  // Загружаем видео при монтировании компонента
  useEffect(() => {
    fetchVideos();
  }, []);

  // Функция для одобрения видео
  const handleApprove = async (url: string) => {
    console.log("Approved:", url);
    toast.success("Видео одобрено", { position: "top-center" });

    // Извлекаем ключ из URL
    const key = url.replace(
      "https://wallper-moderate.s3.eu-north-1.amazonaws.com/",
      ""
    );

    try {
      const response = await fetch("/api/approve-video", {
        method: "DELETE", // Используем DELETE
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: key }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Ошибка при одобрении видео:", data.error);
      } else {
        console.log("Видео успешно одобрено и перемещено");
        await fetchVideos(); // Обновляем список видео после одобрения
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса на одобрение:", error);
    }

    // Переход к следующему видео
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev));
  };

  // Функция для отклонения видео
  const handleDecline = async (url: string) => {
    console.log("Declined:", url);
    toast.error("Видео отклонено", { position: "top-center" });

    // Извлекаем ключ из URL
    const key = url.replace(
      "https://wallper-moderate.s3.eu-north-1.amazonaws.com/",
      ""
    );

    try {
      const response = await fetch("/api/delete-video", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: key }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Ошибка при удалении видео:", data.error);
      } else {
        console.log("Видео успешно удалено с S3");
        await fetchVideos(); // Обновляем список видео после удаления
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса на удаление:", error);
    }

    // Переход к следующему видео
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev));
  };

  // Функции для переключения видео
  const goToNext = () => {
    setCurrentIndex((prev) => (prev < videos.length - 1 ? prev + 1 : prev));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  // Текущее видео
  const currentVideo = videos[currentIndex];

  // Форматируем продолжительность видео
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Скелетон-эффект для загрузки данных
  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Skeleton height={40} count={3} />
        </div>
      </main>
    );
  }

  // Если видео нет
  if (videos.length === 0 || currentIndex >= videos.length) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div>
            <h1>Панель для модерации видео.</h1>
            <p>На данный момент все видео просмотрены или не загружены.</p>
            <h2>
              <span className={styles.quantity}>0</span> видео ждут модерации.
            </h2>
          </div>
          <div className={styles.tv}>
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <video className={styles.videoPlayer} loop muted autoPlay>
                  <source src="/video/DASH.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Основной рендер
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <h1>Панель для модерации видео.</h1>
          <p>
            Пожалуйста, читайте всю информацию и смотрите видео полностью перед
            его публикацией. Убедитесь, что видео соответствует всем требованиям
            и не содержит запрещенного контента.
          </p>
          <h2>
            <span className={styles.quantity}>{videos.length}</span>
            видео ждут модерации.
          </h2>
        </div>

        <motion.div
          className={styles.sliderWrapper}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.tv}>
            <div className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <video
                  width="100%"
                  className={styles.videoPlayer}
                  key={currentVideo.url}
                  ref={(el) => {
                    if (el) {
                      el.onloadedmetadata = () => {
                        setVideoWidth(el.videoWidth);
                        setVideoHeight(el.videoHeight);
                        setVideoDuration(el.duration);
                        setMetaLoading(false);
                      };
                    }
                  }}
                >
                  <source src={currentVideo.url} type="video/mp4" />
                </video>

                <div className={styles.playButton}>
                  <button>
                    <IoPlayCircle size={72} color="#fff" />
                  </button>
                </div>

                <div className={styles.name}>{currentVideo.name}</div>

                <div className={styles.videoInfo}>
                  {metaLoading ? (
                    <Skeleton height={30} count={1} width={`60%`} />
                  ) : (
                    <ul className={styles.videoDetailsList}>
                      <li>
                        <h3>{currentVideo.category || "N/A"}</h3>
                        <div className={styles.interpunkt}>•</div>
                        <h3>{currentVideo.age || "N/A"}</h3>
                        <div className={styles.interpunkt}>•</div>
                        <h3>
                          {currentVideo.size
                            ? (currentVideo.size / (1024 * 1024)).toFixed(2) +
                              " MB"
                            : "N/A"}
                        </h3>
                        <div className={styles.interpunkt}>•</div>
                        <h3>
                          {videoWidth} × {videoHeight}
                        </h3>
                        <div className={styles.interpunkt}>•</div>
                        <h3>{formatDuration(videoDuration)}</h3>
                      </li>
                    </ul>
                  )}
                </div>

                <div className={styles.details}>
                  <button
                    className={styles.details_buttons}
                    onClick={() => handleApprove(currentVideo.url)}
                  >
                    <FcCheckmark size={20} />
                  </button>
                  <button
                    className={styles.details_buttons}
                    onClick={() => handleDecline(currentVideo.name)}
                  >
                    <XMark className={styles.Xicon} />
                  </button>
                  <button className={styles.details_button}>
                    Детальнее <Video />
                  </button>
                </div>

                <div className={styles.arrowButtons}>
                  <button className={styles.arrowButton} onClick={goToPrev}>
                    <FaChevronLeft size={16} />
                  </button>
                  <button className={styles.arrowButton} onClick={goToNext}>
                    <FaChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};
