import type { ReactNode } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import { AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Navbar />
    </div>
  );
}
