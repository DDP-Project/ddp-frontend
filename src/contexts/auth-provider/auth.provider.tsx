"use client";

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
  const getAccountsProfile = useAccountsProfile();
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
    try {
      const initAuth = async () => {
        if (getAccountsProfile.isPending) return;

        if (!getAccountsProfile?.data?.data) return handleLogout();
        setUserInfo(getAccountsProfile.data.data);
      };

      initAuth();
    } catch {
      handleLogout();
    }
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
