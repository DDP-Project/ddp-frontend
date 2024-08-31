import { AxiosRequestConfig } from "axios";
import axiosClient from "../../config/axios-config";
import { ILoginBody } from "./auth.service.i";

const postLogin = async <T>(
  body: ILoginBody,
  config: AxiosRequestConfig = {}
) => {
  return axiosClient.post<T>("login", body, config);
};

const getGetUserInfoFromAccessToken = async <T>(
  config: AxiosRequestConfig = {}
) => {
  return axiosClient.get<T>("auth/check-acces-token", config);
};

const authService = {
  postLogin,
  getGetUserInfoFromAccessToken,
};
export default authService;
