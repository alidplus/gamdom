"use client";
import { whoamiQueryOptions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function Component() {
  const { data } = useQuery(whoamiQueryOptions());

  return data?.email;
}
