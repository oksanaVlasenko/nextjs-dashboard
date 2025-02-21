'use client';

import { useState } from "react";

import Step1 from "@/app/ui/new-word/step1";
import Step2 from "@/app/ui/new-word/step2";
import Step3 from "@/app/ui/new-word/step3";
import Step4 from "@/app/ui/new-word/step4";

export type WordData = {
  fromLang: string;
  toLang: string;
  word: string;
  selected: string;
};

export default function AddWord() {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [formData, setFormData] = useState<WordData>({
    fromLang: 'eng',
    toLang: 'ukr',
    word: '',
    selected: 'B2–Upper-Intermediate'
  });

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const goToNextStep = () => {
    setDoneSteps([...doneSteps, activeStep])
    setActiveStep(activeStep + 1)
  }

  const goToPreviousStep = () => {
    setActiveStep(activeStep - 1)
    setDoneSteps(doneSteps.filter(i => i !== (activeStep - 1)))
  }

  const saveData = () => {
    goToNextStep() 

    console.log(formData, ' all data')
  }

  return (
    <section className="py-4 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="px-6 pt-5 pb-7 bg-white border rounded-xl">
          <Step1 
            data={formData}
            activeStep={activeStep}
            doneSteps={doneSteps}
            onNextStep={goToNextStep}
            onChange={handleFormDataChange}
          />

          <Step2 
            data={formData}
            activeStep={activeStep}
            doneSteps={doneSteps}
            onNextStep={goToNextStep}
            onPreviousStep={goToPreviousStep}
            onChange={handleFormDataChange}
          />

          <Step3 
            data={formData}
            activeStep={activeStep}
            doneSteps={doneSteps}
            onNextStep={goToNextStep}
            onPreviousStep={goToPreviousStep}
            onChange={handleFormDataChange}
          />
          
          <Step4 
            activeStep={activeStep}
            doneSteps={doneSteps}
            onPreviousStep={goToPreviousStep}
            onSave={saveData}
          />
        </div>
      </div>
    </section>
  )
}
