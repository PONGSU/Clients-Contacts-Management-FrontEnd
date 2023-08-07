import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import EditUserFormDialog from "../../components/Forms/EditUserModalForm";
import { Button } from "@mui/material";
import CreateContactFormDialog from "../../components/Forms/CreateContactModalForm";
import EditContactFormDialog from "../../components/Forms/EditContactModalForm";
import { StyledHomePage } from "./style";
import { IoLogOut } from "react-icons/io5";

const HomePage = () => {
  const { logoutUser, user } = useContext(UserContext);

  const [openUserEdit, setOpenUserEdit] = useState(false);
  const [openContactCreate, setOpenContactCreate] = useState(false);
  const [openContactEdit, setOpenContactEdit] = useState(false);

  return (
    <StyledHomePage>
      <header>
        <h1>Seja Bem Vindo, {user?.name}</h1>
        <Button size="large" onClick={logoutUser}>
          Logout <IoLogOut />
        </Button>
      </header>
      <div className="user-info">
        <span>
          <h2>Aqui estão seus dados:</h2>
          <EditUserFormDialog open={openUserEdit} setOpen={setOpenUserEdit} />
        </span>
        <h4>Email: {user?.email}</h4>
        <h4>Telefone: {user?.phone}</h4>
        <h4>Username: {user?.username}</h4>
        <CreateContactFormDialog
          open={openContactCreate}
          setOpen={setOpenContactCreate}
        />
      </div>

      <h2 className="contact-subtitle">Contatos Cadastrados:</h2>
      <ul>
        {user?.contacts &&
          user?.contacts.map((contact) => {
            return (
              <li className="contact-card" key={contact.id}>
                <span>
                  <h4>Nome: {contact.name}</h4>
                  <h4>Telefone: {contact.phone}</h4>
                  <h4>Email: {contact.email}</h4>
                </span>
                <EditContactFormDialog
                  open={openContactEdit}
                  setOpen={setOpenContactEdit}
                  contactId={contact.id}
                />
              </li>
            );
          })}
      </ul>
    </StyledHomePage>
  );
};

export default HomePage;
