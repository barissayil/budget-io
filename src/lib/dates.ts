export const convertDateObjectToDate = (dateObject: Date): string => {
  return new Date(dateObject.getTime() - dateObject.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10);
};
