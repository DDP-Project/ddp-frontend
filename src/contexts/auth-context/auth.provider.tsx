"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import authService from "../../services/auth/auth.service";
import {
  IAuthContext,
  ILoginParams,
  ILoginResponse,
  IUserInfo,
} from "./auth.provider.i";

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
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(
    defaultProvider.userInfo
  );
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = (params: ILoginParams) => {
    authService.postLogin<IUserInfo>(params.body).then((response) => {
      setUserInfo({ ...response.data });
      router.replace("/");
    });
  };

  const handleLogout = () => {
    clear();
    router.push("/login");
  };

  const clear = () => {
    setUserInfo(null);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
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
    // const initAuth = async () => {
    //   const accessToken = Cookies.get("access_token");
    //   console.log("access_token", accessToken)
    //   if (accessToken) {
    //     authService
    //       .getGetUserInfoFromAccessToken<IUserInfo>({
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       })
    //       .then((userInfo) => {
    //         setUserInfo(userInfo.data);
    //       })
    //       .catch(() => {
    //         clear();
    //       });
    //   } else {
    //     clear();
    //     if (pathname === "/login") {
    //       router.replace("/login");
    //     }
    //   }
    // };

    // initAuth();
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
