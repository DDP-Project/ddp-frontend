import { ILoginBody, IUserInfo } from "../../services/auth/auth.service.i";

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
