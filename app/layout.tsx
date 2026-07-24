import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "Viora - Your AI Travel Companion",
  description: "Plan smarter. Travel better. Anywhere, effortlessly.",
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/icon.png", type: "image/png" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} min-h-screen bg-background font-sans antialiased`}
      >
        <Provider>
          {children}
        </Provider>
        
      </body>
    </html>
  );
}
