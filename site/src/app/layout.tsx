import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getCurrentCompany } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const current = await getCurrentCompany();
  return {
    title: current ? `${current.name} Sales Plays` : "Sales Plays",
    description: current
      ? `Private sales enablement hub for ${current.name}.`
      : "Private sales enablement hub.",
    robots: { index: false, follow: false },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950">
        {children}
      </body>
    </html>
  );
}
