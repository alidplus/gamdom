import { db } from "@/db";
import { events } from "@repo/db";
import { eq } from "drizzle-orm";

export class EventModel {
  db = db;
  table = events.table;
  //create an event
  async create(data: events.TInsert): Promise<events.TData> {
    return this.db.transaction(async (tx) => {
      try {
        return tx
          .insert(this.table)
          .values(data)
          .returning()
          .then((res) => res[0]);
      } catch (e: unknown) {
        tx.rollback();
        throw e;
      }
    });
  }

  //get all events
  async list(): Promise<events.TData[]> {
    return this.db.select().from(this.table);
  }

  //get a single event
  async get(id: number): Promise<events.TData> {
    return this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1)
      .then((res) => res[0]);
  }

  //update an event
  async update(id: number, data: events.TUpdate): Promise<events.TData> {
    return this.db.transaction(async (tx) => {
      try {
        return this.db
          .update(this.table)
          .set(data)
          .where(eq(this.table.id, id))
          .returning()
          .then((res) => res[0]);
      } catch (e: unknown) {
        tx.rollback();
        throw e;
      }
    });
  }

  //delete an event by using the find by id and delete
  async delete(id: number) {
    return this.db.transaction(async (tx) => {
      try {
        return this.db
          .delete(this.table)
          .where(eq(this.table.id, id))
          .returning()
          .then((res) => res[0]);
      } catch (e: unknown) {
        tx.rollback();
        throw e;
      }
    });
  }
}

//export the class
export const eventsModel = new EventModel();
