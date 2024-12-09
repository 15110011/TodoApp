import dayjs from 'dayjs';

export const calcRemainingTime = (time: Date) => {
  const now = dayjs(Date.now());
  const target = dayjs(time);

  const diffInMilliseconds = target.diff(now);

  if (diffInMilliseconds <= 0) {
    return 'Hết thời hạn';
  }

  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return `Còn ${diffInSeconds} giây`;
  } else if (diffInMinutes < 60) {
    return `Còn ${diffInMinutes} phút`;
  } else if (diffInHours < 24) {
    return `Còn ${diffInHours} giờ`;
  } else {
    return `Còn ${diffInDays} ngày`;
  }
};
