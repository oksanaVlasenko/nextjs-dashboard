'use client';

import { Word } from "@prisma/client";
import clsx from "clsx";
import { SpeakerButton } from "@/app/ui/words/buttons";
import { Button } from "@/app/ui/button";
import { updateWord, WordInfoState } from "@/app/lib/actions";
import { useActionState } from "react";
import Link from "next/link";

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
    <section className="py-4 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="px-6 pt-5 pb-7 bg-white border rounded-xl">
          <form action={formAction}>
            <div className="w-auto mb-12">
              <h2 className="mb-3 text-3xl font-heading font-medium">
                {data.word}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-row lg:flex-col flex-wrap items-end lg:items-start gap-4 pb-8">
                <div className="w-full flex flex-col max-w-sm sm:flex-1 pb-2">
                  <label
                    className="block mb-3 text-neutral-600 font-medium tracking-tight"
                    htmlFor="translation"
                  >
                    Translation
                  </label>

                  <input
                    className={clsx(
                      'w-full custom-input',
                    )}
                    id="translation"
                    type="text"
                    name="translation"
                    placeholder="Type your word here"
                    required
                    defaultValue={data.translation}
                  />
                </div>

                <div className="w-full flex items-center max-w-sm sm:flex-1 pb-6">
                  <p>{data.transcription}</p>

                  <SpeakerButton 
                    word={data.word}
                    language={data.languageFrom}
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap gap-4 pb-8">
                <div className="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2">
                  <label
                    className="block mb-3 text-neutral-600 font-medium tracking-tight"
                    htmlFor="explanation"
                  >
                    Explanation
                  </label>

                  <textarea 
                    id="explanation"
                    name="explanation"
                    required
                    className='w-full resize-none h-[150px] max-h-[150px] scrollbar custom-input'
                    placeholder="Type your word here"
                    defaultValue={data.explanation}
                  />
                </div>
              </div>

              <div className="flex flex-col flex-wrap gap-4 pb-8">
                <div className="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2">
                  <label
                    className="block mb-3 text-neutral-600 font-medium tracking-tight"
                    htmlFor="example1"
                  >
                    Example 1
                  </label>

                  <textarea
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
              </div>

              <div className="flex flex-col flex-wrap gap-4 pb-8">
                <div className="flex flex-col w-auto sm:w-full sm:max-w-xl sm:flex-1 pb-2">
                  <label
                    className="block mb-3 text-neutral-600 font-medium tracking-tight"
                    htmlFor="example2"
                  >
                    Example 2
                  </label>

                  <textarea
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className='w-auto lg:w-full lg:max-w-xl'>
                <Link 
                  href='/dashboard'
                  className="flex justify-center items-center text-center w-full px-4 py-3 font-semibold tracking-tight hover:text-white border border-neutral-900 bg-white hover:bg-neutral-900 focus:bg-neutral-900 rounded-lg  transition duration-200"
                >
                  Back
                </Link>
              </div>

              <Button 
                type="submit" 
                className={clsx(
                  'w-auto md:w-full lg:max-w-xl',
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
        </div>
      </div>
    </section>
  )
}