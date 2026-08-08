import type { Metadata } from 'next';
import '@darcysm/bastet-ui/styles';
import './globals.css';
import { ThemeShell } from '@/components/ThemeShell';

export const metadata: Metadata = {
  title: 'Darcysm Portfolio',
  description: 'Portfolio powered by Bastet UI — a themed React component library',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ThemeShell>{children}</ThemeShell>
      </body>
    </html>
  );
}
