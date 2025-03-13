'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";

import clsx from "clsx";

import { format } from "date-fns";

import { TranslationDataOfDayWord } from "@/app/lib/definitions";
import { createWordAction } from "@/app/lib/words/actions";

import { LearningProgress, Level } from "@prisma/client";

import { Button } from "@/app/ui/components/button"
import { SpeakerButton } from "@/app/ui/words/buttons"

export default function WordOfTheDay({ data, existInUser }: { data: TranslationDataOfDayWord, existInUser: boolean }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="border rounded-xl my-5 mx-6 py-5 px-6 w-auto ">
      <div className="flex justify-between" onClick={() => setIsOpen(!isOpen)}>
        <h2 
          className=" text-3xl font-heading font-medium mb-6"
          
        >
          <span>
            {formattedDate} Word of the Day is 
          </span>
          <span className="text-orange-500">
            &nbsp;{data?.word}
          </span> 
        </h2>

        <span 
          className={clsx(
            'transform rotate-0 ',
            {
              'rotate-180 mb-6': isOpen,
              'rotate-0 mt-3': !isOpen
            }
          )}
        >
          <svg className="relative -top-px text-neutral-300 group-hover:text-neutral-400" width="24" height="24" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6673 9.5L8.00065 14.1667L3.33398 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </div>
      

      <div className={clsx(
        'overflow-hidden transition-max-height duration-500 ease-in-out origin-top',
        {
          'max-h-screen scale-y-100': isOpen,
          'max-h-0 scale-y-0': !isOpen
        }
      )}>
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