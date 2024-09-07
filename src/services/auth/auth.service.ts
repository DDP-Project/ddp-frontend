import { AxiosRequestConfig } from "axios";
import axiosClient from "../../config/axios-config";
import { ILoginBody, IUserInfo } from "./auth.service.i";

const postLogin = async (body: ILoginBody, config: AxiosRequestConfig = {}) => {
  return axiosClient.post<IUserInfo>("login", body, config);
};

const postLogout = async () => {
  return axiosClient.post<IUserInfo>("logout", {});
};

const authService = {
  postLogin,
  postLogout,
};
export default authService;
