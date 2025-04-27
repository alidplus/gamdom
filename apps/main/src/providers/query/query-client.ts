import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let qc: QueryClient | undefined;

export function getQueryClient() {
  if (qc) return qc;
  qc = makeQueryClient();
  return qc;
}
