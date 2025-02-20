'use client';

import clsx from "clsx";
import { useEffect, useState } from "react";
import Dropdown from "@/app/ui/dropdown";
// checkWord
import { checkWord, fetchCountriesByLanguage } from "@/app/lib/actions";
import { ArrowsRightLeftIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { Button, WhiteButton } from "@/app/ui/button";

const options = [
  { id: "A1–Elementary", label: "A1 – Elementary" },
  { id: "A2–Pre-Intermediate", label: "A2 – Pre-Intermediate" },
  { id: "B1–Intermediate", label: "B1 – Intermediate" },
  { id: "B2–Upper-Intermediate", label: "B2 – Upper-Intermediate" },
  { id: "C1–Advanced ", label: "C1 – Advanced" },
  { id: "C2–Proficient", label: "C2 – Proficient" },
];

export default function AddWord() {
  const [activeStep, setActiveStep] = useState(1)
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [fromLang, setFromLang] = useState<string>('eng')
  const [toLang, setToLang] = useState<string>('ukr')
  const [langList, setLangList] = useState<any[]>([])
  const [word, setWord] = useState<string>('')
  const [isCheckingWord, setIsCheckingWord] = useState<boolean>(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isWordCorrect, setIsWordCorrect] = useState<boolean>(false)

  const [selected, setSelected] = useState<string>("B2–Upper-Intermediate");

  const checkWordIsRight = async () => {
    console.log(isWordCorrect, ' console test')
    setIsCheckingWord(true)
    // if (isWordCorrect) {
    //   goToNextStep()

    //   return
    // }

    // setIsCheckingWord(true)
     const result = await checkWord(word, fromLang)

     console.log(result)
    // if (result.correct.correct) {
    //   goToNextStep()
    // }

    // setIsWordCorrect(result.correct.correct)
    // setSuggestions(result.suggestions)
    // setIsCheckingWord(false)
  }

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setWord(query);
  };

  const selectSuggestions = (option: string) => {
    setWord(option)
    setSuggestions([])
    setIsWordCorrect(true)
    goToNextStep()
  }

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
                To start, let&apos;s select languages from and to
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
              <h3 className="font-heading mb-0.5 text-lg font-semibold">
                What level of explanation do you prefer?
              </h3>
              <p className="mb-8 text-neutral-500">
                You could set these in general setting for future
              </p>

              {
                activeStep === 2 && (
                  <>
                    <div className="flex flex-row flex-wrap gap-2  pb-8">
                      {options.map((option) => (
                        <label key={option.id} className="flex items-center cursor-pointer">
                          <input
                            id={option.id}
                            type="radio"
                            name="radio"
                            value={option.id}
                            checked={selected === option.id}
                            onChange={() => setSelected(option.id)}
                            className="hidden"
                          />
                          <span
                            className={`bg-white border text-neutral-900 text-sm font-medium px-5 py-2 rounded-lg transition-all ${
                              selected === option.id ? "ring-2 ring-orange-500" : ""
                            }`}
                          >
                            {option.label}
                          </span>
                        </label>
                      ))}
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
              <h3 className="font-heading mb-0.5 text-lg font-semibold">Type a word or phrase to translate</h3>
              <p className="pb-8 text-neutral-500">Up to 50 characters only! </p>

              {
                activeStep === 3 && (
                  <>
                    <div className="flex flex-wrap flex-col max-w-xl pb-8 -m-1">
                      <div className="w-full max-w-sm sm:flex-1 pb-2">
                        <input
                          value={word}
                          className={clsx(
                            'w-full px-8 py-3 outline-none rounded-lg border border-neutral-100 focus:ring-0 focus:border-neutral-900 placeholder-neutral-300 font-medium transition duration-200',
                            {
                              'border-red-500': suggestions.length > 0,
                            }
                          )}
                          type="text"
                          name="text"
                          placeholder="Type your word here"
                          required
                          onChange={handleWordChange}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault(); 
                              checkWordIsRight();
                            }
                          }}
                        />
                      </div>  

                      {
                        suggestions.length > 0 && (
                          <>
                            <small className="text-red-500">Please, change the word or select one of suggestions</small>
                          
                            <div className="flex flex-row flex-wrap gap-2 pt-6">
                              {suggestions.map((option, ind) => (
                                <span
                                  key={ind}
                                  className={`bg-white border cursor-pointer text-neutral-900 text-sm font-medium px-5 py-2 ring-2 ring-orange-500 rounded-lg transition-all `}
                                  onClick={() => selectSuggestions(option)}
                                >
                                  {option}
                                </span>
                              ))}
                            </div> 
                          </>
                        )
                      }                                         
                    </div>
                      
                    <div className="flex flex-wrap gap-2 p-1 pb-11">
                      <div className="w-full max-w-sm sm:max-w-48 mb-8 sm:mb-0">
                        <WhiteButton onClick={goToPreviousStep}>
                          Go Back
                        </WhiteButton>
                      </div>

                      <div className="w-full max-w-sm sm:max-w-48">
                        <Button 
                          disabled={suggestions.length > 0}
                          className={clsx(
                            {
                              'pending-animation-white': isCheckingWord,
                              'pointer-events-none opacity-30': suggestions.length > 0
                            }
                          )}
                          onClick={checkWordIsRight} 
                        >
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
              <p className="text-neutral-500">Happy learning</p>

              {
                activeStep === 4 && (
                  <>  
                    <div className="w-full max-w-sm sm:max-w-48 sm:w-auto p-1 pt-11">
                      <Button onClick={goToNextStep}>
                        Go ahead
                        <RocketLaunchIcon className="'w-5 h-5 text-white sm:mx-4 peer-focus:text-gray-900'"/>
                      </Button>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}