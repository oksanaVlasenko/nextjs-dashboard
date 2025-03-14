import Image from 'next/image';

import sadCat from '../../../public/sad-cat.svg'
import Link from 'next/link';

export default function EmptyTable() {

  return (
    <section className=" lg:flex lg:flex-1" >
      <div className="container px-4 mx-auto lg:flex-1 lg:flex w-full ">
        <div className="h-full min-h-[30rem] w-full bg-white rounded-3xl flex flex-col items-center justify-center">
          <Image
            src={sadCat}
            priority
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
            alt="Sad Cat"
          />

          <h2 className="py-8 text-2xl md:text-3xl font-heading font-medium">
            It&apos;s a bit empty here
          </h2>

          <div className="w-full max-w-sm sm:max-w-48 sm:w-auto ">
            <Link 
              href='/add-word'
              className="flex justify-center items-center text-center w-full px-4 py-3 font-semibold tracking-tight hover:text-white border border-neutral-900 bg-white hover:bg-neutral-900 focus:bg-neutral-900 rounded-lg  transition duration-200"
            >
              <span className="inline-block mr-1">
                <svg className="h-4 w-4 hover:text-white" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 1.33334H3.33333C2.19999 1.33334 1.33333 2.20001 1.33333 3.33334V12.6667C1.33333 13.8 2.19999 14.6667 3.33333 14.6667H12.6667C13.8 14.6667 14.6667 13.8 14.6667 12.6667V3.33334C14.6667 2.20001 13.8 1.33334 12.6667 1.33334ZM10.6667 8.66668H8.66666V10.6667C8.66666 11.0667 8.4 11.3333 8 11.3333C7.6 11.3333 7.33333 11.0667 7.33333 10.6667V8.66668H5.33333C4.93333 8.66668 4.66666 8.40001 4.66666 8.00001C4.66666 7.60001 4.93333 7.33334 5.33333 7.33334H7.33333V5.33334C7.33333 4.93334 7.6 4.66668 8 4.66668C8.4 4.66668 8.66666 4.93334 8.66666 5.33334V7.33334H10.6667C11.0667 7.33334 11.3333 7.60001 11.3333 8.00001C11.3333 8.40001 11.0667 8.66668 10.6667 8.66668Z" fill="currentColor"></path>
                </svg>
              </span>
              Add First Word
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  )
}