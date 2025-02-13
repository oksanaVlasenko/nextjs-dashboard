'use client'

import Link from 'next/link';
import AcmeLogo from '@/app/ui/acme-logo';
import NavLinks from '@/app/ui/dashboard/nav-links';
import BottomNav from '@/app/ui/dashboard/bottom-nav';
import { useState } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="lg:hidden py-6 px-6 border-b">
        <div className="flex items-center justify-between">
          <Link
            className="text-2xl font-semibold"
            href="/"
          >
            <AcmeLogo />
          </Link>

          <button 
            className="flex items-center rounded focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="text-white bg-orange-500 hover:bg-orange-600 block h-8 w-8 p-2 rounded" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="relative z-50">
          <div 
            className="fixed lg:hidden inset-0 bg-gray-800 opacity-10"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-3/4 lg:w-80 sm:max-w-xs pt-6 pb-8 bg-white border-r overflow-y-auto">
            <div className="flex w-full items-center px-6 pb-6 mb-6 lg:border-b border-blue-50">
              <Link
                className="text-2xl font-semibold"
                href="/"
              >
                <AcmeLogo />
              </Link>
            </div>
            <div className="px-4 pb-6">
              <h3 className="mb-2 text-xs uppercase text-gray-200 font-medium">Main</h3>
              
              <NavLinks />
              
              <h3 className="mb-2 mt-8 text-xs uppercase text-gray-500 font-medium">Secondary</h3>
              
              <BottomNav />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}