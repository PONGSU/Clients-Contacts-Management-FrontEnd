import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import EditUserFormDialog from "../../components/Forms/EditUserModalForm";

const HomePage = () => {
  const { logoutUser, user } = useContext(UserContext);

  const [openUserEdit, setOpenUserEdit] = useState(false);


  return (
    <>
      <h1>Seja Bem Vindo, {user?.name}</h1>
      <button onClick={logoutUser}>Logout</button>
      <div>
        <h2>Aqui estão seus dados:</h2>
        <button>editar</button>
        <EditUserFormDialog open={openUserEdit} setOpen={setOpenUserEdit}/>
        <h4>Email: {user?.email}</h4>
        <h4>Telefone: {user?.phone}</h4>
        <h4>Username: {user?.username}</h4>
        <h4></h4>
      </div>

      <h2>Contatos Cadastrados:</h2>
      <ul>
        {user?.contacts.map(contact =>{
          return <li>
            <h4>Nome: {contact.name}</h4>
            <h4>Telefone: {contact.phone}</h4>
            <h4>Email: {contact.email}</h4>
          </li>
        })}
      </ul>
    </>
  );
};

export default HomePage;
