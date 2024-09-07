import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const config = {
  api: {
    boduParser: false,
  },
};
export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return NextResponse.json(
      {
        status: 201,
        message: "OK",
      },
      {
        status: 201,
      }
    );
  } catch (error: AxiosError | any) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
