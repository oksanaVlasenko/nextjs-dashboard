'use client'

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

import clsx from "clsx";

import { format } from "date-fns";

import { TranslationDataOfDayWord } from "@/app/lib/definitions";
import { createWordAction } from "@/app/lib/words/actions";

import { LearningProgress, Level } from "@prisma/client";

import { Button } from "@/app/ui/components/button"
import { SpeakerButton } from "@/app/ui/words/buttons"
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function WordOfTheDay({ data, existInUser }: { data: TranslationDataOfDayWord, existInUser: boolean }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const setIsWordExist = (value?: boolean): boolean => {
    if (value === undefined) {
      return existInUser
    }

    return value
  }

  const isWordExist = setIsWordExist()

  const formattedDate = format(new Date(), 'MMMM dd, yyyy')
  const session = useSession()

  const handleClick = async () => {
    setIsLoading(true)

    try {
      const wordData = {
        word: data.word,
        translation: data.translation,
        explanation: data.explanation,
        transcription: data.transcription,
        languageFrom: session?.data?.user.languageFrom ?? 'eng',
        languageTo: session?.data?.user.languageTo ?? 'ukr',
        level: session?.data?.user.level as Level ?? 'B2' as Level,
        learningProgress: 'NOT_STARTED' as LearningProgress,
        example1: data.example1,
        example2: data.example2,
        progress: 0
      }
  
      await createWordAction(wordData)
  
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsWordExist(true)
    }    
  }

  return (
    // lg:max-w-[50%]
    <div className=" rounded-xl py-12 px-6 w-auto ">
      <div className="flex justify-between items-center mb-6" onClick={() => setIsOpen(!isOpen)}>
        <h2 
          className=" text-3xl font-heading font-medium "
        >
          <span>
            {formattedDate} Word of the Day is 
          </span>
          <span className="text-orange-500">
            &nbsp;{data?.word}
          </span> 
        </h2>

        <ChevronDownIcon 
          className={clsx(
            'transform rotate-0 w-6 h-6 text-neutral-300 flex-shrink-0',
            {
              'rotate-180 ': isOpen,
              'rotate-0 ': !isOpen
            }
          )}
        />
      </div>

      <div 
        ref={contentRef}
        className={clsx(
          'overflow-hidden transition-all duration-500 ease-in-out origin-top',
          {
            'opacity-100 scale-y-100': isOpen,
            'opacity-0 scale-y-95': !isOpen
          }
        )}
        style={{ maxHeight: isOpen ? `${contentRef?.current?.scrollHeight}px` : 0 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-row lg:flex-col flex-wrap items-end lg:items-start gap-6">
            <p>{data?.translation}</p>

            <div className="w-full flex items-center max-w-sm sm:flex-1">
              <p className="mr-4 lg:mr-0">
                {data?.transcription}
              </p>

              <SpeakerButton 
                word={data?.word || ''}
                language='eng'
              />
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap-4 pb-8">
            {data?.explanation}
          </div>
        </div>

        {
          !isWordExist && (
            <Button 
              className={clsx(
                {
                  'pending-animation-white': isLoading,
                }
              )}
              onClick={handleClick}
            >
              Add to your list of words
            </Button>
          )
        }
      </div>
      
      
    </div>
  )
}