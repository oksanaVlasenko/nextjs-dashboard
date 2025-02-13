import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-custom">
      <AcmeLogo />

      <div className=" rounded-2xl pt-4 lg:pt-10 px-4 lg:px-10 pb-4 lg:pb-14">
        <div className="flex flex-wrap -m-4 mb-8">
          <div className="w-full  p-4 ">
            <div className="h-full border-2 bg-white border-neutral-50 border-opacity-50 rounded-3xl py-20 lg:py-32 pl-4 lg:pl-18 pr-4 lg:pr-16">
              <h1 className="font-heading mb-12 font-semibold text-6xl sm:text-7xl md:text-9xl xl:text-11xl max-w-7xl">
                <span className="relative z-10">Join the community, and change</span>
                <span className="bg-orange-50 rounded-lg px-4 inline-block">your future.</span>
              </h1>
              <h2 className="font-heading text-neutral-600 tracking-tight text-2xl font-semibold mb-24">Your journey to languages excellence starts here.</h2>
              <div className="flex flex-wrap items-center gap-8">
                <Link
                  href="/login"
                  className="inline-flex justify-center items-center text-center h-20 p-5 font-semibold tracking-tight text-2xl text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
                >
                  Join now
                </Link>
                <div className="group inline-flex justify-center items-center text-center tracking-tight gap-3">
                  <span className="text-neutral-600 tracking-tight font-semibold group-hover:text-neutral-800 transition duration-200">Learn more</span>
                  <div className="w-6 h-6 rounded-full border border-neutral-50 group-hover:border-neutral-200 transition duration-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M6 1L5.2825 1.6965L9.086 5.5H1V6.5H9.086L5.293 10.293L6 11L11 6L6 1Z" fill="#19191B"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full md:w-1/3 p-4">
            <div className="relative h-56 md:h-full bg-white rounded-3xl">
              
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
