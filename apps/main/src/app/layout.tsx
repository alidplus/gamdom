import { Navbar } from "@/components";
import type { Metadata } from "next";
import "../globals.css";
import { QueryProvider } from "@/providers";
import { Toaster } from "sonner";

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
    <QueryProvider>
      <html lang="en">
        <body className={`antialiased`}>
          <Navbar />
          <div className="container mx-auto my-3">{children}</div>
          <Toaster />
        </body>
      </html>
    </QueryProvider>
  );
}
