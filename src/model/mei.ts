import { ValidationError } from "../error/validation";
import { getOnlyCnpjDigits } from "../utils/formatations";
import { isValidCnpj, isValidEmail } from "../utils/validations";
import { Das } from "./das";

class Mei {
  readonly cnpj: string;
  readonly email: string;
  readonly das: Das;

	constructor(cnpj: string, email: string, das: Das) {
    cnpj = getOnlyCnpjDigits(cnpj.trim());
    email = email.trim();
    
    const errors: string[] = [];

    if (!isValidCnpj(cnpj)) {
      errors.push("cnpj is invalid");
    }

    if (!isValidEmail(email)) {
      errors.push("email is invalid");
    }

    if (errors.length > 0 ) {
      throw new ValidationError(errors);
    }

    this.cnpj = cnpj;
    this.email = email;
    this.das = das;
  }
}

export { Mei };
