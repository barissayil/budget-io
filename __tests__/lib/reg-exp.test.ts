import { getExactRegExp } from "@lib/reg-exp";

describe("Reg Exp", () => {
  describe("getExactRegExp", () => {
    const testGetExactRegExp = (input: string, regExpPattern: string, result: boolean) => {
      const regExp = getExactRegExp(regExpPattern);
      const hasMatch = regExp.test(input);
      expect(hasMatch).toEqual(result);
    };
    describe("with word input", () => {
      const input = "hello";
      it("should have match if the reg exp pattern is equal to the input", () =>
        testGetExactRegExp(input, "hello", true));
      it("should not have match if the reg exp pattern is different from the input", () =>
        testGetExactRegExp(input, "goodbye", false));
      it("should not have match if the reg exp pattern is a substring of the input", () =>
        testGetExactRegExp(input, "h", false));
      it("should not have match if the input is a substring of the reg exp pattern", () =>
        testGetExactRegExp(input, "hello there", false));
    });
    describe("with number input", () => {
      const input = "5.00";
      it("should have match if the reg exp pattern is equal to the input", () =>
        testGetExactRegExp(input, "5.00", true));
      it("should not have match if the reg exp pattern is different from the input", () =>
        testGetExactRegExp(input, "77.77", false));
      it("should not have match if the reg exp pattern is a substring of the input", () =>
        testGetExactRegExp(input, "5", false));
      it("should not have match if the input is a substring of the reg exp pattern", () =>
        testGetExactRegExp(input, "5.000", false));
    });
  });
});
