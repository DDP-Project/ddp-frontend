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
