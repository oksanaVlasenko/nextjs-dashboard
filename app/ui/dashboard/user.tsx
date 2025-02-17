'use client'

import { useSession } from "next-auth/react";
import Image from 'next/image';
import defaultAvatar from "@/public/default-avatar.jpg";
import clsx from "clsx";

export default function UserCard({className, mobile}: {className?: string, mobile?: boolean}) {
  const { data: session, status } = useSession();

   console.log(session?.user)
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please sign in</p>;

  if (mobile) {
    return (
      <div className="flex items-center">
        <div className="mr-2">
          <Image
            src={session?.user?.image?.replace("s96-c", "s400-c") || defaultAvatar}
            width={40}
            height={40}
            priority={true}
            className="w-8 h-8 rounded-full object-cover object-right"
            alt="User Avatar"
          />
        </div>

        <div className="mr-3">
          <p className="text-gray-500">
            {session?.user?.name || "Guest User"}
          </p>
        </div>
      </div>
    )
  }
  return (
    <div
      className={clsx(
        className,
      )}
    >
      <div className="flex items-center">
        <div className="mr-3">
          <p className="text-sm">
            {session?.user?.name || "Guest User"}
          </p>
          <p className="text-sm text-gray-500 truncate w-40">
            {session?.user?.email || "No email available"}
          </p>
        </div>
        <div className="mr-2">
          <Image
            src={session?.user?.image?.replace("s96-c", "s400-c") || defaultAvatar}
            width={40}
            height={40}
            priority={true}
            className="w-10 h-10 rounded-full object-cover object-right"
            alt="User Avatar"
          />
        </div>
        {/* <span>
          <svg className="text-gray-400" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.08335 0.666657C8.75002 0.333323 8.25002 0.333323 7.91669 0.666657L5.00002 3.58332L2.08335 0.666657C1.75002 0.333323 1.25002 0.333323 0.916687 0.666657C0.583354 0.99999 0.583354 1.49999 0.916687 1.83332L4.41669 5.33332C4.58335 5.49999 4.75002 5.58332 5.00002 5.58332C5.25002 5.58332 5.41669 5.49999 5.58335 5.33332L9.08335 1.83332C9.41669 1.49999 9.41669 0.99999 9.08335 0.666657Z" fill="currentColor"></path>
          </svg>
        </span> */}
      </div>
    </div>
  )
}
