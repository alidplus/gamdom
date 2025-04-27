"use client";
import { PropsWithChildren } from "react";
import { getQueryClient } from "./query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Provider(props: Readonly<PropsWithChildren>) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
