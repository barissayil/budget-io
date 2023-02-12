import dayjs from "dayjs";

export const convertDateObjectToDate = (dateObject: Date): string => {
  return dayjs(dateObject).format().substring(0, 10);
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
