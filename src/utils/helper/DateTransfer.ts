import dayjs from "dayjs";

export const DateTransfer = (date?: string) => {
  return dayjs(date).format("DD/MM/YYYY");
}