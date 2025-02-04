'use client'

import { useSession } from "next-auth/react";
import { lusitana } from "../fonts";

export default function UserCard() {
   const { data: session, status } = useSession();

   console.log(session?.user)
    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>Please sign in</p>;

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {session.user?.name}
      </p>

      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {session.user?.email}
      </p>  
    </div>
  )
}