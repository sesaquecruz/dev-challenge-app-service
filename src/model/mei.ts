import { ValidationError } from "../error/validation";
import { getOnlyCnpjDigits } from "../utils/formatations";
import { isValidCnpj, isValidEmail } from "../utils/validations";

class Mei {
  readonly cnpj: string;
  readonly email: string;

	constructor(cnpj: string, email: string) {
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
  }
}

export { Mei };
