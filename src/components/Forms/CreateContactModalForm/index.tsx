import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { CreateContactFormSchema } from "./CreateContactSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { CgSpinnerTwo } from "react-icons/cg";

interface IContactFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IContactForm {
  name: string;
  email: string;
  phone: string;
}

export default function CreateContactFormDialog({
  open,
  setOpen,
}: IContactFormDialogProps) {
  const { createContact, loading } = useContext(UserContext);

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
  } = useForm<IContactForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(CreateContactFormSchema as any),
  });

  return (
    <div>
      <Button
        className="btn-create-ctt"
        color="inherit"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Cadastre um novo contato
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre seu novo contato</DialogTitle>
        <DialogContent>
          <StyledForm onSubmit={handleSubmit(createContact)}>
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
