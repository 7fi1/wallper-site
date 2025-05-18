import styles from "./VideoMeta.module.css";

type VideoMetaProps = {
  data: {
    name?: string;
    author?: string;
    sizeMB?: number;
    resolution?: string;
    duration?: number;
    status?: string;
    age?: string;
    createdAt?: string;
    isPublic?: boolean;
    likes?: number;
  } | null;
};

export default function VideoMeta({ data }: VideoMetaProps) {
  if (!data) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Неизвестно";
    try {
      return new Date(dateStr).toLocaleString("ru-RU");
    } catch {
      return "Неверная дата";
    }
  };

  const getSizeColor = (size: number) => {
    if (size > 500) return styles.size_red;
    if (size > 100) return styles.size_yellow;
    return styles.size_green;
  };

  const renderRow = (label: string, value: React.ReactNode, title?: string) => (
    <div className={styles.meta_item} title={title}>
      <span className={styles.meta_label}>{label}</span>
      <span className={styles.meta_value}>{value ?? "—"}</span>
    </div>
  );

  const renderSizeRow = (sizeMB?: number) => {
    if (sizeMB === undefined) return renderRow("Размер:", "—");

    const percent = Math.min((sizeMB / 1024) * 100, 100);
    const sizeClass = getSizeColor(sizeMB);

    return (
      <div className={styles.meta_item} title={`${sizeMB.toFixed(2)} MB`}>
        <span className={styles.meta_label}>Размер:</span>
        <div className={styles.size_container}>
          <div className={styles.size_bar_wrapper}>
            <div
              className={`${styles.size_bar} ${sizeClass}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className={styles.size_value}>{sizeMB.toFixed(2)} MB</span>
        </div>
      </div>
    );
  };

  const shortName =
    data.name && data.name.length > 28
      ? `${data.name.slice(0, 28)}…`
      : data.name || "Без названия";

  return (
    <div className={styles.video_meta}>
      {renderRow("Название:", shortName, data.name)}
      {renderRow("Автор:", data.author || "Не указан")}
      {renderSizeRow(data.sizeMB)}
      {renderRow("Разрешение:", data.resolution)}
      {renderRow("Длительность:", data.duration ? `${data.duration} сек` : "—")}
      {renderRow(
        "Статус:",
        <span
          className={
            data.status === "Success"
              ? styles.status_ready
              : styles.status_pending
          }
        >
          {data.status === "Success" ? "Success" : data.status ?? "—"}
        </span>
      )}
      {renderRow("Возрастное ограничение:", data.age || "—")}
      {renderRow("Дата создания:", formatDate(data.createdAt))}
      {renderRow(
        "Публичный:",
        typeof data.isPublic === "boolean"
          ? data.isPublic
            ? "Да"
            : "Нет"
          : "—"
      )}
      {renderRow("Лайки:", data.likes ?? 0)}
    </div>
  );
}
