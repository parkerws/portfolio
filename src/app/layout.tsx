import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: {
    default: 'Will Parker - Cloud Architect & Azure Engineer',
    template: '%s | Will Parker',
  },
  description:
    'Senior Cloud Engineer and Architect specializing in Azure, landing zones, Terraform, and DevOps. Building secure, scalable cloud platforms for enterprise clients.',
  keywords: [
    'cloud architect',
    'azure engineer',
    'cloud engineer',
    'terraform',
    'kubernetes',
    'landing zones',
    'devops',
    'azure devops',
    'infrastructure as code',
    'cloud governance',
    'aws',
    'ci/cd',
  ],
  authors: [{ name: 'Will Parker' }],
  creator: 'Will Parker',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://willparker.dev',
    siteName: 'Will Parker Portfolio',
    title: 'Will Parker - Cloud Architect & Azure Engineer',
    description:
      'Senior Cloud Engineer specializing in Azure enterprise-scale landing zones, Terraform automation, and cloud governance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Will Parker - Cloud Architect',
    description:
      'Azure Cloud Architect | Landing Zones | Terraform | DevOps',
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
