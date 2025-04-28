/// <reference types="./declarations.d.ts" />

import type { Express } from "express";
import { router } from "./router";

export default function setupAuthService(app: Express) {
  app.use(`/auth`, router);
}

export { protectedRoute } from "./middleware";
