import Image from 'next/image';

import logoCat from '../../public/logo-cat.svg'

export default function AcmeLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <Image
        src={logoCat}
        priority
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        alt="Logo"
      />

      <p className="hidden sm:inline-block text-neutral-900 text-xl md:text-3xl font-semibold tracking-tight">LK</p>
    </div>
  );
}
