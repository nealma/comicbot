import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/i18n/locale-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nealma.github.io"),
  title: {
    default: "码上同行 - Code Journey Together",
    template: "%s | 码上同行",
  },
  description: "一对父女的编程冒险之旅 - A father-daughter coding adventure",
  openGraph: {
    title: "码上同行 - Code Journey Together",
    description: "一对父女的编程冒险之旅",
    url: "https://nealma.github.io/comicbot",
    siteName: "码上同行",
    locale: "zh_CN",
    type: "website",
  },
  alternates: {
    types: {
      "application/rss+xml": "/comicbot/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LocaleProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
