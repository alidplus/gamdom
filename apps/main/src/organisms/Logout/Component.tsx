"use client";

import { logoutMutationOptions, whoamiQueryOptions } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useMemo } from "react";
import { toast } from "sonner";

interface Props {
  onSubmit?(): void;
}

export default function Component({ onSubmit }: Props) {
  const queryClient = useQueryClient();

  const queryOpt = useMemo(() => whoamiQueryOptions(), []);
  const whoami = useQuery(queryOpt);
  const isLoggedIn = whoami.data && !whoami.isFetching && !whoami.isError;

  const { isPending, mutate } = useMutation(
    logoutMutationOptions({
      onSuccess() {
        toast.success("Goodbye!");
        queryClient.invalidateQueries({ queryKey: queryOpt.queryKey });
      },
    }),
  );

  const handlesubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate();
      onSubmit?.();
    },
    [onSubmit, mutate],
  );
  return (
    <form onSubmit={handlesubmit}>
      <button
        type="submit"
        className="btn btn-error btn-block"
        disabled={isPending || !isLoggedIn}
      >
        Logout
      </button>
    </form>
  );
}
