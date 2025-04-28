import type { Express } from "express";
import setupEventService from "./events";
import setupUserService from "./users";
import setupAuthService from "./auth";

export default function setupServices(app: Express) {
  setupAuthService(app);
  setupEventService(app);
  setupUserService(app);
}
