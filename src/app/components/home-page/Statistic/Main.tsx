import React, { useEffect, useRef, useState } from "react";
import styles from "./Main.module.css";
import { WallperStatsStore } from "../../../../store/WallperStatsStore";
import CountUp from "react-countup";
import clsx from "clsx";
import PrimaryButton from "@/src/app/ui/primaryButton";
import { useRouter } from "next/navigation";
import Metrics from "../Metrics/Metrics";

const Statistic = () => {
  const { users, networkOut, fetchUserStats } = WallperStatsStore();

  const router = useRouter();

  const [highlighted, setHighlighted] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const networkOutGB = Number(networkOut / 1024 / 1024 / 1024);

  const statistics = [
    {
      key: "users",
      count: users,
      title: "Active Users",
      description:
        "It started as an experiment. Now it brings every Mac screen to life.",
      decimals: 0,
    },
    {
      key: "networkOut",
      count: networkOutGB,
      title: "Wallpapers Downloaded",
      description:
        "These aren’t just files - they’re scenes people chose to return to.",
      suffix: " GB",
      decimals: 2,
    },
  ];

  useEffect(() => {
    fetchUserStats();
    intervalRef.current = setInterval(fetchUserStats, 10000);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  const prev = useRef({ users, networkOutGB });

  useEffect(() => {
    const diffs = [
      { key: "users", newVal: users, prevVal: prev.current.users },
      {
        key: "networkOut",
        newVal: networkOutGB,
        prevVal: prev.current.networkOutGB,
      },
    ];

    diffs.forEach(({ key, newVal, prevVal }) => {
      if (newVal !== prevVal) {
        setHighlighted(key);
        setTimeout(() => setHighlighted(null), 1000);
      }
    });

    prev.current = { users, networkOutGB };
  }, [users, networkOut]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>Get started in seconds</h1>
          <span>Made for macOS</span>
        </div>
        <Metrics />

        <div className={styles.wrap}>
          <div className={styles.stats}>
            {statistics.map((stat, index) => (
              <div
                key={stat.key + stat.count}
                className={clsx(styles.card, {
                  [styles.updated]: highlighted === stat.key,
                })}
              >
                <div className={styles.iconWrapper}>
                  <span
                    className={`${styles.count} ${
                      index === 0
                        ? styles.gradient1
                        : index === 1
                          ? styles.gradient2
                          : styles.gradient3
                    }`}
                  >
                    <CountUp
                      end={stat.count}
                      duration={1.5}
                      separator=","
                      decimals={stat.decimals ?? 0}
                      suffix={stat.suffix ?? ""}
                    />
                  </span>
                </div>
                <div className={styles.title}>{stat.title}</div>
                <div className={styles.description}>{stat.description}</div>
              </div>
            ))}
          </div>
          <div className={styles.paragraph}>
            <p className={styles.paragraph_text}>
              MacOS app that brings your desktop to life with stunning 4K live
              wallpapers, combining beauty and performance.
              <br />
              <br />
              Explore a growing library of dynamic wallpapers, curated by the
              Wallper team and community.
            </p>
            <PrimaryButton
              text="Download Wallper"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistic;
