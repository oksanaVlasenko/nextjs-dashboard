'use client'

import Link from 'next/link';
import AcmeLogo from '@/app/ui/acme-logo';
import NavLinks from '@/app/ui/dashboard/nav-links';
import BottomNav from '@/app/ui/dashboard/bottom-nav';
import { useState } from 'react';
import Search from '@/app/ui/search';
import UserCard from '@/app/ui/dashboard/user';
import { WhiteButton } from '@/app/ui/button';

export default function MobileNav({ showSearch = true }: {showSearch?: boolean }) {
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

          {
            showSearch && (
              <div className="flex items-center ">
                <Search placeholder="Type to search..." className='max-w-[15rem] sm:max-w-xs'/>
              </div>
            )
          }
          
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
              <h3 className="mb-2 text-xs uppercase text-gray-200 font-medium">Profile</h3>

              <UserCard mobile />

              <div className='flex-grow'>
                <div className="flex justify-end items-center space-x-6 mt-6">
                  <Link 
                    href='/dashboard/add-word'
                    className="flex justify-center items-center text-center w-full px-4 py-3 font-semibold tracking-tight hover:text-white border border-neutral-900 bg-white hover:bg-neutral-900 focus:bg-neutral-900 rounded-lg  transition duration-200"
                  >
                    <span className="inline-block mr-1">
                      <svg className="h-4 w-4 hover:text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 1.33334H3.33333C2.19999 1.33334 1.33333 2.20001 1.33333 3.33334V12.6667C1.33333 13.8 2.19999 14.6667 3.33333 14.6667H12.6667C13.8 14.6667 14.6667 13.8 14.6667 12.6667V3.33334C14.6667 2.20001 13.8 1.33334 12.6667 1.33334ZM10.6667 8.66668H8.66666V10.6667C8.66666 11.0667 8.4 11.3333 8 11.3333C7.6 11.3333 7.33333 11.0667 7.33333 10.6667V8.66668H5.33333C4.93333 8.66668 4.66666 8.40001 4.66666 8.00001C4.66666 7.60001 4.93333 7.33334 5.33333 7.33334H7.33333V5.33334C7.33333 4.93334 7.6 4.66668 8 4.66668C8.4 4.66668 8.66666 4.93334 8.66666 5.33334V7.33334H10.6667C11.0667 7.33334 11.3333 7.60001 11.3333 8.00001C11.3333 8.40001 11.0667 8.66668 10.6667 8.66668Z" fill="currentColor"></path>
                      </svg>
                    </span>
                    Add Word
                  </Link>
                </div> 

                <h3 className="mb-2 mt-8 text-xs uppercase text-gray-200 font-medium">Main</h3>
                
                <NavLinks />   
              </div>

              <BottomNav />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}