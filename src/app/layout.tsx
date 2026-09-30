import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { ToastContainer } from '@/components/ToastContainer';

export const metadata: Metadata = {
  title: 'ClassiLedger | Enterprise Customs Classification & Blockchain Decision Intelligence',
  description: 'Enterprise decision-support platform for customs brokers. Laya-powered tariff classification with tamper-evident blockchain testnet anchoring and defensible audit packs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#070B12] text-[#F5F7FA] antialiased selection:bg-blue-600 selection:text-white">
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
