import { UseMutationOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";
import { IAuthJobSuccess } from "./types";

async function mutationFn(): Promise<IAuthJobSuccess> {
  const response = await stdFetch<IAuthJobSuccess>("/auth/logout", {
    method: "Delete",
  });
  return response;
}

const mutationOptions = (
  options?: Omit<UseMutationOptions<IAuthJobSuccess>, "mutationFn">,
): UseMutationOptions<IAuthJobSuccess> => ({
  mutationFn,
  ...options,
});

export default mutationOptions;
