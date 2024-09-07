import { AxiosRequestConfig } from "axios";
import axiosClient from "../../config/axios-config";
import { ILoginBody, IUserInfo } from "./auth.service.i";

const postLogin = async (body: ILoginBody, config: AxiosRequestConfig = {}) => {
  return axiosClient.post<IUserInfo>("login", body, config);
};

const getGetUserInfoFromAccessToken = async (
  config: AxiosRequestConfig = {}
) => {
  return axiosClient.get<IUserInfo>("auth/check-acces-token", config);
};

const authService = {
  postLogin,
  getGetUserInfoFromAccessToken,
};
export default authService;
