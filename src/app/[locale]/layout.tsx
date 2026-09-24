import type { Metadata } from 'next';
import type { ThemeName } from '@darcysm/bastet-ui';
import '@darcysm/bastet-ui/styles.css';
import '../globals.css';
import { ThemeShell } from '@/components/ThemeShell';

export const metadata: Metadata = {
  title: 'Darcysm Portfolio',
  description: 'Portfolio powered by Bastet UI — a themed React component library',
};

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { cookies } from 'next/headers';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get('bst-theme')?.value;
  const savedPerformance = cookieStore.get('bst-performance')?.value;

  return (
    <html lang={locale}>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NextIntlClientProvider messages={messages}>
          <ThemeShell 
            initialTheme={savedTheme as ThemeName}
            initialPerformanceMode={savedPerformance as 'auto' | 'always' | 'never'}
          >
            {children}
          </ThemeShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
