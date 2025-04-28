import { events } from "@repo/db";
import { UseQueryOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";

async function queryFn(): Promise<events.TData[]> {
  return stdFetch(`/events`);
}
const queryOptions = (): UseQueryOptions<events.TData[]> => ({
  queryKey: ["gamesevents"],
  queryFn,
});

export default queryOptions;
