'use client';

import { LightBulbIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Button } from '@/app/ui/components/button';
import { AdvancedWord } from '@/app/lib/definitions';
import { SpeakerButton } from '@/app/ui/words/buttons';

export default function FlipCard({ word, onDontKnow, onKnow }: {
  word: AdvancedWord, 
  onDontKnow: () => void, 
  onKnow: () => void
}) {
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showTip, setShowTip] = useState<boolean>(false)

  const tip = word.word[0] + "_".repeat(word.word.length - 1);

  const stringForLearning = word.explanation.toLowerCase().replace(word.word.toLowerCase(), `${"_".repeat(word.word.length)}`)

  return (
    <div 
      className="relative w-full h-[30rem] sm:w-[30rem] sm:h-[28rem] perspective mx-auto"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        <div className="absolute w-full h-full  bg-white border  rounded-xl flex flex-col justify-between p-4 backface-hidden">
          <div className='flex justify-between mb-4'>
            <div className='flex'>
              <LightBulbIcon 
                className="w-5 h-5 cursor-pointer text-neutral-900 peer-focus:text-gray-900" 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTip(!showTip)
                }}
              />

              {
                showTip && (
                  <p className='ml-4 text-sm text-neutral-900'>
                    { tip }
                  </p>
                )
              }
            </div>
            
            <SpeakerButton 
              word={stringForLearning}
              language={word.languageFrom}
            />            
          </div>

          <p className="text-neutral-500 leading-normal">	
            {stringForLearning}
          </p>

          <div className='flex justify-between my-4'>
            <Button 
              className='px-2 py-3 text-sm mr-4'
              onClick={(e) => {
                e.stopPropagation()
                onDontKnow()
              }}
            >
              Don&apos;t know
            </Button>
            
            <Button 
              className='px-2 py-3 text-sm'
              onClick={(e) => {
                e.stopPropagation()
                onKnow()
              }}
            >
              Know
            </Button>
          </div>
          
          <CardFooter />
        </div>

        <div className="absolute w-full h-full bg-white border rounded-xl flex flex-col justify-between p-4 backface-hidden rotate-y-180">
          <div className='flex justify-end mb-4'>            
            <SpeakerButton 
              word={word.word}
              language={word.languageFrom}
            />          
          </div>
          
          <div>
            <h3 className="font-heading mb-1 text-lg font-semibold text-center">
              {word.word}
            </h3>
            <p className="text-neutral-500 leading-normal text-center">	
              {word.translation}
            </p>
          </div>

          <CardFooter />
        </div>

      </div>
    </div>
  );
}

function CardFooter() {
  return (
    <div className='text-center text-xs'>
      Click to see the other side
    </div>
  )
}
