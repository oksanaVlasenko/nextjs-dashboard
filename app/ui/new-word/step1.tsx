import clsx from "clsx";
import { useLanguages } from "@/app/lib/useLanguages";

import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

import { WordData } from '@/app/ui/dashboard/new-word'
import { DropdownSkeleton } from "@/app/ui/skeletons";
import { Button } from "@/app/ui/button";
import Dropdown from "@/app/ui/dropdown";
import StepNumber from "@/app/ui/new-word/step-number";
import StepHeader from "@/app/ui/new-word/step-header";

export default function Step1({ data, activeStep, doneSteps, onChange, onNextStep }: { 
  data: WordData, 
  activeStep: number,
  doneSteps: number[],
  onNextStep: () => void,
  onChange: (newData: Partial<WordData>) => void 
}) {
  const { langList, isLoading } = useLanguages()

  const switchLanguages = () => {
    if (!data.fromLang && !data.toLang) return

    onChange({ fromLang: data.toLang })
    onChange({ toLang: data.fromLang })
  }

  return (
    <div className="flex flex-wrap -m-2">
      <StepNumber 
        number={1}
        isActive={activeStep === 1}
        isDone={doneSteps.includes(1)}
      />

      <div className="flex-1 p-2">
        <StepHeader 
          header="To start, let&apos;s select languages from and to"
          text="You could set these in general setting for future"
        />

        {
          activeStep === 1 && (
            <>
              <div className="flex flex-wrap items-center max-w-xl pb-8 -m-1">              
                <div className="w-full sm:flex-1 p-1">
                  {
                    isLoading ? (
                      <DropdownSkeleton />
                    ) : (
                      <Dropdown 
                        selected={data.fromLang}
                        options={langList || []}
                        disabledOption={data.toLang}
                        placeholder="Select from language"
                        onSelect={(id) => onChange({ fromLang: id })}
                      />
                    )
                  }
                </div>

                <ArrowsRightLeftIcon 
                  className={clsx(
                    'w-5 h-5 text-gray-500 my-5 sm:mx-4 peer-focus:text-gray-900',
                    {
                      'cursor-pointer text-gray-900': data.fromLang && data.toLang
                    }
                  )}
                  onClick={switchLanguages}
                />

                <div className="w-full sm:flex-1 p-1">
                  {
                    isLoading ? (
                      <DropdownSkeleton />
                    ) : (
                      <Dropdown 
                        selected={data.toLang}
                        options={langList || []}
                        disabledOption={data.fromLang}
                        placeholder="Select to language"
                        onSelect={(id) => onChange({ toLang: id })}
                      />
                    )
                  }
                </div>
              </div>
                
              <div className="w-full max-w-sm sm:max-w-48 sm:w-auto p-1 pb-11">
                <Button onClick={onNextStep}>
                  Continue
                </Button>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}