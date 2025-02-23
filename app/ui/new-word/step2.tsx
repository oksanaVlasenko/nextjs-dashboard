import { Button, WhiteButton } from "@/app/ui/button";

import StepNumber from "@/app/ui/new-word/step-number";
import StepHeader from "@/app/ui/new-word/step-header";
import Badge from './badge';
import { WordData } from "@/app/lib/definitions";

const options = [
  { id: "A1", label: "A1 – Elementary" },
  { id: "A2", label: "A2 – Pre-Intermediate" },
  { id: "B1", label: "B1 – Intermediate" },
  { id: "B2", label: "B2 – Upper-Intermediate" },
  { id: "C1", label: "C1 – Advanced" },
  { id: "C2", label: "C2 – Proficient" },
];

export default function Step2({ data, activeStep, doneSteps, onChange, onNextStep, onPreviousStep }: { 
  data: WordData, 
  activeStep: number,
  doneSteps: number[],
  onNextStep: () => void,
  onPreviousStep: () => void,
  onChange: (newData: Partial<WordData>) => void 
}) {

  return (
    <div className="flex flex-wrap -m-2">
      <StepNumber 
        number={2}
        isActive={activeStep === 2}
        isDone={doneSteps.includes(2)}
      />

      <div className="flex-1 p-2">
        <StepHeader 
          header="What level of explanation do you prefer?"
          text="You could set these in general setting for future"
        />

        {
          activeStep === 2 && (
            <>
              <div className="flex flex-row flex-wrap gap-2 pb-8">
                {options.map((option) => (
                  <Badge 
                    key={option.id}
                    option={option}
                    selected={data.level}
                    onSelect={(id) => onChange({ level: id })}
                  />
                ))}
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