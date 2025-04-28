import express from "express";
import { controller } from "./controller";
import { protectedRoute } from "./middleware";

export const router = express.Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

router.get("/refresh", controller.refresh);
router.get("/whoami", ...protectedRoute(controller.whoami));

router.delete("/logout", ...protectedRoute(controller.logout));
router.delete("/logout-all", ...protectedRoute(controller.logoutAll));
router.delete("/logout-others", ...protectedRoute(controller.logoutOthers));
