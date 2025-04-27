import express from "express";
import { controller } from "./controller";

//initiating the router
export const router = express.Router();

//add event route
router.post("/", controller.addEvent);

//get events
router.get("/", controller.getEvents);

//get single event
router.get("/:id", controller.getAnEvent);

//update a event
router.put("/:id", controller.updateEvent);

//delete a event
router.delete("/:id", controller.deleteEvent);
