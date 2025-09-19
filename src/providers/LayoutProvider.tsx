'use client';

import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const LayoutProvider = ({ children }: Props) => {
  const pathname = usePathname();
  return (
    <>
      {pathname.includes('/schedule') ? (
        <>{children}</>
      ) : (
        <>
          <Menu />
          <main style={{ paddingTop: '75px' }}>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
};
