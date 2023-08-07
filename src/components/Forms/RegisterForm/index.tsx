import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import { TextField } from '@mui/material';
import { CgSpinnerTwo } from 'react-icons/cg';
import { Link } from 'react-router-dom';

import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { RegisterFormSchema } from './RegisterFormSchema';
import { UserContext } from '../../../providers/UserContext';
import { StyledParagraph } from '../../../styles/typograthy';
import { DialogTitle } from '@mui/material';

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
}

const RegisterForm = () => {
  const { createUser, loading } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(RegisterFormSchema as any),
  });

  

  return (
    <StyledForm onSubmit={handleSubmit(createUser)}>
      <DialogTitle className='form-title'>Crie sua conta para acessar a plataforma</DialogTitle>
      <Input
        type='text'
        error={errors.name}
        register={register('name')}
        label='Nome'
      />

      <Input
        type='email'
        error={errors.email}
        register={register('email')}
        label='Email'
      />

      
      <Input
        type='text'
        error={errors.phone}
        register={register('phone')}
        label='Telefone para contato'
      />

      <Input
        type='text'
        error={errors.username}
        register={register('username')}
        label='Nome de usuario'
      />

      <Input
        type='password'
        error={errors.password}
        register={register('password')}
        label='Senha'
      />
      <Input
        type='password'
        error={errors.confirmPassword}
        register={register('confirmPassword')}
        label='Confirmar Senha'
      />
      

      <Link className='linkToLogin' to={'/login'}>
        <StyledParagraph className='link' $fontColor='greyBold'>
          Já tem uma conta? Clique aqui
        </StyledParagraph>
      </Link>

      <StyledButton type='submit' $buttonSize='large' $buttonStyle='primary'>
        {loading ? <CgSpinnerTwo className='spinner' /> : 'Criar Conta'}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
