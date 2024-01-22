import { FieldRules } from "./field-rules";

const Mei: {
  cnpj: FieldRules;
  email: FieldRules;
} = {
  cnpj: {
    required: true,
    type: "string",
  },
  email: {
    required: true,
    type: "string",
  },
};

export { Mei };
