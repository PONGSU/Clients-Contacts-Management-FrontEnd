import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgSpinnerTwo } from "react-icons/cg";

import { UserContext } from "../../../providers/UserContext";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typograthy";
import Input from "../Input";
import { LoginFormSchema } from "./LoginFormSchema";
import { ILoginFormValue } from "./types";
import { Button, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { loginUser, loading } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormValue>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(LoginFormSchema as any),
  });

  const submit: SubmitHandler<ILoginFormValue> = (formData) => {
    loginUser(formData);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <DialogTitle className="form-title">Faça o Login</DialogTitle>
      <Input
        label="Usuario"
        type="text"
        register={register("username")}
        error={errors.username}
      />

      <Input
        label="Senha"
        type="password"
        register={register("password")}
        error={errors.password}
      />

      <StyledButton type="submit" $buttonSize="large" $buttonStyle="primary">
        {loading ? <CgSpinnerTwo className="spinner" /> : "Entrar"}
      </StyledButton>

      <StyledParagraph $textAlign="center" $fontColor="greyBold">
        Ainda não tem uma conta?
      </StyledParagraph>

      <Button
        onClick={() => {
          navigate("/register");
        }}
      >
        Cadastre-se
      </Button>
    </StyledForm>
  );
};

export default LoginForm;
