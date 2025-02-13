import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Users + Recipes",
  description: "Choose the user or recipe for learn more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
