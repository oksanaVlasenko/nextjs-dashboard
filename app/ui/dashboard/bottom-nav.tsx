import Link from 'next/link';
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline';
import { logout } from '@/app/lib/actions';

export default function BottomNav() {
  return (
    <div className="mt-auto">
      <Link 
        href='#'
        className="flex items-center pl-3 py-3 pr-2 text-gray-500 hover:bg-orange-50 rounded"
      >
        <span className="inline-block mr-4">
          <Cog8ToothIcon className="text-gray-200 w-5 h-5" />
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