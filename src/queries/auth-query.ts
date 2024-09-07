import { useMutation } from "@tanstack/react-query";
import authService from "../services/auth/auth.service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.postLogin,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authService.postLogout,
  });
};
