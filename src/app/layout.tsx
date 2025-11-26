import { prompt } from '@/components/fonts';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/i18n';
import { StoreProvider } from '@/providers/store';
import { ConfigProvider } from '@/utils/context';
import localFont from 'next/font/local';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${prompt.className} antialiased`}>
        <ConfigProvider>
          <StoreProvider>
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </StoreProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
