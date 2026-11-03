import type { Metadata } from 'next';
import './globals.css';
import { DemoProvider } from '@/components/shared/DemoContext';
import DemoBar from '@/components/shared/DemoBar';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'Grupo Unique — Unique Talentos & Vendara B2B',
  description: 'Plataforma integrada de Portal de Empregos (Unique Talentos) e Marketplace B2B (Vendara)',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <DemoProvider>
          <DemoBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
