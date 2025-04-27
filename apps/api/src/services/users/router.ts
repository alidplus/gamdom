import express from "express";
import { controller } from "./controller";

//initiating the router
export const router = express.Router();

//add user route
router.post("/", controller.addUser);

//get users
router.get("/", controller.getUsers);

//get single user
router.get("/:id", controller.getAnUser);

//update a user
router.put("/:id", controller.updateUser);

//delete a user
router.delete("/:id", controller.deleteUser);
