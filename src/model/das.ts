import { ValidationError } from "../error/validation";
import { isValidMonth, isValidYear } from "../utils/validations";

class Das {
  readonly year: number;
  readonly month: number;

  constructor(year: number, month: number) {
    const errors: string[] = [];

    if (!isValidYear(year)) {
      errors.push("year is invalid");
    }

    if (!isValidMonth(month)) {
      errors.push("month is invalid");
    }

    if (errors.length > 0 ) {
      throw new ValidationError(errors);
    }

    this.year = year;
    this.month = month;
  }
}

export { Das };
