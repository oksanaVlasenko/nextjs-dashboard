'use client'

import { AdvancedWord } from "@/app/lib/definitions";
import FlipCard from "@/app/ui/learning/flip-card";
import { useState } from "react";
import { LearningProgress } from "@prisma/client";
import { updateWordsProgress } from "@/app/lib/words/actions";
import Section from "@/app/ui/components/section-component";
import SliderArrows from "@/app/ui/learning/slider-arrows";
import ControllButtons from "@/app/ui/learning/controll-buttons";

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
      progress: activeWord.progress + 2,
      learningProgress: 'IN_PROGRESS' as LearningProgress
    })
  }  

  return (
    <Section>
      <FlipCard 
        word={activeWord}
      >
        <ControllButtons 
          onDontKnow={() => updateActiveWord('next')}
          onKnow={() => {
            updateProgress()
            updateActiveWord('next')
          }}
        />
      </FlipCard>

      <SliderArrows onUpdate={(value: 'next' | 'previous') => updateActiveWord(value)} />
    </Section>
  )
}
