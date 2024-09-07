export interface ILoginBody {
  username: string;
  password: string;
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
