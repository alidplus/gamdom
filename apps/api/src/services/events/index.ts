import type { Express } from "express";
import { router } from "./router";

export default function setupEventService(app: Express) {
  app.use(`/events`, router);
}
