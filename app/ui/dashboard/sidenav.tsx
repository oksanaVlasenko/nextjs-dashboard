import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import BottomNav from '@/app/ui/dashboard/bottom-nav';

export default function SideNav() {
  return (
    <div className="hidden lg:block relative z-50 ">
      <div className="fixed lg:hidden inset-0 bg-gray-800 opacity-10"></div>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-72 sm:max-w-xs pt-6 pb-8 bg-white border-r overflow-y-auto">
        <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-blue-50">
          <Link
            className="text-2xl font-semibold"
            href="/"
          >
            <AcmeLogo />
          </Link>
        </div>
        <div className="px-4 flex flex-col h-full">
          <div className='flex-grow'>
            <h3 className="mb-2 text-xs uppercase text-gray-200 font-medium">Main</h3>
            
            <NavLinks />
          </div>
          
          <BottomNav />
        </div>
      </nav>
    </div>
  );
}
