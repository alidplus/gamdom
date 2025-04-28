import express from "express";
import { controller } from "./controller";
import { protectedRoute } from "../auth";

//initiating the router
export const router = express.Router();

//add event route
router.post("/", ...protectedRoute(controller.addEvent));

//get events
router.get("/", controller.getEvents);

//get single event
router.get("/:id", controller.getAnEvent);

//update a event
router.put("/:id", ...protectedRoute(controller.updateEvent));

//delete a event
router.delete("/:id", ...protectedRoute(controller.deleteEvent));
