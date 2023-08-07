import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
  const { user, editUser, loading } = useContext(UserContext);

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar dados do cliente</DialogTitle>
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
              {loading ? <CgSpinnerTwo className="spinner" /> : "Criar Conta"}
            </StyledButton>
          </StyledForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
