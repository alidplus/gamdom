import { users } from "@repo/db";
import { UseSuspenseQueryOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";

async function queryFn(): Promise<users.TData> {
  return stdFetch("/auth/whoami");
}

const queryOptions = (): UseSuspenseQueryOptions<users.TData> => ({
  queryKey: ["auth-whoami"],
  queryFn,
  retry: false,
});

export default queryOptions;
