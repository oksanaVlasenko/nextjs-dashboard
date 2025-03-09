import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { Button, WhiteButton } from "@/app/ui/components/button";
import StepNumber from "@/app/ui/new-word/step-number";
import StepHeader from "@/app/ui/new-word/step-header";
import clsx from "clsx";

export default function Step5({ activeStep, doneSteps, isGenerate, onPreviousStep, onSave }: { 
  activeStep: number,
  isGenerate: boolean,
  doneSteps: number[],
  onPreviousStep: () => void,
  onSave: () => void
}) {

  return (
    <div className="flex flex-wrap -m-2">
      <StepNumber 
        number={5}
        isActive={activeStep === 5}
        isDone={doneSteps.includes(5)}
      />

      <div className="flex-1 p-2">
        <StepHeader 
          header="You’re all set!"
          text="Happy learning"
        />

        {
          activeStep === 5 && (
            <>  
              <div className="flex flex-wrap gap-2 p-1">
                <div className="w-full max-w-sm sm:max-w-48 ">
                  <WhiteButton onClick={onPreviousStep}>
                    Go Back
                  </WhiteButton>
                </div>

                <div className="w-full max-w-sm sm:max-w-48">
                  <Button 
                    className={clsx(
                      {
                        'pending-animation-white': isGenerate,
                      }
                    )}
                    onClick={onSave}
                  >
                    Go ahead
                    <RocketLaunchIcon className="'w-5 h-5 text-white sm:mx-4 peer-focus:text-gray-900'"/>
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