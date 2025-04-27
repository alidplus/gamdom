import { Card } from "@/components";

export default function AnotherPage() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <Card title="Another Page" className="bg-amber-800" />
    </div>
  );
}
