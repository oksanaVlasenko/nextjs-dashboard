'use client'

import Image from 'next/image';
import defaultAvatar from "@/public/default-avatar.jpg";
import clsx from "clsx";
import FileUploader from './file-uploader';
import { useState } from 'react';
import { Button, WhiteButton } from '../components/button';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import { uploadPhoto } from '@/app/lib/user/actions';

export default function UserAvatar({ className, userInfo, updateSession }: { 
  className: string,
  userInfo: Partial<User> 
  updateSession: () => void  
}) {
  const [newPhoto, setNewPhoto] = useState<string>(userInfo.image ? userInfo.image.replace("s96-c", "s400-c") : '')
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [file, setFile] = useState<File>()
  const [isPending, setIsPending] = useState<boolean>(false)

  const uploadNewAvatar = async (url: string, file: File) => {
    setNewPhoto(url)
    setIsUpload(true)
    setFile(file)

    //await uploadPhoto(file)
  }

  const cancelUpload = () => {
    setNewPhoto(userInfo.image ? userInfo.image.replace("s96-c", "s400-c") : '')
    setFile(undefined)
    setIsUpload(false)
  }

  const userId = userInfo.id ?? ''
  
  const updateAvatarWithId = async () => {
    if (!file) {
      return { message: "Missing file" };
    }

    setIsPending(true)

    const updatedUser = await uploadPhoto(userId, file);

    if (updatedUser.message === 'Success') {
      await updateSession()
    }
    
    setIsPending(false)

    console.log(updatedUser, ' usre')
  };

  return (
    <div className={clsx(
      'flex flex-col h-full max-h-96 justify-between',
      className
    )}>
      <div className='mx-auto md:mx-0'>
        <Image
          src={newPhoto || defaultAvatar}
          width={244}
          height={244}
          priority={true}
          className="rounded-xl object-cover object-right "
          alt="User Avatar"
        />
      </div>

      {
        isUpload ? (
          <div className="w-full flex flex-row gap-4 md:gap-2 md:flex-col mt-4">
            <Button 
              className='w-auto md:w-full md:max-w-[244px]'
              onClick={cancelUpload}
            >
              Cancel
            </Button>

            <WhiteButton 
              type="submit" 
              className={clsx(
                'w-auto md:w-full md:max-w-[244px]',
                {
                  'pending-animation': isPending,
                }
              )}
              aria-disabled={isPending}
              onClick={updateAvatarWithId}
            >
              <ArrowUpTrayIcon className="w-5 h-5 text-neutral-900 group-hover:text-white sm:mx-4 peer-focus:text-gray-900" />

              Save avatar
            </WhiteButton>            
          </div>
        ) : (
          <FileUploader 
            className='w-full max-w-[244px] mt-4'
            onUploadPhoto={uploadNewAvatar}
          />
        )
      }
    </div>
  )
}