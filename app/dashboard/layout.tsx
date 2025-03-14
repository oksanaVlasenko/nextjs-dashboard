export const experimental_ppr = true;

import MobileNav from '@/app/ui/dashboard/mobile-nav';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MobileNav />
      
      <SideNav />

      <div className="mx-auto lg:ml-72 flex flex-col lg:min-h-screen">
        {children}
      </div>
    </div>
  );
}