export const shortenString = (string: string, maximumLength: number) =>
  string.length <= maximumLength ? string : string.slice(0, maximumLength - 3) + "...";
