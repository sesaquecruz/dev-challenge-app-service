import { Das } from "./das";
import { ValidationError } from "../error/validation";

describe("test Das creation", () => {
  describe("with valid values", () => {
    const year = 2000;
    const month = 1;

    for (let year = 1900; year <= 2200; year++) {
      try{
        const das = new Das(year, month);
        expect(das.year).toBe(year);
        expect(das.month).toBe(month);
      } catch (e) {
        expect(year < 2000 || year > 2100).toBeTruthy();
      }
    }

    for (let month = -12; month <= 24; month++) {
      try {
        const das = new Das(year, month);
        expect(das.year).toBe(year);
        expect(das.month).toBe(month);
      } catch (e) {
        expect(month < 1 || month > 12).toBeTruthy();
      }
    }
  });

  it("with invalid values", () => {
    const yearValid = 2000;
    const monthValid = 1;

    const yearInvalid = 1999;
    const monthInvalid = 0;

    const expectErrors = (year: number, month: number, errors: string[]) => {
      try {
        new Das(year, month);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);  
        expect((error as ValidationError).errors).toEqual(errors);
        return;
      }
      throw new Error("Das creating did not throw an error");
    };

    expectErrors(yearInvalid, monthValid, ["year is invalid"]);
    expectErrors(yearValid, monthInvalid, ["month is invalid"]);
    expectErrors(yearInvalid, monthInvalid, ["year is invalid", "month is invalid"]);
  });
});
