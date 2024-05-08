import Providers from "@/components/Providers";

import ReduxProvider from "@/components/redux-provider";
import { ThemeProvider } from "@/components/theme-provider";
import ToastProvider from "@/components/toast-provider";
import { meta } from "@/lib/site-settings";
import { getServerAuthSession } from "@/server/auth";
import "@/styles/globals.css";
import { Metadata } from "next";
import {
  Inter,
  Plus_Jakarta_Sans,
  Playfair_Display,
  Montserrat,
} from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta_sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: "origin-when-cross-origin",
    keywords: meta.keywords,
    authors: [{ name: "Waseem Anjum", url: "https://waseemanjum.com/" }],
    creator: "Waseem Anjum",
    publisher: "Waseem Anjum",
    metadataBase: new URL(meta.url),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${jakarta_sans.variable} ${playfair.variable} ${montserrat.variable} relative overflow-x-hidden  bg-white font-sans text-base antialiased dark:bg-dark-300`}
      >
        <Providers session={session}>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader color="#6139ff" />
              {children}
              <ToastProvider />
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
