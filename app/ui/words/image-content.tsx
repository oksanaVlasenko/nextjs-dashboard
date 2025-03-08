import FailedMedia from "@/app/ui/words/failed-media";
import Image from 'next/image';

export default function ImageContent({ src }: { src: string }) {
  return (
    src ? (
      <div className="w-44 h-44 lg:w-auto lg:h-auto px-4 mb-8 lg:mb-0">
        <div className="w-full aspect-square overflow-hidden rounded-xl">
          <Image
            src={src}
            width={244}
            height={244}
            priority={true}
            className="w-full h-full object-cover"
            alt="Image"
          />
        </div>
      </div>
    ) : (
      <FailedMedia />
    )
  )
}