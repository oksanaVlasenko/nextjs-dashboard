'use client';

import { speakText } from '@/app/lib/utils';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { AdvancedWord } from "@/app/lib/definitions";

interface SpeakerButtonProps {
  word: string;
  language: string;
}

export function SpeakerButton({ word, language }: SpeakerButtonProps) {
  return (
    <SpeakerWaveIcon
      className="w-5 h-5 cursor-pointer text-neutral-900 sm:mx-4 peer-focus:text-gray-900"
      onClick={() => speakText(language, word)}
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
