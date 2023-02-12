import dayjs from "dayjs";

export const convertDateToIsoDateString = (date: Date): string => {
  return dayjs(date).format().substring(0, 10);
};

export const getToday = (): string => {
  return dayjs().format().substring(0, 10);
};

export const getCurrentYearMonth = (): string => {
  return dayjs().format().substring(0, 7);
};

export const getCurrentYear = (): string => {
  return dayjs().format().substring(0, 4);
};
