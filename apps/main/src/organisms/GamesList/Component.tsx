"use client";
import { eventByIdQueryOptions, eventsQueryOptions } from "@/api";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { GameCard } from "..";

export default function Component() {
  const queryOpt = useMemo(() => eventsQueryOptions(), []);
  const eventsQuery = useQuery(queryOpt);

  useQueries({
    queries:
      eventsQuery.data?.map((rec) => {
        const qop = eventByIdQueryOptions(rec.id);
        return {
          ...qop,
          initialData: rec,
        };
      }) ?? [],
  });

  return (
    <>{eventsQuery.data?.map((ev) => <GameCard key={ev.id} id={ev.id} />)}</>
  );
}
