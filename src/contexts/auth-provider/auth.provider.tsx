"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useAccountsProfile } from "../../queries/accounts-query";
import { useLoginMutation, useLogoutMutation } from "../../queries/auth-query";
import { IUserInfo } from "../../services/auth/auth.service.i";
import { IAuthContext, ILoginParams } from "./auth.provider.i";

const defaultProvider: IAuthContext = {
  userInfo: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};
const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const loginUseMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const { data, error, isPending, isError, refetch } = useAccountsProfile();
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(
    defaultProvider.userInfo
  );
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  const handleLogin = (params: ILoginParams) => {
    if (loginUseMutation.isPending) return;
    loginUseMutation.mutateAsync(params.body).then((response) => {
      setUserInfo({ ...response.data });
      router.replace("/");
    });
  };

  const handleLogout = () => {
    if (logoutMutation.isPending) return;

    setUserInfo(null);
    return logoutMutation.mutateAsync().then(() => router.replace("/login"));
  };

  const values = {
    userInfo,
    loading,
    setUser: setUserInfo,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  useEffect(() => {
    const initAuth = () => {
      if (isPending) return;

      if (isError) {
        if ((error as AxiosError)?.response?.status === 401) {
          handleLogout();
        } else {
          refetch();
        }
        return;
      }
      if (data) {
        setUserInfo(data);
      }
    };

    initAuth();
  }, [isPending]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
