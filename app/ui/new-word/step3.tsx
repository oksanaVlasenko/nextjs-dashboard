'use client'

import { Button, WhiteButton } from "@/app/ui/button";

import StepNumber from "@/app/ui/new-word/step-number";
import StepHeader from "@/app/ui/new-word/step-header";
import clsx from 'clsx';
import { useState } from 'react';
import { checkWord } from '@/app/lib/actions';
import { WordData } from "@/app/lib/definitions";

export default function Step3({ data, activeStep, isGenerate, doneSteps, onChange, onNextStep, onPreviousStep }: { 
  data: WordData, 
  activeStep: number,
  isGenerate: boolean,
  doneSteps: number[],
  onNextStep: () => void,
  onPreviousStep: () => void,
  onChange: (newData: Partial<WordData>) => void 
}) {
  const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isWordCorrect, setIsWordCorrect] = useState<boolean>(false)

  const checkWordIsRight = async () => {
    setIsCheckingWord(true)
    
    if (isWordCorrect) {
      setIsCheckingWord(false)
      onNextStep()
      
      return
    }

    const result = await checkWord(data.word, data.fromLang)

    console.log(result)
    setIsWordCorrect(result.correct)
    setSuggestions(result.suggestions)
    setIsCheckingWord(false)

    if (result.correct) {
      onNextStep()
      console.log('next 3 ')
    }
  }

  const selectSuggestions = (option: string) => {
    onChange({ word: option })
    setIsWordCorrect(true)
    setSuggestions([])
    
    onNextStep()
  }

  return (
    <div className="flex flex-wrap -m-2">
      <StepNumber 
        number={3}
        isActive={activeStep === 3}
        isDone={doneSteps.includes(3)}
      />

      <div className="flex-1 p-2">
        <StepHeader 
          header="Type a word or phrase to translate"
          text="Type a word or phrase to translate"
        />

        {
          activeStep === 3 && (
            <>
              <div className="flex flex-wrap flex-col max-w-xl pb-8 -m-1">
                <div className="w-full max-w-sm sm:flex-1 pb-2">
                  <input
                    value={data.word}
                    className={clsx(
                      'w-full px-8 py-3 outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                      {
                        'border-red-500': suggestions.length > 0,
                      }
                    )}
                    type="text"
                    name="text"
                    placeholder="Type your word here"
                    required
                    onChange={(e) => onChange({ word: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); 
                        checkWordIsRight();
                      }
                    }}
                  />
                </div>  

                {
                  suggestions.length > 0 && (
                    <>
                      <small className="text-red-500">Please, change the word or select one of suggestions</small>
                    
                      <div className="flex flex-row flex-wrap gap-2 pt-6">
                        {suggestions.map((option, ind) => (
                          <span
                            key={ind}
                            className={`bg-white border cursor-pointer text-neutral-900 text-sm font-medium px-5 py-2 ring-2 ring-orange-500 rounded-lg transition-all `}
                            onClick={() => selectSuggestions(option)}
                          >
                            {option}
                          </span>
                        ))}
                      </div> 
                    </>
                  )
                }                                         
              </div>
                
              <div className="flex flex-wrap gap-2 p-1 pb-11">
                <div className="w-full max-w-sm sm:max-w-48 mb-8 sm:mb-0">
                  <WhiteButton onClick={onPreviousStep}>
                    Go Back
                  </WhiteButton>
                </div>

                <div className="w-full max-w-sm sm:max-w-48">
                  <Button 
                    disabled={suggestions.length > 0}
                    className={clsx(
                      {
                        'pending-animation-white': isCheckingWord || isGenerate,
                        'pointer-events-none opacity-30': suggestions.length > 0
                      }
                    )}
                    onClick={checkWordIsRight} 
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}