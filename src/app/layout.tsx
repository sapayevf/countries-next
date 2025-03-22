import type { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "Countries App",
  description: "Find information about different countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
