import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/server";

const fontHeading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkreator",
  description: "Advanced LinkedIn Content Operating System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userData = user ? {
    name: user.email?.split('@')[0] || "User",
    email: user.email,
  } : undefined;

  return (
    <html lang="en">
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} antialiased font-body bg-background text-foreground`}
      >
        <TooltipProvider>
          <AppShell user={userData}>
            {children}
          </AppShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
