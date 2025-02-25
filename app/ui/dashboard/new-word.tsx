'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";

import Step1 from "@/app/ui/new-word/step1";
import Step2 from "@/app/ui/new-word/step2";
import Step3 from "@/app/ui/new-word/step3";
import Step4 from "@/app/ui/new-word/step4";
import Step5 from "@/app/ui/new-word/step5";

import { useLanguages } from "@/app/lib/useLanguages";
import { createWordAction, generateWordTranslation } from "@/app/lib/actions";
import { Examples, TranslationData, WordData } from "@/app/lib/definitions";
import { Level, LearningProgress } from "@prisma/client";

export default function AddWord() {
  const [activeStep, setActiveStep] = useState<number>(1)
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [isGenerate, setIsGenerate] = useState<boolean>(false)
  const [formData, setFormData] = useState<WordData>({
    fromLang: 'eng',
    toLang: 'ukr',
    word: '',
    level: 'B2'
  });

  const [translationData, setTranslationData] = useState<TranslationData>({
    translation: '',
    explanation: '',
    transcription: '',
    examples: {
      example1: '',
      example2: ''
    }
  })

  const { data: session } = useSession();
  const userId = session?.user?.id ?? '';

  const { langList } = useLanguages()

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const handleTranslationDataChange = (newData: Partial<typeof translationData>) => {
    setTranslationData({ ...translationData, ...newData });
  };

  const handleExampleChange = (exampleKey: keyof Examples, value: string) => {
    setTranslationData(prevState => ({
      ...prevState,
      examples: {
        ...prevState.examples,
        [exampleKey]: value, 
      }
    }));
  };

  const goToNextStep = () => {
    setDoneSteps([...doneSteps, activeStep])
    setActiveStep(activeStep + 1)
  }

  const goToPreviousStep = () => {
    setActiveStep(activeStep - 1)
    setDoneSteps(doneSteps.filter(i => i !== (activeStep - 1)))
  }

  const getTranslation = async () => {
    setIsGenerate(true)

    const updatedData = { 
      ...formData, 
      fromLang: langList?.find(l => l.id === formData.fromLang)?.label, 
      toLang: langList?.find(l => l.id === formData.toLang)?.label
    };

    const result = await generateWordTranslation(updatedData)

    setTranslationData({
      translation: result.translation,
      explanation: result.explanation,
      transcription: result.transcription,
      examples: result.examples
    })

    goToNextStep()
    setIsGenerate(false)
  }

  const saveWord = async () => {
    setDoneSteps([...doneSteps, activeStep])

    const wordData = {
      userId,
      word: formData.word,
      translation: translationData.translation,
      explanation: translationData.explanation,
      transcription: translationData.transcription,
      languageFrom: formData.fromLang,
      languageTo: formData.toLang,
      level: formData.level as Level,
      learningProgress: 'NOT_STARTED' as LearningProgress,
      examples: translationData.examples
    }

    await createWordAction(wordData)
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
            isGenerate={isGenerate}
            doneSteps={doneSteps}
            onNextStep={getTranslation}
            onPreviousStep={goToPreviousStep}
            onChange={handleFormDataChange}
          />

          <Step4 
            data={formData}
            translationData={translationData}
            activeStep={activeStep}
            doneSteps={doneSteps}
            onNextStep={goToNextStep}
            onExampleChange={handleExampleChange}
            onPreviousStep={goToPreviousStep}
            onTranslationChange={handleTranslationDataChange}
          />
          
          <Step5
            activeStep={activeStep}
            doneSteps={doneSteps}
            onPreviousStep={goToPreviousStep}
            onSave={saveWord}
          />
        </div>
      </div>
    </section>
  )
}
