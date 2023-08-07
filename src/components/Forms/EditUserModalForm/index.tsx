import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { EditUserFormSchema } from "./EditUserFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { CgSpinnerTwo } from "react-icons/cg";
import { ConfirmToast } from "react-confirm-toast";
import { DialogContentText } from "@mui/material";

interface IEditUserFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IEditUserForm {
  name: string;
  email: string;
  username: string;
  phone: string;
}

export default function EditUserFormDialog({
  open,
  setOpen,
}: IEditUserFormDialogProps) {
  const { editUser, loading, deleteUser } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUserForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(EditUserFormSchema as any),
  });

  return (
    <div>
      <Button color="inherit" variant="outlined" onClick={handleClickOpen}>
        Editar seus dados
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar dados do cliente</DialogTitle>
        <DialogContentText className="form-subtitle">Preencha somente os campos que deseja alterar</DialogContentText>
        <DialogContent>
          <StyledForm onSubmit={handleSubmit(editUser)}>
            <Input
              type="text"
              error={errors.name}
              register={register("name")}
              label="Nome"
            />

            <Input
              type="email"
              error={errors.email}
              register={register("email")}
              label="Email"
            />

            <Input
              type="text"
              error={errors.phone}
              register={register("phone")}
              label="Telefone para contato"
            />

            <Input
              type="text"
              error={errors.username}
              register={register("username")}
              label="Nome de usuario"
            />

            <StyledButton
              type="submit"
              $buttonSize="large"
              $buttonStyle="primary"
            >
              {loading ? (
                <CgSpinnerTwo className="spinner" />
              ) : (
                "Salvar Mudanças"
              )}
            </StyledButton>
          </StyledForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <ConfirmToast
            asModal={true}
            childrenClassName="margin-top-10"
            customCancel="Cancelar"
            customConfirm="Confirmar"
            customFunction={deleteUser}
            message="ATENÇÃO! Esta ação é irreversível, todos os dados do usuário e contatos associados serão excluídos permanentemente. Tem certeza que deseja prosseguir? "
            showCloseIcon={false}
            theme="light"
          >
            <Button>Excluir Conta</Button>
          </ConfirmToast>
        </DialogActions>
      </Dialog>
    </div>
  );
}
