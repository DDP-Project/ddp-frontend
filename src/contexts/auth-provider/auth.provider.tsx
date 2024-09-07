"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import authService from "../../services/auth/auth.service";
import { IUserInfo } from "../../services/auth/auth.service.i";
import { IAuthContext, ILoginParams } from "./auth.provider.i";
import { useLoginMutation } from "../../queries/auth-query";

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

  const handleLogout = () => {};

  const values = {
    userInfo,
    loading,
    setUser: setUserInfo,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  useEffect(() => {}, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
