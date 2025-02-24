'use client';

import {
  PencilIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Add word', href: '/dashboard/add-word', icon: PencilIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex items-center pl-3 py-3 pr-2 text-gray-500 rounded',
              {
                'text-white bg-orange-500 hover:bg-orange-300 ': pathname === link.href,
                'hover:bg-orange-50': pathname !== link.href,
              },
            )}          >
            <LinkIcon className="w-5 inline-block mr-3" />
            <p className="block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
