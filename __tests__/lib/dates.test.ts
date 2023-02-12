import { convertDateObjectToDate, getCurrentYear, getCurrentYearMonth, getToday } from "@lib/dates";

describe("test", () => {
  describe("all exports", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("June 1, 2000 00:00:00"));
    });
    it("should convert date object to date", () => {
      const pastDateObject = new Date("December 17, 1995 03:24:00");
      const actual = convertDateObjectToDate(pastDateObject);
      const expected = "1995-12-17";
      expect(actual).toEqual(expected);
    });
    it("should get today", () => {
      const actual = getToday();
      const expected = "2000-06-01";
      expect(actual).toEqual(expected);
    });
    it("should get current year & month", () => {
      const actual = getCurrentYearMonth();
      const expected = "2000-06";
      expect(actual).toEqual(expected);
    });
    it("should get current year", () => {
      const actual = getCurrentYear();
      const expected = "2000";
      expect(actual).toEqual(expected);
    });
  });

  describe("correctness across all hours", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])(
      `should convert date object to date at %i:00`,
      (hour) => {
        jest.setSystemTime(new Date(`June 2, 2000 ${hour}:00`));
        const pastDateObject = new Date("December 17, 1995 03:24:00");
        const actual = convertDateObjectToDate(pastDateObject);
        const expected = "1995-12-17";
        expect(actual).toEqual(expected);
      }
    );
  });
});
