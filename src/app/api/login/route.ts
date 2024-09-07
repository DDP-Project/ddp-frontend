import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import AxiosClient from "../../../config/axios-config";
import envConfig from "../../../config/env-config";
import { ILoginResponse } from "../api.i";

export const config = {
  api: {
    boduParser: false,
  },
};
export async function POST(req: NextRequest) {
  try {
    const dataBody = await req.json();
    const response = await AxiosClient.post<ILoginResponse>(`login`, dataBody, {
      baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
    });

    const { userInfo, accessToken, refreshToken } = response.data;
    const cookieStore = cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.json(userInfo, {
      status: response.status,
    });
  } catch (error: AxiosError | any) {
    if (error?.isAxiosError === true) {
      return NextResponse.json(
        {
          status: (error as AxiosError).response?.status,
          message: (error as AxiosError).response?.statusText,
        },
        {
          status: (error as AxiosError).response?.status,
        }
      );
    }
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
