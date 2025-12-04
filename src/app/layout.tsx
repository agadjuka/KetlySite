import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { DemoProvider } from "@/context/DemoContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { WelcomeFlow } from "@/components/ui/WelcomeFlow";

export const metadata: Metadata = {
  title: "KETLY",
  description: "KETLY - Always ON. Always Responding.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased h-full">
        <GlobalProvider>
          <LanguageProvider>
            <DemoProvider>
              <WelcomeFlow />
              {children}
            </DemoProvider>
          </LanguageProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

