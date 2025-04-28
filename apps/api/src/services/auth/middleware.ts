import { NextFunction, Request, RequestHandler, Response } from "express";
import { JWT } from "./model";
import { authUsersKv } from "./kv";
import { jsonError } from "@/utils/errors";

export function protectedRoute(
  ctl: (req: ProtectedRequest, res: Response) => void | Promise<void>,
): RequestHandler[] {
  return [
    async (req: Request, res: Response, next: NextFunction) => {
      const AuthorizationHeader = req.header("Authorization");
      try {
        if (!AuthorizationHeader) throw "";
        const [, accessToken] = AuthorizationHeader.split(" ");
        if (!accessToken) throw "";
        const userId = JWT.verifyAccessToken(accessToken);
        if (!userId || !Number.isSafeInteger(+userId)) throw "";
        const user = authUsersKv.get(+userId);
        if (!user) throw "";
        req.user = user;
      } catch {
        res.status(401).json(jsonError("access denied"));
        return;
      }
      next();
    },
    ctl as RequestHandler,
  ];
}
