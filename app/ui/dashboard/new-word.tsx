'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Step1 from "@/app/ui/new-word/step1";
import Step2 from "@/app/ui/new-word/step2";
import Step3 from "@/app/ui/new-word/step3";
import Step4 from "@/app/ui/new-word/step4";
import Step5 from "@/app/ui/new-word/step5";

import { useLanguages } from "@/app/lib/words/useLanguages";
import { TranslationData, WordData } from "@/app/lib/definitions";
import { Level, LearningProgress } from "@prisma/client";
import { createWordAction, generateWordTranslation } from "@/app/lib/words/actions";
import Section from "@/app/ui/components/section-component";

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
    example1: '',
    example2: ''
  })

  const { data: session } = useSession();

  const { langList } = useLanguages()

  useEffect(() => {
    if (session && session?.user?.languageFrom && session.user.languageTo && session.user.level) {
      handleFormDataChange({
        fromLang: session.user.languageFrom,
        toLang: session.user.languageTo,
        level: session.user.level
      })

      setActiveStep(3)
      setDoneSteps(prevSteps => [...prevSteps, 1, 2])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFormDataChange = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  const handleTranslationDataChange = (newData: Partial<typeof translationData>) => {
    setTranslationData({ ...translationData, ...newData });
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
      example1: result.example1,
      example2: result.example2
    })

    goToNextStep()
    setIsGenerate(false)
  }

  const saveWord = async () => {
    setIsGenerate(true)
    setDoneSteps([...doneSteps, activeStep])

    const wordData = {
      word: formData.word,
      translation: translationData.translation,
      explanation: translationData.explanation,
      transcription: translationData.transcription,
      languageFrom: formData.fromLang,
      languageTo: formData.toLang,
      level: formData.level as Level,
      learningProgress: 'NOT_STARTED' as LearningProgress,
      example1: translationData.example1,
      example2: translationData.example2,
      progress: 0
    }

    await createWordAction(wordData)

    setIsGenerate(false)
  }
      
  return (
    <Section className="border">
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
        onPreviousStep={goToPreviousStep}
        onTranslationChange={handleTranslationDataChange}
      />
      
      <Step5
        activeStep={activeStep}
        isGenerate={isGenerate}
        doneSteps={doneSteps}
        onPreviousStep={goToPreviousStep}
        onSave={saveWord}
      />
    </Section>
  )
}
