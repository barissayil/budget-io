export const getTempUUID = (): string => {
  return "temp" + Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const isTemp = (id: string): boolean => id.substring(0, 4) === "temp";
