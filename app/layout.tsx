import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxe Estate — Premium Real Estate",
  description: "Find your sanctuary with Luxe Estate. Exclusive luxury properties, apartments, and villas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background-light text-nordic-dark font-display antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

