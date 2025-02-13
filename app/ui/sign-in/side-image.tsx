import Image from 'next/image';

export default function SideImage() {
  return (
    <div className="w-full relative xl:w-1/2">
      <div className="bg-orange-500 rounded-3xl min-h-[550px] md:px-10 pt-6 md:pt-12 pb-8 md:pb-16 relative h-full">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br rounded-3xl from-orange-400 via-pink-500 to-purple-600 opacity-50"></div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs md:max-w-md">
          <div className="bg-white rounded-5xl px-4 rounded-3xl md:px-10 pt-6 md:pt-12 pb-8 md:pb-16">
            <p className="text-neutral-400 font-medium tracking-tight mb-10">Shape Tomorrow with Digital Learning Today!</p>
            
            <Image
              width={260}
              height={320}
              src='/happy-cat.png'
              priority={true}
              className="mx-auto"
              alt="Cat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}