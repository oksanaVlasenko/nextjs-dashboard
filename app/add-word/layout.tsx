export const experimental_ppr = true;

import MobileNav from '@/app/ui/dashboard/mobile-nav';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MobileNav showSearch={false} />
      
      <SideNav />

      <div className="mx-auto lg:ml-72">
        {children}
      </div>
    </div>
  );
}