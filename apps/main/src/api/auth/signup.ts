import { UseMutationOptions } from "@tanstack/react-query";
import { stdFetch } from "../common";
import { IAccessTokenData, IAuthRequestBody } from "./types";

async function mutationFn(body: IAuthRequestBody): Promise<IAccessTokenData> {
  console.log("sssssup", body);

  const response = await stdFetch<IAccessTokenData>("/auth/signup", {
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
