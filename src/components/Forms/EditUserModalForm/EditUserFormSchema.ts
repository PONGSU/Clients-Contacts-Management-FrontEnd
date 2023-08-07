import * as yup from "yup";

export const EditUserFormSchema = yup.object({
  name: yup.string().required("Inserir um nome é obrigatório!"),

  email: yup
    .string()
    .email("O e-mail digitado é invalido")
    .required("E-mail é obrigatório!"),

  username: yup.string().required("Informe o usuario"),
  phone: yup.string().required("Informe um telefone para contato"),
});
