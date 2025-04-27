import type { Express } from "express";
import { router } from "./router";

export default function setupUserService(app: Express) {
  app.use(`/users`, router);
}
