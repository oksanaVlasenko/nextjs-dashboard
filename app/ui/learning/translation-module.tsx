'use client'

import { AdvancedWord, TranslationOption } from "@/app/lib/definitions";
import FlipCard from "@/app/ui/learning/flip-card";
import { useEffect, useState } from "react";
import { LearningProgress } from "@prisma/client";
import { updateWordsProgress } from "@/app/lib/words/actions";
import Section from "@/app/ui/components/section-component";
import SliderArrows from "@/app/ui/learning/slider-arrows";
import { OrangeButton } from "@/app/ui/components/button";
import { useTranslationCache } from "@/app/lib/words/useTranslationCache";
import clsx from "clsx";
import { ButtonBlockSkeleton } from "@/app/ui/skeletons";
import ControllButtons from "@/app/ui/learning/controll-buttons";

export default function TranslationModule({ words }: { 
  words: AdvancedWord[], 
}) {
  const [activeWord, setActiveWord] = useState<AdvancedWord>(words[0])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [translationOptions, setTranslationOptions] = useState<TranslationOption[]>([])
  const [selectedId, setSelectedId ] = useState<string>('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { getTranslation } = useTranslationCache();
  
  const updateActiveWord = (type: 'next' | 'previous') => {
    setIsCorrect(null)
    setSelectedId('')

    if (type === 'next') {
      const isLastWord = words.length - 1 === currentIndex
      const index = !isLastWord ? currentIndex + 1 : 0
      
      setCurrentIndex(index)
      setActiveWord(words[index])
      findTranslation(words[index])
    } else {
      const isFirstWord = currentIndex === 0 
      const index = isFirstWord ? words.length - 1 : currentIndex - 1
      
      setCurrentIndex(index)
      setActiveWord(words[index])
      findTranslation(words[index])
    }
  }

  const updateProgress = () => {
    updateWordsProgress(activeWord.id, { 
      progress: activeWord.progress + 3,
      learningProgress: 'IN_PROGRESS' as LearningProgress
    })
  }  

  const findTranslation = async (word: AdvancedWord) => {
    setIsLoading(true)
    const options = await getTranslation({id: word.id, translation: word.translation});
    
    setTranslationOptions(options || [])

    setIsLoading(false)
  }

  const checkTranslation = (word: TranslationOption) => {
    setSelectedId(word.id)
    
    if (word.translation === activeWord.translation) {
      setIsCorrect(true)
      updateProgress()
      updateActiveWord('next')
    } else {
      setIsCorrect(false)

    }
  }

  useEffect(() => {
    const initial = async () => {
      await findTranslation(words[0])

      setIsLoading(false)
    }
    
    initial()
  }, [])

  return (
    <Section>
      <FlipCard 
        word={activeWord}
      >
        {
          isLoading ? 
            <ButtonBlockSkeleton /> 
            : (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center'>
                {
                  translationOptions.map((option) => (
                    <OrangeButton 
                      key={option.id}
                      className={clsx(
                        'px-2 py-3 text-sm',
                        {
                          'success-btn': selectedId === option.id && isCorrect,
                          'error-btn': selectedId === option.id && !isCorrect,
                          'hover:bg-orange-500 hover:text-white': !selectedId
                        }
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        checkTranslation(option)
                      }}
                      
                    >
                      {option.translation}
                    </OrangeButton>

                  ))
                }
              </div>
            )
        }
      </FlipCard>

      <SliderArrows onUpdate={(value: 'next' | 'previous') => updateActiveWord(value)} />
    </Section>
  )
}
