import { db } from "@/db";
import { users } from "@repo/db";
import { eq, getTableColumns } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { password, ...externalColumns } = getTableColumns(users.table);

export class UserModel {
  db = db;
  table = users.table;
  //create an user
  async create(data: users.TInsert): Promise<users.TData> {
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

  //get all users
  async list(): Promise<users.TData[]> {
    return this.db.select(externalColumns).from(this.table);
  }

  //get a single user
  async get(id: number): Promise<users.TData> {
    return this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1)
      .then((res) => res[0]);
  }

  //update an user
  async update(id: number, data: users.TUpdate): Promise<users.TData> {
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

  //delete an user by using the find by id and delete
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
export const usersModel = new UserModel();
