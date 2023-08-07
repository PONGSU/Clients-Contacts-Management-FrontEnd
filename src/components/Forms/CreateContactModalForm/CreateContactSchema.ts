import * as yup from "yup";

export const CreateContactFormSchema = yup.object({
  name: yup.string().required("É preciso informar o nome do contato"),

  email: yup
    .string()
    .email("O e-mail digitado é invalido")
    .required("Informe um email deste contato"),

  phone: yup.string().required("Informe um telefone para contato"),
});
