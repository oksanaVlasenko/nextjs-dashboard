'use client'

import { AdvancedWord } from "@/app/lib/definitions";
import FlipCard from "@/app/ui/learning/flip-card";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LearningProgress } from "@prisma/client";
import { updateWordsProgress } from "@/app/lib/words/actions";
import Section from "@/app/ui/components/section-component";

export default function FlippingModule({ words }: { 
  words: AdvancedWord[], 
}) {
  const [activeWord, setActiveWord] = useState<AdvancedWord>(words[0])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const updateActiveWord = (type: 'next' | 'previous') => {
    if (type === 'next') {
      const isLastWord = words.length - 1 === currentIndex
      setCurrentIndex(!isLastWord ? currentIndex + 1 : 0)
      setActiveWord(!isLastWord ? words[currentIndex + 1] : words[0])
    } else {
      const isFirstWord = currentIndex === 0 
      setCurrentIndex(isFirstWord ? words.length - 1 : currentIndex - 1)
      setActiveWord(isFirstWord ? words[words.length - 1] : words[currentIndex - 1])
    }
  }

  const updateProgress = () => {
    updateWordsProgress(activeWord.id, { 
      progress: activeWord.progress + 3,
      learningProgress: 'IN_PROGRESS' as LearningProgress
    })
  }  

  return (
    <Section>
      <FlipCard 
        word={activeWord}
        onDontKnow={() => updateActiveWord('next')}
        onKnow={() => {
          updateProgress()
          updateActiveWord('next')
        }}
      />

      <div className="flex justify-center pt-7">
        <div 
          className="flex h-10 w-10 items-center mr-4 justify-center rounded-md border cursor-pointer"
          onClick={() => updateActiveWord('previous')}
        >
          <ArrowLeftIcon className="w-4" />
        </div>

        <div 
          className="flex h-10 w-10 items-center justify-center rounded-md border cursor-pointer"
          onClick={() => updateActiveWord('next')}
        >
          <ArrowRightIcon className="w-4" />
        </div>
      </div>
    </Section>
  )
}