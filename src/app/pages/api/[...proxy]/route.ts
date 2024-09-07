import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import httpProxy from "http-proxy";
import envConfig from "../../../../config/env-config";

const proxy = httpProxy.createProxyServer({});
export function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("response", res);
  req.headers.cookie = "";
  proxy.web(req, res, {
    target: envConfig.NEXT_PUBLIC_API_ENDPOINT,
    changeOrigin: true,
    selfHandleResponse: false,
  });
  // return response.status()
}
