'use client';

import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';
import ColorCustomizer from '../ui/color-customizer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartSidebar />
      <ColorCustomizer />
    </div>
  );
}
