"use client";

import clsx from "clsx";
import { DeleteWord, SpeakerButton, UpdateWord } from "./buttons";
import { AdvancedWord } from "@/app/lib/definitions";

export default function TableRow({ word, ind }: { word: AdvancedWord, ind: number }) {
  return (
    <>
      <tr className="inline-flex flex-col md:table-row">
        <td className="p-0">
          <div 
            className={clsx(
              'flex items-center pl-9 p-5 h-20 min-w-max ',
              {
                'bg-gray-50 border-l border-t border-b border-gray-100 rounded-bl-xl rounded-tl-xl': ind % 2 !== 0
              }
            )}
          >

            {/* <input className="border border-gray-200 focus:outline-0 focus:ring-offset-0 focus:ring-0 !focus:shadow-none focus:ring-transparent focus:ring-opacity-0 w-6 h-6 mr-9 text-orange-500 rounded-md" type="checkbox"/> */}
            <div className="flex items-center justify-start">
              {/* <img className="mr-5" src="uinel-assets/images/dashboard-tables/av1.png" alt=""/> */}
              <div>
                <div className="flex items-center flex-row font-heading font-medium">
                  {word.word} 

                  <SpeakerButton 
                    word={word.word}
                    language={word.languageFrom}
                  />
                </div>
                {/* <div className="text-sm text-darkBlueGray-400 font-heading">reta@shuffle.dev</div> */}
              </div>
            </div>
          </div>
        </td>
        <td className="p-0">
          <div 
            className={clsx(
              'flex flex-col w-full px-5 max-w-max h-20 min-w-0 relative group',
              {
                'bg-gray-50 border-t border-b border-gray-100': ind % 2 !== 0
              }
            )}
          >
            <span className="font-heading font-medium custom-line-clamp cursor-pointer">
              { word.explanation }
            </span>

            <div className="absolute left-1/2 -translate-x-1/2 whitespace-normal break-words top-full z-40 mt-2 w-full text-sm text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {word.explanation}
            </div>
          </div>
        </td>
        <td className="p-0">
          <div 
            className={clsx(
              'flex flex-col items-start justify-center p-5 h-20 text-center min-w-max',
              {
                'bg-gray-50 border-t border-b border-gray-100': ind % 2 !== 0
              }
            )}
          >
            <span className="font-heading font-medium">
              { word.translation }
            </span>
            <span className="text-sm text-darkBlueGray-400 font-heading">
              { word.transcription }
            </span>
          </div>
        </td>
        <td className="p-0">
          <div 
            className={clsx(
              'flex items-center w-full p-5 pr-12 h-20 min-w-max',
              {
                'bg-gray-50 border-t border-b border-r border-gray-100 rounded-br-xl rounded-tr-xl': ind % 2 !== 0
              }
            )}  
          >
            <div className="flex-1 pr-20">
              <div className="relative w-full h-1 bg-orange-100 rounded-sm">
                <div className={`absolute top-0 left-0 w-[${word.progress}%]  h-full bg-orange-300 rounded-sm`}></div>
              </div>
              <span className="block mt-2 text-sm text-darkBlueGray-400 font-heading">{word.progress}%</span>
            </div>

            <UpdateWord id={word.id} />
            
            <DeleteWord id={word.id} />
          </div>
        </td>
      </tr>
    </>
  );
}
