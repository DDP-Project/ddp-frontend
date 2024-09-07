"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLoginMutation, useLogoutMutation } from "../../queries/auth-query";
import accountsService from "../../services/accounts/accounts";
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
  const pathname = usePathname();
  const loginUseMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
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
    const initAuth = async () => {
      accountsService
        .getAccountsMe()
        .then((userInfo) => {
          setUserInfo(userInfo.data);
        })
        .catch(() => {
          if (pathname === "/login") {
            router.replace("/login");
          }
        });
    };

    initAuth();
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
