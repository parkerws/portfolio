import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: {
    default: 'Will Parker - Software Engineer',
    template: '%s | Will Parker',
  },
  description:
    'Software Engineer, Security Practitioner, and Data Analyst. Specializing in full-stack development, cybersecurity, and machine learning.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'cybersecurity',
    'data analyst',
    'machine learning',
    'web development',
  ],
  authors: [{ name: 'Will Parker' }],
  creator: 'Will Parker',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://willparker.dev',
    siteName: 'Will Parker Portfolio',
    title: 'Will Parker - Software Engineer',
    description:
      'Software Engineer, Security Practitioner, and Data Analyst',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will Parker - Software Engineer',
    description:
      'Software Engineer, Security Practitioner, and Data Analyst',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
