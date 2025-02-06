'use client'

import { useSession } from "next-auth/react";
import { lusitana } from "../fonts";
import Image from 'next/image';
import defaultAvatar from "@/public/default-avatar.jpg";

export default function UserCard() {
  const { data: session, status } = useSession();

   console.log(session?.user)
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please sign in</p>;

  return (
    <div className="h-auto w-full grow-0 rounded-md bg-gray-50 p-4">
      <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full shadow-md">
        <Image
          src={session?.user?.image?.replace("s96-c", "s400-c") || defaultAvatar}
          width={128}
          height={128}
          priority={true}
          className="object-cover"
          alt="User Avatar"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className={`${lusitana.className} mb-2 text-lg md:text-xl`}>{session?.user?.name || "Guest User"}</h2>
        <p className="mt-1 text-sm text-gray-500 sm:block">{session?.user?.email || "No email available"}</p>
      </div>
    </div>
  )
}