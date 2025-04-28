import { events } from "@repo/db";
import { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";

async function queryFn(context: QueryFunctionContext): Promise<events.TData> {
  return stdFetch(`/events/${context.meta?.id ?? "0"}`);
}
const queryOptions = (id: number): UseQueryOptions<events.TData> => ({
  queryKey: ["gameevent-by-id", id],
  queryFn,
  meta: { id },
});

export default queryOptions;
