import { ILoginBody } from "../../services/auth/auth.service.i";

export interface IAuthContext {
  loading: boolean;
  logout: () => void;
  userInfo: IUserInfo | null;
  setLoading: (value: boolean) => void;
  setUser: (value: IUserInfo | null) => void;
  login: (params: ILoginParams) => void;
}

export interface ILoginParams {
  body: ILoginBody;
}

export interface IUserInfo {
  id: number | null;
  username: string;
  fullName: string;
  dayOfBirth: string;
  address: string;
  numberPhone: string;
  password: string;
  roles: IRole[];
}

export interface IRole {
  id: number;
  name: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: IUserInfo;
}
