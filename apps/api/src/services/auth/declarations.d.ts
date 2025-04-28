import { users } from "@repo/db";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: users.TData;
    }
  }

  interface ProtectedRequest extends Omit<Request, "user"> {
    user: users.TData;
  }
}
