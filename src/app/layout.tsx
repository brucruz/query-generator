import { SchemaProvider } from "@/hooks/useSchema";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SQL Query Generator",
  description: "Generate SQL queries with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SchemaProvider>{children}</SchemaProvider>
      </body>
    </html>
  );
}
