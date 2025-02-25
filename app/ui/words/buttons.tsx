'use client';

import { speakText } from '@/app/lib/utils';
import { PencilIcon, SpeakerWaveIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AdvancedWord } from "@/app/lib/definitions";
import { useState } from 'react';
import { deleteWordAction } from '@/app/lib/actions';

interface SpeakerButtonProps {
  word: string;
  language: string;
}

export function SpeakerButton({ word, language }: SpeakerButtonProps) {
  return (
    <SpeakerWaveIcon
      className="w-5 h-5 cursor-pointer text-neutral-900 sm:mx-4 peer-focus:text-gray-900"
      onClick={(e) => {
        e.stopPropagation()
        speakText(language, word)
      }}
    />
  );
}

export function SelectAllWords({ words }: { words: AdvancedWord[] }) {
  return (
    <div className="flex items-center pl-9 h-20 bg-white text-left">
      <input className="border border-gray-200 focus:outline-0 focus:ring-offset-0 focus:ring-0 !focus:shadow-none focus:ring-transparent focus:ring-opacity-0 w-6 h-6 mr-9 text-orange-500 rounded-md" type="checkbox"/>
      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Select all</span>
    </div>
  )
}

export function MoreInfo({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='relative'>
      <span className="inline-block cursor-pointer mb-4" onClick={() => setIsOpen(!isOpen)}>
        <svg width="13" height="3" viewBox="0 0 13 3" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.8" cx="1.5" cy="1.5" r="1.5" fill="#faaf7e"></circle><circle opacity="0.8" cx="6.5" cy="1.5" r="1.5" fill="#faaf7e"></circle><circle opacity="0.8" cx="11.5" cy="1.5" r="1.5" fill="#faaf7e"></circle></svg>
      </span>
    
      {
        isOpen && (
          <span className='absolute left-0 top-full -translate-x-1/2 flex flex-row'>
            <PencilIcon className="w-5 h-5 cursor-pointer text-neutral-900 sm:mx-3 peer-focus:text-gray-900" />

            <TrashIcon  
              className="w-5 h-5 cursor-pointer text-red-500 sm:mx-3 peer-focus:text-gray-900" 
              onClick={async () => {
                setIsOpen(false)
                await deleteWordAction(id)
              }}  
            /> 
          </span>
        )
      }
    </div>
  )
}

export function DeleteWord({ id }: { id: string }) {
  const deleteWordWithId = deleteWordAction.bind(null, id!);

  return (
    <form action={deleteWordWithId}>
      <button type="submit" className="rounded-md">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-red-500" />
      </button>
    </form>
  );
}