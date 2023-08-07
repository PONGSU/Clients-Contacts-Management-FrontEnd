import { IContactForm } from "../../components/Forms/CreateContactModalForm";
import { IRegisterForm } from "../../components/Forms/RegisterForm";

export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IUserContext {
  userLoad: () => Promise<void>;
  createUser: (data: IRegisterForm) => void;
  loginUser: (formData: ILoginFormValue) => Promise<void>;
  logoutUser: () => void;
  user: IUser | null;
  editUser: (data: Partial<IUser>) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUser: () => Promise<void>;
  createContact: (data: IContactForm) => void;
  editContact: (data: Partial<IContactForm>) => void;
  deleteContact: () => Promise<void>;
  contactId: null | number | string;
  setContactId: React.Dispatch<React.SetStateAction<null | number | string>>;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  is_admin?: boolean;
  date_joined?: string | Date;
  username?: string;
  contacts: IContact[];
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
