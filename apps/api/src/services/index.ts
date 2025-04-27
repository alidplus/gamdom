import type { Express } from "express";
import setupEventService from "./events";
import setupUserService from "./users";

export default function setupServices(app: Express) {
  setupEventService(app);
  setupUserService(app);
}
