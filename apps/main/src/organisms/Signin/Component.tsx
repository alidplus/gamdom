"use client";

import { signinMutationOptions, whoamiQueryOptions } from "@/api";
import { IAuthRequestBody } from "@/api/auth/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useMemo } from "react";
import { toast } from "sonner";

interface Props {
  onSubmit?(formData: IAuthRequestBody): void;
}

export default function Component({ onSubmit }: Props) {
  const queryClient = useQueryClient();

  const queryOpt = useMemo(() => whoamiQueryOptions(), []);
  const whoami = useQuery(queryOpt);
  const isLoggedIn = whoami.data && !whoami.isFetching && !whoami.isError;

  const { isPending, mutate } = useMutation(
    signinMutationOptions({
      onSuccess() {
        toast.success("Welcome to Gamdom!");
        queryClient.invalidateQueries({ queryKey: queryOpt.queryKey });
      },
    }),
  );

  const handlesubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const requestDara = Object.fromEntries(
        formData.entries(),
      ) as unknown as IAuthRequestBody;
      mutate(requestDara);
      onSubmit?.(requestDara);
    },
    [onSubmit, mutate],
  );

  return (
    <form onSubmit={handlesubmit} inert={isPending || isLoggedIn}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Email</legend>
        <input className="input w-full" required type="email" name="email" />
        <p className="label">Required</p>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Password</legend>
        <input
          className="input w-full"
          required
          type="password"
          name="password"
        />
        <p className="label">Required</p>
      </fieldset>
      <div className="flex w-full flex-row">
        <button
          type="submit"
          className="btn btn-primary ms-auto"
          disabled={isPending || isLoggedIn}
        >
          Signin
        </button>
      </div>
    </form>
  );
}
