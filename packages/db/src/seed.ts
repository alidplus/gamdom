import "dotenv/config"

import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { eventsTable, usersTable } from "./schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db,
    {
      eventsTable,
      usersTable
    }
  ).refine((f) => ({
    eventsTable: {
      count: 5,
      columns: {
        event_name: f.valuesFromArray({
          values: [
            "Team A vs. Team B",
            "Team A vs. Team C",
            "Team A vs. Team D",
            "Team A vs. Team E",
            "Team A vs. Team F",
            "Team B vs. Team A",
            "Team B vs. Team C",
            "Team B vs. Team D",
            "Team B vs. Team E",
            "Team B vs. Team F",
            "Team C vs. Team A",
            "Team C vs. Team B",
            "Team C vs. Team D",
            "Team C vs. Team E",
            "Team C vs. Team F",
            "Team D vs. Team A",
            "Team D vs. Team B",
            "Team D vs. Team C",
            "Team D vs. Team E",
            "Team D vs. Team F",
            "Team E vs. Team A",
            "Team E vs. Team B",
            "Team E vs. Team C",
            "Team E vs. Team D",
            "Team E vs. Team F",
            "Team F vs. Team A",
            "Team F vs. Team B",
            "Team F vs. Team C",
            "Team F vs. Team D",
            "Team F vs. Team E",
          ]
        }),
        odds: f.number({ minValue: 1, maxValue: 2 })
      }
    },
    usersTable: {
      count: 1,
      columns: {
        email: f.email(),
        password: f.string({
          isUnique: false,
          arraySize: 3
        })
      }
    }
  }));
}

main();