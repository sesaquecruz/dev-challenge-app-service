import { ValidationError } from "../error/validation";
import { Mei } from "./mei";

describe("test MEI creation", () => {
  it("with valid values", () => {
    const cnpjFormatted = "85.443.315/0001-66";
    const cnpjOnlyDigits = "85443315000166";
    const email = "user@mail.com";

    let mei = new Mei(cnpjFormatted, email);
    expect(mei.cnpj).toBe(cnpjOnlyDigits);
    expect(mei.email).toBe(email);

    mei = new Mei(cnpjOnlyDigits, email);
    expect(mei.cnpj).toBe(cnpjOnlyDigits);
    expect(mei.email).toBe(email);
  });

  it("with valid values containing spaces", () => {
    const cnpj = "  85443315000166   ";
    const email = " user@mail.com  ";

    const mei = new Mei(cnpj, email);
    expect(mei.cnpj).toBe(cnpj.trim());
    expect(mei.email).toBe(email.trim());
  });

  it("with invalid values", () => {
    const cnpjValid = "85443315000166";
    const emailValid = "user@mail.com";
    
    const cnpjInvalid = "85443315000165";
    const emailInvalid = "user@mailcom";

    const expectErrors = (cnpj: string, email: string, errors: string[]) => {
      try {
        new Mei(cnpj, email);
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);  
        expect((error as ValidationError).errors).toEqual(errors);
        return;
      }
      throw new Error("mei creating did not throw an error");
    };
    
    expectErrors(cnpjInvalid, emailValid, ["cnpj is invalid"]);
    expectErrors(cnpjValid, emailInvalid, ["email is invalid"]);
    expectErrors(cnpjInvalid, emailInvalid, ["cnpj is invalid", "email is invalid"]);
  });
});
