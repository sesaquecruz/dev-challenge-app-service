import { FieldRules } from "./field-rules";

const Mei: {
  cnpj: FieldRules;
  email: FieldRules;
  year: FieldRules;
  month: FieldRules;
} = {
  cnpj: {
    required: true,
    type: "string",
  },
  email: {
    required: true,
    type: "string",
  },
  year: {
    required: true,
    type: "number",
  },
  month: {
    required: true,
    type: "number",
  },
};

export { Mei };
