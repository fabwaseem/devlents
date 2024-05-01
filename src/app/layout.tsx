import Providers from "@/components/Providers";

import ReduxProvider from "@/components/redux-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getServerAuthSession } from "@/server/auth";
import "@/styles/globals.css";
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

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta_sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Devlents",
  description: "The ultimate developers community",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jakarta_sans.variable} ${playfair.variable} ${montserrat.variable} relative overflow-x-hidden  bg-white font-sans text-base antialiased dark:bg-dark-300`}
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
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}
