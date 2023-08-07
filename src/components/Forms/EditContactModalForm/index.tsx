import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { EditContactFormSchema } from "./EditContactFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { CgSpinnerTwo } from "react-icons/cg";
import { ConfirmToast } from "react-confirm-toast";
import { DialogContentText } from "@mui/material";

interface IEditContactFormDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contactId: string | number;
}

export interface IEditContactForm {
  name: string;
  email: string;
  phone: string;
}

export default function EditContactFormDialog({
  open,
  setOpen,
  contactId
}: IEditContactFormDialogProps) {
  const { editContact, loading, deleteContact, setContactId } = useContext(UserContext);

  const handleClickOpen = () => {
    setContactId(contactId)
    setOpen(true);    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditContactForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(EditContactFormSchema as any),
  });

  return (
    <div>
      <Button variant="text" color="inherit" size="small" onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar dados do Contato</DialogTitle>
        <DialogContentText className="form-subtitle">Preencha somente os campos que deseja alterar</DialogContentText>
        <DialogContent>
          <StyledForm onSubmit={handleSubmit(editContact)}>
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
          <ConfirmToast
            asModal={true}
            childrenClassName="margin-top-10"
            customCancel="Cancelar"
            customConfirm="Confirmar"
            customFunction={deleteContact}
            message="ATENÇÃO! Esta ação é irreversível, todos os dados do contato serão excluídos permanentemente. Tem certeza que deseja prosseguir? "
            showCloseIcon={false}
            theme="light"
          >
            <Button>Excluir Contato</Button>
          </ConfirmToast>
        </DialogActions>
      </Dialog>
    </div>
  );
}
