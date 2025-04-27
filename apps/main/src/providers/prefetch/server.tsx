import "server-only"; // <-- ensure this file cannot be imported from the client

import { dehydrate } from "@tanstack/query-core";
import {
  HydrationBoundary,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { getQueryClient } from "../query/query-client";

export const queryClient = getQueryClient();

export function HydrateClient(props: PropsWithChildren<{ debug?: true }>) {
  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      {props.debug ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
      {props.children}
    </HydrationBoundary>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UQOpt = UseQueryOptions<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UInfQOpt = UseInfiniteQueryOptions<any>;

function isInfiniteQueryOption(qop: UQOpt | UInfQOpt): qop is UInfQOpt {
  return (
    qop.queryKey.includes("infinite") ||
    "getPreviousPageParam" in qop.queryKey ||
    "getNextPageParam" in qop.queryKey
  );
}

export async function prefetch(qop: UQOpt | UInfQOpt) {
  if (isInfiniteQueryOption(qop)) {
    await queryClient.prefetchInfiniteQuery(qop);
  } else {
    await queryClient.prefetchQuery(qop);
  }
}
