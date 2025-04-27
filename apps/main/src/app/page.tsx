import { eventByIdQueryOptions, eventsQueryOptions } from "@/api";
import { GamesList } from "@/organisms";
import {
  HydrateClient,
  prefetch,
  queryClient,
} from "@/providers/prefetch/server";

export default async function RootPage() {
  const qop = eventsQueryOptions();
  await prefetch(qop);

  const { data = [] } =
    queryClient.getQueryState<Array<{ id: number }>>(qop.queryKey) ?? {};
  data.forEach((rec) => {
    const qk = eventByIdQueryOptions(rec.id).queryKey;
    queryClient.setQueryData(qk, rec);
  });

  return (
    <HydrateClient>
      <div className="divider py-8">
        <h2 className="text-4xl font-bold">Hot events</h2>
        <div className="badge badge-outline badge-error">+99</div>
      </div>
      <div className="mb-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <GamesList />
      </div>
      <div className="divider py-8">
        <h2 className="text-4xl font-bold">Recent events</h2>
        <div className="badge badge-outline badge-success">+99</div>
      </div>
      <div className="mb-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <GamesList />
      </div>
    </HydrateClient>
  );
}
