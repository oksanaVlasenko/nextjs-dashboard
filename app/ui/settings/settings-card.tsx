'use client'

import { useSession } from "next-auth/react";

import UserAvatar from "@/app/ui/settings/user-avatar";
import UserInfo from "@/app/ui/settings/user-info";

export default function SettingsCard() {
  const { data: session, status, update } = useSession();

  if (!session) return <p>Please sign in</p>;

  return (
    <div className="p-12 bg-white border rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <UserAvatar 
        imageSrc={session?.user?.image || ''} 
        className="md:col-span-1 mx-auto "
      />

      <UserInfo 
        className="md:col-span-2 md:h-full" 
        userInfo={{
          languageFrom: session.user.languageFrom,
          languageTo: session.user.languageTo,
          name: session.user.name,
          email: session.user.email!,
          level: session.user.level,
          id: session.user.id
        }}
        updateSession={update}
      />
    </div>
  )
}