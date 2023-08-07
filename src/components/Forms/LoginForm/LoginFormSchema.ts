import * as yup from "yup";

export const LoginFormSchema = yup.object({
  username: yup.string().required("O nome de usuário é obrigatório!"),

  password: yup.string().required("Senha é obrigatório!"),
});
