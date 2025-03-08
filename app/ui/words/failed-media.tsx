import Image from 'next/image';
import angryCat from '../../../public/angry-cat.svg'

export default function FailedMedia() {
  return (
    <div className="w-[244px] h-[244px] lg:w-auto px-4 mb-8 lg:mb-0">
      <div className="w-full h-full aspect-square overflow-hidden flex flex-col justify-center items-center border rounded-xl text-center">
        <Image
          src={angryCat}
          priority
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"
          alt="Sad Cat"
        />

        <p className='text-neutral-500 mt-4'>Failed to load</p>
      </div>
    </div>
  )
}