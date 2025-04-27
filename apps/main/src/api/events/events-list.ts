import { events } from "@repo/db";
import { UseQueryOptions } from "@tanstack/react-query";
import { getApiBase } from "../common";

async function queryFn(): Promise<events.TData[]> {
  const response = await fetch(getApiBase() + "/events");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
const queryOptions = (): UseQueryOptions<events.TData[]> => ({
  queryKey: ["gamesevents"],
  queryFn,
});

export default queryOptions;
