import { Card } from "@/components";
import { Logout, Signin, Whoami } from "@/organisms";

export default async function AuthPage() {
  return (
    <div className="px-8">
      <div className="divider py-8">
        <h2 className="text-4xl font-bold">Auth Flows</h2>
      </div>
      <div className="mb-12 grid gap-8 md:grid-cols-2 md:grid-rows-2">
        <Card title="Who am I?">
          <div className="flex-1 text-3xl">
            <Whoami />
          </div>
          <Logout />
        </Card>
        <Signin />
      </div>
    </div>
  );
}
