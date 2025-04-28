import express from "express";
import { controller } from "./controller";
import { protectedRoute } from "../auth";

//initiating the router
export const router = express.Router();

//add user route
router.post("/", ...protectedRoute(controller.addUser));

//get users
router.get("/", controller.getUsers);

//get single user
router.get("/:id", controller.getAnUser);

//update a user
router.put("/:id", ...protectedRoute(controller.updateUser));

//delete a user
router.delete("/:id", ...protectedRoute(controller.deleteUser));
