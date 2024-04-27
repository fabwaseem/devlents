import { AOSInit } from "@/components/aos";
import ReduxProvider from "@/components/redux-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import {
  Inter,
  Plus_Jakarta_Sans,
  Playfair_Display,
  Montserrat,
} from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AOSInit />
      <body
        className={`${inter.variable} ${jakarta_sans.variable} ${playfair.variable} ${montserrat.variable} relative overflow-x-hidden  bg-white font-sans text-base antialiased dark:bg-dark-300`}
      >
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
