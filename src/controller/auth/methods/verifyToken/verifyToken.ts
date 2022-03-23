import { RequestHandler } from "@ooic/core";
import jwt, { Jwt } from "jsonwebtoken";

import { Login } from "@/model/Login";

const verifyToken: RequestHandler = async (request, response, next) => {
  try {
    const { refreshToken, accessToken } = request.cookies;
    const authorizationHeader = request.headers["authorization"];
    const tokenFromBody = request?.body?.access_token;
    const token = authorizationHeader?.substring(7) || accessToken || tokenFromBody;

    if (!tokenFromBody && !accessToken && (!authorizationHeader || !authorizationHeader?.startsWith("Bearer "))) {
      throw { statusCode: 401, message: "Invalid Authorization Strategy" };
    }

    if (!token) throw { statusCode: 403, message: "A token is required for authentication" };

    try {
      request.authUser = {
        ...(jwt.verify(token, process.env.TOKEN_KEY) as jwt.JwtPayload),
        access_token: token,
        data: {
          settings: {
            role: "admin",
            admin: true,
          },
          displayName: "Orient admin",
        },
        user: { role: "admin" },
        role: "admin",
      };
      next();
    } catch (err) {
      const login = await Login.findOne({
        where: { refreshToken },
      });
      const user = jwt.decode(token) as jwt.JwtPayload;
      if (login && user && login.userId === user.id) {
        const { iat, exp, ...payload } = user;

        const token = jwt.sign(payload, process.env.TOKEN_KEY, {
          expiresIn: "1m",
        });

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);

        response.cookie("accessToken ", token, {
          //  secure: process.env.NODE_ENV !== "development",
          httpOnly: true,
          expires,
        });
        next();
      } else {
        throw { statusCode: 403, message: { login, user } };
      }
    }
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
