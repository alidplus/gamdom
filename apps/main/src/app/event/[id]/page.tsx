import { eventByIdQueryOptions } from "@/api";
import { GameCard } from "@/organisms";
import { HydrateClient, prefetch } from "@/providers/prefetch/server";
import { ServerPageParams } from "../../../../types";

export default async function RootPage(ctx: ServerPageParams<"id", number>) {
  const { id } = await ctx.params;
  await prefetch(eventByIdQueryOptions(id));

  return (
    <HydrateClient>
      <GameCard id={id} />
    </HydrateClient>
  );
}
