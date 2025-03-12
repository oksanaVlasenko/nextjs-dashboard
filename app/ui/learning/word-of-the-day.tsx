'use client'

import { getWordOfTheDay } from "@/app/lib/words/actions"
import { Button } from "../components/button"
import { SpeakerButton } from "../words/buttons"
import { format } from "date-fns";
import { TranslationDataOfDayWord } from "@/app/lib/definitions";

export default function WordOfTheDay({ data }: { data: TranslationDataOfDayWord }) {
  const formattedDate = format(new Date(), 'MMMM dd, yyyy')
  
  const handleClick = async () => {

    console.log(data, ' result')
  }

  return (
    // lg:max-w-[50%]
    <div className="border rounded-xl my-5 mx-6 py-5 px-6 w-auto ">
      <h2 className=" text-3xl font-heading font-medium mb-6">
        <span>
          {formattedDate} Word of the Day is 
        </span>
        <span className="text-orange-500">
          &nbsp;{data.word}
        </span> 
      </h2>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row lg:flex-col flex-wrap items-end lg:items-start gap-6">
          <p>{data.translation}</p>

          <div className="w-full flex items-center max-w-sm sm:flex-1">
            <p className="mr-4 lg:mr-0">
              {data.transcription}
            </p>

            <SpeakerButton 
              word={data.word}
              language='eng'
            />
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-4 pb-8">
          {data.explanation}
        </div>
      </div>

      <Button onClick={handleClick}>
        Add
      </Button>
    </div>
  )
}