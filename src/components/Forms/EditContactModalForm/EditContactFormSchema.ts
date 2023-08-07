import * as yup from "yup";

export const EditContactFormSchema = yup.object({
  name: yup.string(),

  email: yup
    .string()
    .email("O e-mail digitado é invalido"),

  phone: yup.string(),
});
