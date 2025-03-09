'use client';

import { Word } from "@prisma/client";
import clsx from "clsx";
import { SpeakerButton } from "@/app/ui/words/buttons";
import { Button } from "@/app/ui/components/button";
import { useActionState } from "react";
import { updateWord, WordInfoState } from "@/app/lib/words/actions";
import Input from "@/app/ui/components/input";
import Textarea from "@/app/ui/components/textarea";
import Section from "@/app/ui/components/section-component";

export default function EditWord({ data }: {
  data: Word,
}) {
  const initialState: WordInfoState = { message: '', errors: {}, word: null };
  const updateWordWithId = async (state: WordInfoState, formData: FormData): Promise<WordInfoState> => {
    const updatedWord = await updateWord(data.id, state, formData);

    return updatedWord
  };

  const [state, formAction, isPending] = useActionState(updateWordWithId, initialState);
    
  return (
    <Section className="border">
      <form action={formAction}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-row lg:flex-col flex-wrap items-end lg:items-start gap-4 pb-8">
            <Input 
              isControlled={false}
              containerClassname="w-full flex flex-col max-w-sm sm:flex-1 pb-2"
              label="Translation"
              className={clsx(
                'w-full custom-input',
              )}
              id="translation"
              type="text"
              name="translation"
              placeholder="Type your word here"
              required
              defaultValue={data.translation}
              aria-describedby="name-translation"
            />

            {
              state.errors?.translation && (
                <div id="translation-error" aria-live="polite" aria-atomic="true">
                  {state.errors.translation.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
                </div>
              )
            }

            <div className="w-full flex items-center max-w-sm sm:flex-1 pb-6">
              <p>{data.transcription}</p>

              <SpeakerButton 
                word={data.word}
                language={data.languageFrom}
              />
            </div>
          </div>

          <div className="flex flex-col flex-wrap gap-4 pb-8">
            <Textarea 
              isControlled={false}
              containerClassname="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2"
              label="Explanation"
              id="explanation"
              name="explanation"
              required
              className='w-full resize-none h-[150px] max-h-[150px] scrollbar custom-input'
              placeholder="Type your word here"
              defaultValue={data.explanation}
            />
          </div>

          <div className="flex flex-col flex-wrap gap-4 pb-8">
            <Textarea 
              isControlled={false}
              containerClassname="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2"
              label="Example 1"
              className={clsx(
                'w-full px-8 py-3 resize-none h-[150px] max-h-[150px] scrollbar outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                
              )}
              id="example1"
              name="example1"
              placeholder="Type your word here"
              required
              defaultValue={data.example1}
            />
          </div>

          <div className="flex flex-col flex-wrap gap-4 pb-8">
            <Textarea 
              isControlled={false}
              containerClassname="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2"
              label="Example 2"
              className={clsx(
                'w-full px-8 py-3 resize-none h-[150px] max-h-[150px] scrollbar outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                
              )}
              id="example2"
              name="example2"
              placeholder="Type your word here"
              required
              defaultValue={data.example2}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className='w-auto lg:w-full lg:max-w-xl'>

          </div>

          <Button 
            type="submit" 
            className={clsx(
              'w-auto sm:w-full sm:max-w-xl',
              {
                'pending-animation-white': isPending,
              }
            )}
            aria-disabled={isPending}
          >
            Save 
          </Button>            
        </div>
      </form>
    </Section>
  )
}