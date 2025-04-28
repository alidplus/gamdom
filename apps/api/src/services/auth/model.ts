import env from "@/env";
import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: string;
}

export abstract class JWT {
  static createAccessToken(userId: number) {
    const accessToken = jwt.sign({ sub: userId }, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
    });

    return accessToken;
  }

  static createRefreshToken(userId: number) {
    const refreshToken = jwt.sign({ sub: userId }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return refreshToken;
  }

  static verifyAccessToken(accessToken: string) {
    try {
      const decoded = jwt.verify(
        accessToken,
        env.ACCESS_TOKEN_SECRET,
      ) as TokenPayload;

      return decoded.sub;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  static verifyRefreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        env.REFRESH_TOKEN_SECRET,
      ) as TokenPayload;

      return decoded.sub;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
