'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import Dropdown from "../dropdown";
import { fetchCountriesByLanguage } from "@/app/lib/actions";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { Button, WhiteButton } from "../button";

export default function AddWord() {
  const [activeStep, setActiveStep] = useState(1)
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [fromLang, setFromLang] = useState<string>('eng')
  const [toLang, setToLang] = useState<string>('ukr')
  const [langList, setLangList] = useState<any[]>([])

  const switchLanguages = () => {
    if (!fromLang && !toLang) return 

    setFromLang(toLang)
    setToLang(fromLang)
  }

  const goToNextStep = () => {
    setDoneSteps([...doneSteps, activeStep])
    setActiveStep(activeStep + 1)
    
  }

  const goToPreviousStep = () => {
    setDoneSteps(doneSteps.filter(i => i !== activeStep))
    setActiveStep(activeStep - 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await fetchCountriesByLanguage();
        setLangList(countriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [])

  return (
    <section className="py-4 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="px-6 pt-5 pb-7 bg-white border rounded-xl">
          <div className="flex flex-wrap -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="block pb-4">
                  <div 
                    className={clsx(
                      'flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full',
                      {
                        'bg-orange-100': activeStep === 1
                      }
                    )}
                  >
                    {  
                      !doneSteps.includes(1) ? (
                        <span 
                          className={clsx(
                            'text-lg font-semibold',
                          )}
                        >
                          1
                        </span>
                      ) : (
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7L5 11L15 1" stroke="#0C1523" strokeWidth="2" strokeLinejoin="round"></path>
                        </svg>
                      )
                    }
                    
                  </div>
                </div>
                <div className="w-px h-full border border-dashed"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-heading mb-0.5 text-lg font-semibold">
                To start, let's select languages from and to
              </h3>
              <p className="mb-7 text-neutral-500">
                You could set these in general setting for future
              </p>

              {
                activeStep === 1 && (
                  <>
                    <div className="flex flex-wrap items-center max-w-xl pb-8 -m-1">
                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={fromLang}
                          options={langList}
                          disabledOption={toLang}
                          placeholder="Select from language"
                          onSelect={(id) => setFromLang(id)}
                        />
                      </div>

                      <ArrowsRightLeftIcon 
                        className={clsx(
                          'w-5 h-5 text-gray-500 my-5 sm:mx-4 peer-focus:text-gray-900',
                          {
                            'cursor-pointer text-gray-900': fromLang && toLang
                          }
                        )}
                        onClick={switchLanguages}
                      />

                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={toLang}
                          options={langList}
                          disabledOption={fromLang}
                          placeholder="Select to language"
                          onSelect={(id) => setToLang(id)}
                        />
                      </div>

                      
                    </div>
                      
                    <div className="w-full max-w-sm sm:max-w-48 sm:w-auto p-1 pb-11">
                      <Button onClick={goToNextStep}>
                        Continue
                      </Button>
                    </div>
                  </>
                )
              }
              
              </div>
            </div>
          <div className="flex flex-wrap -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="block pb-3">
                  <div 
                    className={clsx(
                      'flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full',
                      {
                        'bg-orange-100': activeStep === 2
                      }
                    )}
                  >
                    {  
                      !doneSteps.includes(2) ? (
                        <span 
                          className={clsx(
                            'text-lg font-semibold',
                            {
                              'text-gray-500': !doneSteps.includes(2) && activeStep !== 2,
                            }
                          )}
                        >
                          2
                        </span>
                      ) : (
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7L5 11L15 1" stroke="#0C1523" strokeWidth="2" strokeLinejoin="round"></path>
                        </svg>
                      )
                    }
                    
                  </div>
                </div>
                <div className="w-px h-full border border-dashed"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-heading mb-0.5 text-lg font-semibold">Create a channel for your project</h3>
              <p className="pb-12 text-neutral-500">You can have many channels for your project</p>

              {
                activeStep === 2 && (
                  <>
                    <div className="flex flex-wrap items-center max-w-xl pb-8 -m-1">
                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={fromLang}
                          options={langList}
                          disabledOption={toLang}
                          placeholder="Select from language"
                          onSelect={(id) => setFromLang(id)}
                        />
                      </div>

                      <ArrowsRightLeftIcon 
                        className={clsx(
                          'w-5 h-5 text-gray-500 my-5 sm:mx-4 peer-focus:text-gray-900',
                          {
                            'cursor-pointer text-gray-900': fromLang && toLang
                          }
                        )}
                        onClick={switchLanguages}
                      />

                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={toLang}
                          options={langList}
                          disabledOption={fromLang}
                          placeholder="Select to language"
                          onSelect={(id) => setToLang(id)}
                        />
                      </div>

                      
                    </div>
                      
                    <div className="flex flex-wrap gap-2 p-1 pb-11">
                      <div className="w-full max-w-sm sm:max-w-48 mb-8 sm:mb-0">
                        <WhiteButton onClick={goToPreviousStep}>
                          Go Back
                        </WhiteButton>
                      </div>

                      <div className="w-full max-w-sm sm:max-w-48">
                        <Button onClick={goToNextStep}>
                          Continue
                        </Button>
                      </div>
                      
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="block pb-3">
                  <div 
                    className={clsx(
                      'flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full',
                      {
                        'bg-orange-100': activeStep === 3
                      }
                    )}
                  >
                    {  
                      !doneSteps.includes(3) ? (
                        <span 
                          className={clsx(
                            'text-lg font-semibold',
                            {
                              'text-gray-500': !doneSteps.includes(3) && activeStep !== 3,
                            }
                          )}
                        >
                          3
                        </span>
                      ) : (
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7L5 11L15 1" stroke="#0C1523" strokeWidth="2" strokeLinejoin="round"></path>
                        </svg>
                      )
                    }
                  </div>
                </div>
                <div className="w-px h-full border border-dashed"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-heading mb-0.5 text-lg font-semibold">Generate your API Token</h3>
              <p className="pb-12 text-neutral-500">Tokens are required for publishing events</p>

              {
                activeStep === 3 && (
                  <>
                    <div className="flex flex-wrap items-center max-w-xl pb-8 -m-1">
                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={fromLang}
                          options={langList}
                          disabledOption={toLang}
                          placeholder="Select from language"
                          onSelect={(id) => setFromLang(id)}
                        />
                      </div>

                      <ArrowsRightLeftIcon 
                        className={clsx(
                          'w-5 h-5 text-gray-500 my-5 sm:mx-4 peer-focus:text-gray-900',
                          {
                            'cursor-pointer text-gray-900': fromLang && toLang
                          }
                        )}
                        onClick={switchLanguages}
                      />

                      <div className="w-full sm:flex-1 p-1">
                        <Dropdown 
                          selected={toLang}
                          options={langList}
                          disabledOption={fromLang}
                          placeholder="Select to language"
                          onSelect={(id) => setToLang(id)}
                        />
                      </div>

                      
                    </div>
                      
                    <div className="flex flex-wrap gap-2 p-1 pb-11">
                      <div className="w-full max-w-sm sm:max-w-48 mb-8 sm:mb-0">
                        <WhiteButton onClick={goToPreviousStep}>
                          Go Back
                        </WhiteButton>
                      </div>

                      <div className="w-full max-w-sm sm:max-w-48">
                        <Button onClick={goToNextStep}>
                          Continue
                        </Button>
                      </div>
                      
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="block pb-3">
                  <div className="flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full">
                    <span 
                      className={clsx(
                        'text-lg font-semibold',
                        {
                          'text-gray-500': !doneSteps.includes(2),
                        }
                      )}
                    >
                      4
                    </span>
                  </div>
                </div>
                <div className="w-px h-full border border-dashed"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-heading mb-0.5 text-lg font-semibold">Publish your first event</h3>
              <p className="pb-12 text-neutral-500">Code or no code, we got you covered</p>
            </div>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="w-auto p-2">
              <div className="flex flex-col items-center justify-between h-full">
                <div className="block pb-3">
                  <div className="flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 7L5 11L15 1" stroke="#0C1523" strokeWidth="2" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full border border-dashed"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-heading mb-0.5 text-lg font-semibold">You’re all set!</h3>
              <p className="text-neutral-500">Happy event tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}