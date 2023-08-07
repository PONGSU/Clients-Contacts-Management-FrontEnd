import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import { ILoginFormValue, IUser, IUserContext, IUserProviderProps } from './type';
import { api } from '../../services/api';
import { IRegisterForm } from '../../components/Forms/RegisterForm';
import { IContactForm } from '../../components/Forms/CreateContactModalForm';

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [contactId, setContactId] = useState<number | string | null>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userLoad = async () => {
    const token = localStorage.getItem('accessTOKEN');
    const userID = localStorage.getItem('user_id');
    if (token && userID) {
      try {
        const res = await api.get(`/users/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);

        return navigate('/home');
      } catch (error) {
        localStorage.clear()
        return navigate('/');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessTOKEN');
    const userID = localStorage.getItem('user_id');
    if (token && userID) {
      const userAutoLogin = async () => {
        try {
          const res = await api.get(`/users/${userID}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data)
          if (
            window.location.pathname != '/home'
          ) {
            navigate('/home');
          }
        } catch (error) {
          window.localStorage.clear();
          setUser(null);
          toast.error(
            'Não encontramos uma sessão ativa, por favor faça o login para acessar'
          );
          if (window.location.pathname != '/register') {
            navigate('/login');
          }
        }
      };
      userAutoLogin();
    }
  }, []);  

  const createUser = async (data: IRegisterForm) => {
    setLoading(true);
    const newData = {
      email: data.email,
      name: data.name,
      username: data.username,
      phone: data.phone,
      password: data.password,
    };

      try {
        const res = await api.post('/users/', newData);
        console.log(res);        
        toast.success('Cadastro realizado com sucesso!');
        navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.username);        
        if (error?.response?.data?.username == 'This username already exists.') {
          toast.error('Nome de usuário já cadastrado!');
        } else {
          console.error(error);
          toast.error('Ops,algo deu errado!');
        }
      } finally {
        setLoading(false);
      }
    
  };

  
  const loginUser = async (formData: ILoginFormValue) => {
    setLoading(true); 
    try {
      const res = await api.post('/users/login/', formData);
      localStorage.setItem('accessTOKEN', res.data.access);
      const decodedToken = jwtDecode(res.data.access) as { user_id: number }
      if (decodedToken) {
        const userId = decodedToken.user_id;
        localStorage.setItem('user_id', userId.toString());
      }
      toast.success('Login bem sucedido');
      navigate('/home');
      setTimeout(() => {
        location.reload();       
     }, 750);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-constant-condition
      if (error.response.data === 'Incorrect password' || 'Cannot find user') {
        toast.error('Email e/ou senha incorretos');
      } else {
        console.error(error);
        toast.error('Algo deu errado :(');
      }
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.clear()
    toast.info('Sessão encerrada');
    navigate('/');
  };

  
  const editUser = async (data: Partial<IUser>) => {
    setLoading(true);
    const userId = localStorage.getItem('user_id'); null;
    const token = localStorage.getItem('accessTOKEN');
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== null && value !== "") {
          acc[key] = value;
      }
      return acc;
  }, {});

    try {
      await api.patch(`/users/${userId}/`, cleanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Alteração feita com sucesso!');
      setTimeout(() => {
         location.reload();       
      }, 1250);
      // setUser(response.data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.error == 'Email already exists.') {
        toast.error('Este email já está cadastrado em nosso banco de dados')
      } else {
        console.error(error);      
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {    
    const userId = localStorage.getItem('user_id'); null;
    const token = localStorage.getItem('accessTOKEN');

    try {
      await api.delete(`/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Conta deletada com sucesso!');
      setTimeout(() => {
        logoutUser();       
      }, 1250);
      // setUser(response.data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {      
      console.error(error);      
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (data: IContactForm) => {
    setLoading(true);    
    const token = localStorage.getItem('accessTOKEN');
    const newData = {
      email: data.email,
      name: data.name,
      phone: data.phone,
    };

      try {
        const res = await api.post('contacts/register/', newData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);        
        toast.success('Contato cadastrado com sucesso!');
        setTimeout(() => {
          location.reload();       
       }, 750);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.username);        
        if (error?.response?.data?.username == 'This username already exists.') {
          toast.error('Nome de usuário já cadastrado!');
        } else {
          console.error(error);
          toast.error('Ops,algo deu errado!');
        }
      } finally {
        setLoading(false);
      }
    
  };

  const editContact = async (data: Partial<IContactForm>) => {
    setLoading(true);
    const token = localStorage.getItem('accessTOKEN');
    const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== null && value !== "") {
          acc[key] = value;
      }
      return acc;
  }, {});

    try {
      await api.patch(`/contacts/${contactId}/`, cleanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Alteração feita com sucesso!');
      setTimeout(() => {
         location.reload();       
      }, 1250);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.error == 'Email already exists.') {
        toast.error('Este email já está cadastrado em nosso banco de dados')
      } else {
        console.error(error);      
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async () => {    
    const token = localStorage.getItem('accessTOKEN');

    try {
      await api.delete(`/contacts/${contactId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Contato deletada com sucesso!');
      setTimeout(() => {
        location.reload();     
      }, 1250);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {      
      console.error(error);      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          user,
          userLoad,
          createUser,
          loginUser,
          logoutUser,
          editUser,
          loading,
          setLoading,
          deleteUser,
          createContact,
          editContact,
          deleteContact,
          contactId,
          setContactId,
        }}
      >
        {children}
      </UserContext.Provider>
    </>
  );
};
