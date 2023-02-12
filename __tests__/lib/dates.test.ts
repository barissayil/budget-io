import { convertDateObjectToDate, getCurrentYear, getCurrentYearMonth, getToday } from "@lib/dates";

describe("test", () => {
  describe("all exports", () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("June 1, 2000 00:00:00"));
    });
    it("should convert date object to date", () => {
      const dateObject1990_10_30 = new Date("1990-10-30");
      const actual = convertDateObjectToDate(dateObject1990_10_30);
      const expected = "1990-10-30";
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
      `should be correct at %i:00`,
      (hour) => {
        jest.setSystemTime(new Date(`June 2, 2000 ${hour}:00`));
        const dateObject1990_10_30 = new Date("1990-10-30");
        const actual = convertDateObjectToDate(dateObject1990_10_30);
        const expected = "1990-10-30";
        expect(actual).toEqual(expected);
      }
    );
  });
});
