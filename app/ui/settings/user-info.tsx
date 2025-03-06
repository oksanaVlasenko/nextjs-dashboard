'use client';

import clsx from "clsx";
import ProfileRow from "@/app/ui/settings/profile-row";
import { useLanguages } from "@/app/lib/words/useLanguages";
import { DropdownSkeleton } from "@/app/ui/skeletons";
import Dropdown from "@/app/ui/components/dropdown";
import { Button } from "@/app/ui/components/button";
import { useActionState, useState } from "react";
import { Level, User } from "@prisma/client";
import { updateUser, UserInfoState } from "@/app/lib/user/actions";

const options = [
  { id: "A1", label: "A1 – Elementary" },
  { id: "A2", label: "A2 – Pre-Intermediate" },
  { id: "B1", label: "B1 – Intermediate" },
  { id: "B2", label: "B2 – Upper-Intermediate" },
  { id: "C1", label: "C1 – Advanced" },
  { id: "C2", label: "C2 – Proficient" },
];

export default function UserInfo({ className, userInfo, updateSession }: { 
  className: string, 
  userInfo: Partial<User> 
  updateSession: () => void 
}) {
  const { langList, isLoading } = useLanguages()
  const [localUser, setLocalUser] = useState<Partial<User>>({
    languageFrom: userInfo.languageFrom,
    languageTo: userInfo.languageTo,
    level: userInfo.level
  })

  const handleFormDataChange = (newData: Partial<typeof localUser>) => {
    setLocalUser({ ...localUser, ...newData });
  };

  const userId = userInfo.id ?? ''

  const initialState: UserInfoState = { message: '', errors: {}, user: null };

  const updateUserWithId = async (state: UserInfoState, formData: FormData): Promise<UserInfoState> => {
    const updatedUser = await updateUser(userId, state, formData);

    if (updatedUser.message === 'Success') {
      await updateSession()
    }
    return updatedUser
  };

  const [state, formAction, isPending] = useActionState(updateUserWithId, initialState);

  return (
    <form action={formAction} className={clsx(className)} aria-describedby="message-error">
      <div>
        <ProfileRow label="Name" labelFor="name">
          <input 
            id='name'
            defaultValue={userInfo.name || ''}
            type="text"
            name="name" 
            className="w-auto md:w-full md:max-w-xs custom-input"
            aria-describedby="name-error"
          />       
        </ProfileRow>

        {
          state.errors?.name && (
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          )
        }
        
        <ProfileRow label="Email" labelFor="email"> 
          <input 
            defaultValue={userInfo.email}
            id='email'
            name='email'
            type="text" 
            disabled
            title="Only for watching"
            className="w-auto md:w-full md:max-w-xs custom-input text-neutral-600"
          />
        </ProfileRow>

        <ProfileRow label="From" labelFor="languageFrom">
          {
            isLoading ? (
              <DropdownSkeleton />
            ) : (
              <Dropdown 
                id='languageFrom'
                selected={localUser.languageFrom || ''}
                className="w-auto md:w-full md:max-w-xs"
                options={langList || []}
                disabledOption='ukr'
                placeholder="Select from language"
                onSelect={(id) => handleFormDataChange({ languageFrom: id })}
              />
            )
          }
        </ProfileRow>

        <ProfileRow label="To" labelFor="languageTo">
          {
            isLoading ? (
              <DropdownSkeleton />
            ) : (
              <Dropdown 
                id="languageTo"
                selected={localUser.languageTo || ''}
                className="w-auto md:w-full md:max-w-xs"
                options={langList || []}
                disabledOption='eng'
                placeholder="Select to language"
                onSelect={(id) => handleFormDataChange({ languageTo: id })}
              />
            )
          }
        </ProfileRow>

        <ProfileRow label="Level" labelFor="level">
          <Dropdown 
            id='level'
            selected={localUser.level || 'B1'}
            className="w-auto md:w-full md:max-w-xs"
            options={options || []}
            placeholder="Your preferable level"
            onSelect={(id) => handleFormDataChange({ level: id as Level })}
          />
        </ProfileRow>

        <div className="w-full">
          <Button 
            type="submit" 
            aria-disabled={isPending}
            className={clsx(
              {
                'pending-animation-white': isPending,
              }
            )}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}