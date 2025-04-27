import { events } from "@repo/db";
import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { getApiBase } from "../common";

async function queryFn(context: QueryFunctionContext): Promise<events.TData> {
  const id = context.meta?.id;

  const response = await fetch(getApiBase() + "/events/" + id);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
const queryOptions = (id: number): UseQueryOptions<events.TData> => ({
  queryKey: ["gameevent-by-id", id],
  queryFn,
  meta: { id },
});

export default queryOptions;
