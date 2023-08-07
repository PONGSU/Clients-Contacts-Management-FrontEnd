import { IRegisterForm } from '../../components/Forms/RegisterForm';

export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IUserContext {
  userLoad: () => Promise<void>;
  createUser: (data: IRegisterForm) => void;
  loginUser: (formData: ILoginFormValue) => Promise<void>;
  logoutUser: () => void;
  user: IUser | null;
  editUser: (data: IUser) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_admin?: boolean;
  date_joined?: string | Date;
  username?: string;
  contacts?: IContact[];
}


export interface IContact {
  id: number;
  email: string;
  name: string;
  phone: string;
}

export interface ILoginFormValue {
  username: string;
  password: string;
}
