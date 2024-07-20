import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { title } from 'process';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
	template: '%s | Acme  Dashboard',
	default: 'Acme Dashboard',
	},
  description: 'Dashboard built with App Router',
  metadataBase: new URL('http://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
