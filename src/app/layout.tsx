import { AOSInit } from "@/components/aos";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AOSInit />
      <body
        className={`${inter.variable} ${jakarta_sans.variable} ${playfair.variable} dark:bg-dark-300 font-Inter  relative overflow-x-hidden bg-white text-base antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
