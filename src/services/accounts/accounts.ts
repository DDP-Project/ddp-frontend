import axiosClient from "../../config/axios-config";
import { IUserInfo } from "../auth/auth.service.i";

const accountsService = {
  getAccountsMe: async () => {
    return axiosClient.get<IUserInfo>("accounts/me");
  },
};

export default accountsService;
