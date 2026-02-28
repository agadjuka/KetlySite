import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ManagerNotificationProvider } from "@/context/ManagerNotificationContext";
import { LanguageIntro } from "@/components/ui/LanguageIntro";

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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <GlobalProvider>
          <LanguageProvider>
            <ManagerNotificationProvider>
              <LanguageIntro />
              {children}
            </ManagerNotificationProvider>
          </LanguageProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

