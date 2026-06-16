/**
 * 计算过去时间到现在的间隔
 * @param pastTime Unix 时间戳（秒）
 * @returns 形如 "1小时 5分3秒" 的文本，输入不合法时返回空字符串
 */
export const getTimeAgo = (pastTime: number | string): string => {
  const timestampInSeconds = Number(pastTime);

  if (!Number.isFinite(timestampInSeconds) || timestampInSeconds <= 0) {
    return "";
  }

  const diffMs = Date.now() - timestampInSeconds * 1000;
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}小时 ${minutes}分${seconds}秒`;
  }

  if (minutes > 0) {
    return `${minutes}分${seconds}秒`;
  }

  return `${seconds}秒`;
};

/**
 * 格式化时间戳为 "YYYY/MM/DD HH:mm:ss" 格式的字符串
 * @param timestamp 毫秒时间戳
 * @returns 格式化后的时间字符串
 */
export const formatTime = (timestamp: number | string): string => {
  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};