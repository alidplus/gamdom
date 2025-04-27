import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { eventsTable, usersTable } from "./schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, {
    eventsTable,
    usersTable,
  }).refine((f) => ({
    eventsTable: {
      count: 5,
      columns: {
        eventName: f.valuesFromArray({
          values: [
            "Soccer: Team A vs. Team B",
            "Soccer: Team A vs. Team C",
            "Soccer: Team A vs. Team D",
            "Soccer: Team A vs. Team E",
            "Soccer: Team A vs. Team F",
            "Soccer: Team B vs. Team A",
            "Soccer: Team B vs. Team C",
            "Soccer: Team B vs. Team D",
            "Soccer: Team B vs. Team E",
            "Soccer: Team B vs. Team F",
            "Soccer: Team C vs. Team A",
            "Soccer: Team C vs. Team B",
            "Soccer: Team C vs. Team D",
            "Soccer: Team C vs. Team E",
            "Soccer: Team C vs. Team F",
            "Soccer: Team D vs. Team A",
            "Soccer: Team D vs. Team B",
            "Soccer: Team D vs. Team C",
            "Soccer: Team D vs. Team E",
            "Soccer: Team D vs. Team F",
            "Soccer: Team E vs. Team A",
            "Soccer: Team E vs. Team B",
            "Soccer: Team E vs. Team C",
            "Soccer: Team E vs. Team D",
            "Soccer: Team E vs. Team F",
            "Soccer: Team F vs. Team A",
            "Soccer: Team F vs. Team B",
            "Soccer: Team F vs. Team C",
            "Soccer: Team F vs. Team D",
            "Soccer: Team F vs. Team E",
          ],
        }),
        odds: f.number({ minValue: 1, maxValue: 2 }),
      },
    },
    usersTable: {
      count: 1,
      columns: {
        email: f.email(),
        password: f.string({
          isUnique: false,
          arraySize: 3,
        }),
      },
    },
  }));
}

main();
