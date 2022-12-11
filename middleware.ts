import { NextRequest, NextResponse } from "next/server";
import { verify } from "./utils/jwt";
import axios from "axios";

const secret = process.env.NEXT_PUBLIC_JWT_SEC;

const _middleware = async (req: NextRequest) => {
  let token = JSON.stringify(
    Object.fromEntries(req.cookies._parsed)?.access_token?.value
  )?.replaceAll('"', "");

  let url = req.url;

  // Protected Routes
  if (url.includes("http://localhost:3000/write")) {
    if (token && secret) {
      await verify(token, secret).then(async (res) => {
        if (res.exp > new Date().getTime()) {
          // User is authenticated and token is valid
          return;
        } else {
          // User is authenticated and token is not valid, make user logout
          await axios.post(process.env.API_URL + "/auth/logout", {
            withCredentials: true,
          });
          localStorage.clear();
        }
      });
    } else {
      // User is not authenticated, redirect user to the auth page
      return NextResponse.redirect("http://localhost:3000/register");
    }
  }
};

export default _middleware;
