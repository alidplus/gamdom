import { Navbar } from "@/components";
import { AuthGaurd } from "@/organisms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gamdom Betting Dashboard",
  description: "Made by Ali Ghorbani as test project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGaurd>
      <Navbar />
      <div className="container mx-auto my-3">{children}</div>
    </AuthGaurd>
  );
}
