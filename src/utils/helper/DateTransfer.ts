import dayjs from "dayjs";

export const DateTransfer = (date?: string) => {
  return dayjs(date).format("DD/MM/YYYY");
}

export const getTimeDiff = (date?: string) => {
  const now = dayjs();
  const postDate = dayjs(date);

  const minutesDiff = now.diff(postDate, 'minute');
  const hoursDiff = now.diff(postDate, 'hour');
  const daysDiff = now.diff(postDate, 'day');

  if (minutesDiff < 60) {
    return `${minutesDiff} phút trước`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} giờ trước`;
  } else {
    return `${daysDiff} ngày trước`;
  }
};