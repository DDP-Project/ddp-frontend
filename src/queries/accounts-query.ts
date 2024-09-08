import { useQuery } from "@tanstack/react-query";
import accountsService from "../services/accounts/accounts";
import { QueryKey } from "./constant";

export const useAccountsProfile = () => {
  return useQuery({
    queryKey: [QueryKey.ACCOUNTS_PROFILE],
    queryFn: accountsService.getAccountsMe,
    retry: 0,
  });
};
