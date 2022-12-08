export interface PostType {
  title: string;
  desc: string;
  id: string;
  img: string;
}

export interface User {
  username?: string;
  email: string;
  password: string;
}

export interface ErrorType {
  message: string;
}

export interface IAuthContextProps {
  currentUser?: User | null;
  login?: (user: User) => void;
  logout?: (user: User) => void;
  children?: any;
}
