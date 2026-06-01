import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonas David - Full-Stack Systems Builder",
  description:
    "Full-stack systems builder focused on operational tooling and AI-assisted automation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jonas David - Full-Stack Systems Builder",
    description:
      "Production internal systems, operational tooling, and AI-assisted automation projects.",
    type: "website",
    siteName: "Jonas David Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Jonas David - Full-Stack Systems Builder",
    description:
      "Full-stack systems builder focused on operational tooling and AI-assisted automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
