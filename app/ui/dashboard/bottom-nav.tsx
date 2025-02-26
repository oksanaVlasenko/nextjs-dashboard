'use client';

import Link from 'next/link';
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();
  
  return (
    <div className="mt-auto">
      <Link 
        href='/settings'
        className={clsx(
          'flex items-center pl-3 py-3 pr-2 text-gray-500 rounded',
          {
            'text-white bg-orange-500 hover:bg-orange-300 ': pathname === '/settings',
            'hover:bg-orange-50': pathname !== '/settings',
          },
        )} 
      >
        <span className="inline-block mr-4">
          <Cog8ToothIcon 
            className={clsx(
              'text-gray-200 w-5 h-5',
              {
                'text-white': pathname === '/settings'
              }
            )}
          />
        </span>

        <span>Settings</span>
      </Link>

      <form 
        className="flex items-center pl-3 py-3 pr-2 cursor-pointer text-gray-500 hover:bg-orange-50 rounded"
        action={logout}
      >
        <button className='flex items-center '>
          <span className="inline-block mr-4">
            <ArrowRightStartOnRectangleIcon className="text-gray-200 w-5 h-5" />
          </span>
          <span>Log Out</span>
        </button>
      </form>
    </div>
  )
}