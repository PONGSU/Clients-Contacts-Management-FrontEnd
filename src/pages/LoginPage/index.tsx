import LoginForm from "../../components/Forms/LoginForm";
import { StyledLoginPage } from "./style";
import logo from "../../assets/TransparentLogo.png";

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <img src={logo} alt="Logo image for the brand" />
      <LoginForm />
    </StyledLoginPage>
  );
};

export default LoginPage;
