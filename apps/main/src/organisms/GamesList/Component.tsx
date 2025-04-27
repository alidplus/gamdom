"use client";
import { eventByIdQueryOptions, eventsQueryOptions } from "@/api";
import { QueryObserver, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { GameCard } from "..";

export default function Component() {
  const queryOpt = useMemo(() => eventsQueryOptions(), []);
  const queryClient = useQueryClient();
  const eventsQuery = useQuery(queryOpt);

  useEffect(() => {
    const observer = new QueryObserver(queryClient, queryOpt);
    return observer.subscribe((result) => {
      console.log("result");

      const records = result.data;
      records?.forEach((rec) => {
        const qk = eventByIdQueryOptions(rec.id).queryKey;
        queryClient.setQueryData(qk, rec);
      });
    });
  }, [queryClient, queryOpt]);

  return (
    <>{eventsQuery.data?.map((ev) => <GameCard key={ev.id} id={ev.id} />)}</>
  );
}
