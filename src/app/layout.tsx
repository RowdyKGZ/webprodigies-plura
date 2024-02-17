import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as SonnerToater } from "sonner";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import ModalProvider from "./providers/modal-provider";
import { ThemeProvider } from "./providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plura",
  description: "All in one Agency solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
            <SonnerToater position="bottom-left" />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
