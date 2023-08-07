import * as yup from "yup";

export const EditUserFormSchema = yup.object({
  name: yup.string(),

  email: yup
    .string()
    .email("O e-mail digitado é invalido"),

  username: yup.string(),
  phone: yup.string(),
});
