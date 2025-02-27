'use client'

import Image from 'next/image';
import defaultAvatar from "@/public/default-avatar.jpg";
import clsx from "clsx";
import { WhiteButton } from "@/app/ui/button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function UserAvatar({ imageSrc, className }: { imageSrc: string, className: string }) {
  return (
    <div className={clsx(
      'flex flex-col h-full max-h-96 justify-between',
      className
    )}>
      <Image
        src={imageSrc.replace("s96-c", "s400-c") || defaultAvatar}
        width={244}
        height={244}
        priority={true}
        className="rounded-xl object-cover object-right"
        alt="User Avatar"
      />

      <div className="w-full max-w-[244px] mt-4">
        <WhiteButton>
          <ArrowUpTrayIcon className="w-5 h-5 text-neutral-900 group-hover:text-white sm:mx-4 peer-focus:text-gray-900" />

          Upload avatar
        </WhiteButton>
      </div>
    </div>
  )
}