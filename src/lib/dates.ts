export const convertDateObjectToDate = (dateObject: Date): string => {
  return new Date(dateObject.getTime() - dateObject.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10);
};

export const getToday = (): string => {
  return convertDateObjectToDate(new Date());
};

export const getCurrentYearMonth = (): string => {
  return getToday().substring(0, 7);
};

export const getCurrentYear = (): string => {
  return getCurrentYearMonth().substring(0, 4);
};
