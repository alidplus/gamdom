import { UseMutationOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";
import { IAccessTokenData, IAuthRequestBody } from "./types";

async function mutationFn(body: IAuthRequestBody): Promise<IAccessTokenData> {
  const response = await stdFetch<IAccessTokenData>("/auth/signin", {
    method: "POST",
    body,
  });
  return response;
}

const mutationOptions = (
  options?: Omit<
    UseMutationOptions<IAccessTokenData, unknown, IAuthRequestBody>,
    "mutationFn"
  >,
): UseMutationOptions<IAccessTokenData, unknown, IAuthRequestBody> => ({
  mutationFn,
  ...options,
});

export default mutationOptions;
