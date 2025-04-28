import { Request, Response } from "express";
import { events } from "@repo/db";
import { eventsModel } from "./model";
import { idSchema } from "@/utils/parsers";
import { jsonError } from "@/utils/errors";

class Controller {
  model = eventsModel;
  addEvent = async (req: ProtectedRequest, res: Response) => {
    try {
      const data = events.zInsertSchema.parse(req.body);
      const record = await this.model.create(data);
      if (!record) throw "unexpected_error";
      res.status(201).json(record);
    } catch (e: unknown) {
      res.status(500).json(jsonError(e));
    }
  };

  getEvents = async (req: Request, res: Response) => {
    try {
      const list = await this.model.list();
      res.json(list);
    } catch (e: unknown) {
      res.status(500).json(jsonError(e));
    }
  };

  getAnEvent = async (req: Request, res: Response) => {
    try {
      const id = idSchema.parse(req.params.id);
      const record = await this.model.get(id);
      if (!record) res.status(404).json(jsonError("not_found"));
      else res.json(record);
    } catch (e: unknown) {
      res.status(500).json(jsonError(e));
    }
  };

  updateEvent = async (req: ProtectedRequest, res: Response) => {
    try {
      const id = idSchema.parse(req.params.id);
      const before = await this.model.get(id);
      if (!before) res.status(404).json(jsonError("not_found"));
      else {
        const patch = events.zUpdateSchema.parse(req.body);
        const after = await this.model.update(id, patch);
        res.status(201).json(after);
      }
    } catch (e: unknown) {
      res.status(500).json(jsonError(e));
    }
  };

  deleteEvent = async (req: ProtectedRequest, res: Response) => {
    try {
      const id = idSchema.parse(req.params.id);
      const before = await this.model.get(id);
      if (!before) res.status(404).json(jsonError("not_found"));
      else {
        const after = await this.model.delete(id);
        res.status(201).json(after);
      }
    } catch (e: unknown) {
      res.status(500).json(jsonError(e));
    }
  };
}

export const controller = new Controller();
