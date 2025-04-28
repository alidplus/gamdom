import { jsonError } from "@/utils/errors";
import { CookieOptions, Request, Response } from "express";
import { JWT } from "./model";
import { usersModel } from "../users/model";
import { zSignSchema } from "./schema";
import bcrypt from "bcryptjs";
import { authUsersKv } from "./kv";

const oneDay_ms = 24 * 60 * 60 * 1000;
const refreshTokenCookie = "refresh-token";
const refreshTokenOptions: CookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "strict",
  secure: true,
  signed: true,
  maxAge: 7 * oneDay_ms,
} as const;

class Controller extends JWT {
  usersModel = usersModel;
  signup = async (req: Request, res: Response) => {
    const { email, password } = zSignSchema.parse(req.body);
    try {
      const user = await this.usersModel.unsafeGetByEmail(email);

      if (user) {
        throw "This email is associated with an existing account. Please login instead.";
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = this.usersModel.create({
        email,
        password: passwordHash,
      });
      console.log("newUser", newUser);

      res.status(201).json(newUser);
      return;
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  };
  signin = async (req: Request, res: Response) => {
    const { email, password } = zSignSchema.parse(req.body);

    try {
      const user = await this.usersModel.unsafeGetByEmail(email);
      if (!user) throw "Invalid email or password 1";

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw "Invalid email or password 2";

      const accessToken = JWT.createAccessToken(user.id);
      const refreshToken = JWT.createRefreshToken(user.id);

      // Store refresh token in redis to track active sessions
      authUsersKv.set(user.id, user);

      res.cookie(refreshTokenCookie, refreshToken, refreshTokenOptions);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  };
  refresh = async (req: Request, res: Response) => {
    const refreshToken: string | undefined =
      req.signedCookies[refreshTokenCookie];
    if (!refreshToken) throw "Missing refreshToken";
    try {
      const userId = JWT.verifyRefreshToken(refreshToken);
      if (!userId || !Number.isSafeInteger(+userId))
        throw "Invalid refresh token";

      const validSession = await authUsersKv.get(+userId);
      if (!validSession) throw "Invalid refresh token";

      const accessToken = JWT.createAccessToken(parseInt(userId));
      const nextRefreshToken = JWT.createRefreshToken(parseInt(userId));

      res.cookie(refreshTokenCookie, nextRefreshToken, refreshTokenOptions);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  };
  whoami = async (req: ProtectedRequest, res: Response) => {
    res.json({
      ...req.user,
      password: undefined, // make sure password never expose
    });
  };
  logout = async (req: ProtectedRequest, res: Response) => {
    try {
      authUsersKv.delete(req.user.id);
      res.cookie(refreshTokenCookie, "", {
        ...refreshTokenOptions,
        maxAge: -1000,
      });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json(jsonError(error));
    }
  };
  logoutAll = async (req: ProtectedRequest, res: Response) => {
    res.status(501).json(jsonError("NotImplemented"));
  };
  logoutOthers = async (req: ProtectedRequest, res: Response) => {
    res.status(501).json(jsonError("NotImplemented"));
  };
}

export const controller = new Controller();
