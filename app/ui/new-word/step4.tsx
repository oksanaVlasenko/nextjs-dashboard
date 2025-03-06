import { Button, WhiteButton } from "@/app/ui/components/button";

import StepNumber from "@/app/ui/new-word/step-number";
import StepHeader from "@/app/ui/new-word/step-header";
import clsx from 'clsx';
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { TranslationData, WordData } from "@/app/lib/definitions";
import { speakText } from "@/app/lib/words/wordUtils";
import Input from "@/app/ui/components/input";
import Textarea from "@/app/ui/components/textarea";

export default function Step4({ data, translationData, activeStep, doneSteps, onTranslationChange, onNextStep, onPreviousStep }: { 
  data: WordData, 
  translationData: TranslationData,
  activeStep: number,
  doneSteps: number[],
  onNextStep: () => void,
  onPreviousStep: () => void,
  onTranslationChange: (newData: Partial<TranslationData>) => void 
}) {  

  return (
    <div className="flex flex-wrap -m-2">
      <StepNumber 
        number={4}
        isActive={activeStep === 4}
        isDone={doneSteps.includes(4)}
      />

      <div className="flex-1 p-2">
        <StepHeader 
          header="Double-check the translation and explanation to make sure they’re spot on!"
          text="Feel free to tweak the details before adding this word to your list."
        />

        {
          activeStep === 4 && (
            <>
              <div className="w-auto">
                <p className="font-heading mb-7 text-lg text-neutral-900 font-semibold">
                  {data.word}
                </p>
              </div>

              <div className="flex  flex-wrap items-end gap-4 pb-8">
                <Input 
                  isControlled={true}
                  containerClassname="w-full flex flex-col max-w-sm sm:flex-1 pb-2"
                  label="Translation"
                  value={translationData.translation}
                  className='w-full custom-input'
                  id="translation"
                  type="text"
                  name="text"
                  placeholder="Type your word here"
                  required
                  onChange={(e) => onTranslationChange({ translation: e.target.value })}
                />

                <div className="w-full flex items-center max-w-sm sm:flex-1 pb-6">
                  <p>{translationData.transcription}</p>

                  <SpeakerWaveIcon 
                    className="w-5 h-5 cursor-pointer text-neutral-900 sm:mx-4 peer-focus:text-gray-900"
                    onClick={() => speakText(data.fromLang, data.word)}
                  />
                </div>

                
              </div>

              <div className="flex flex-row flex-wrap items-center gap-4 pb-8">
                <Textarea 
                  isControlled={true}
                  containerClassname="w-full flex flex-col max-w-sm sm:max-w-xl sm:flex-1 pb-2"
                  label="Explanation"
                  value={translationData.explanation}
                  id="explanation"
                  className='w-full resize-none h-[150px] max-h-[150px] scrollbar custom-input'
                  placeholder="Type your word here"
                  onChange={(e) => onTranslationChange({ explanation: e.target.value })}
                />
              </div>

              <div className="flex flex-col flex-wrap gap-4 pb-8">
                <Textarea 
                  isControlled={true}
                  containerClassname="w-full flex flex-col max-w-sm sm:max-w-xl sm:flex-1 pb-2"
                  label="Example 1"
                  value={translationData.example1}
                  className={clsx(
                    'w-full px-8 py-3 resize-none h-[100px] max-h-[100px] scrollbar outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                    
                  )}
                  id="example1"
                  placeholder="Type your word here"
                  required
                  onChange={(e) => onTranslationChange({ example1: e.target.value })}
                />
                
                <Textarea 
                  isControlled={true}
                  containerClassname="w-full flex flex-col max-w-sm sm:max-w-xl sm:flex-1 pb-2"
                  label="Example 2"
                  value={translationData.example2}
                  className={clsx(
                    'w-full px-8 py-3 resize-none h-[100px] max-h-[100px] scrollbar outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                    
                  )}
                  id="example2"
                  placeholder="Type your word here"
                  required
                  onChange={(e) => onTranslationChange({ example2: e.target.value })}
                />
              </div>
                
              <div className="flex flex-wrap gap-2 p-1 pb-11">
                <div className="w-full max-w-sm sm:max-w-48 mb-8 sm:mb-0">
                  <WhiteButton onClick={onPreviousStep}>
                    Go Back
                  </WhiteButton>
                </div>

                <div className="w-full max-w-sm sm:max-w-48">
                  <Button onClick={onNextStep}>
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