import axiosClient from "../../config/axios-config";
import { IUserInfo } from "../auth/auth.service.i";

const accountsService = {
  getAccountsMe: async () => {
    const { data } = await axiosClient.get<IUserInfo>("accounts/me");
    return data;
  },
};

export default accountsService;
