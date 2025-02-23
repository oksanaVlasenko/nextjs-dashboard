import { getUserWords } from "@/app/lib/actions";
import { speakText } from "@/app/lib/utils";
import { auth } from "@/auth";
import { SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { SelectAllWords, SpeakerButton } from "./buttons";
import clsx from "clsx";
import Popup from "./table-row";
import TableRow from "./table-row";

export default async function WordsTable() {
  const session = await auth()
  console.log(session?.user?.id, ' session')

  const userWords = await getUserWords(session?.user?.id!);
  console.log(userWords); 

  return (
    <section className="py-8 bg-blueGray-50" >


      <div className="container px-4 mx-auto">
        <div className="pt-4 pb-12 2xl:h-full bg-white rounded-3xl">
          <div className="flex flex-row px-9 mb-2">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h2 className="mb-3 text-3xl font-heading font-medium">Recent Words</h2>
              {/* <p className="text-darkBlueGray-400 font-heading font-normal">List of recent words.</p> */}
            </div>
            {/* <div className="w-full md:w-1/2 md:hidden  mb-6 max-w-max md:ml-auto">
              <SelectAllWords words={userWords} />
            </div> */}
          </div>

          
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden">
              <table className="table-auto w-full mb-8">
                <thead>
                  {/*  inline-flex flex-col */}
                  <tr className="hidden md:table-row">
                    <th className="flex items-center pl-9 h-20 bg-white text-left">
                      {/* <input className="border border-gray-200 focus:outline-0 focus:ring-offset-0 focus:ring-0 !focus:shadow-none focus:ring-transparent focus:ring-opacity-0 w-6 h-6 mr-9 text-orange-500 rounded-md" type="checkbox"/> */}
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Word</span>
                    </th>
                    <th className="p-5  h-20 text-left bg-white">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Explanation</span>
                    </th>
                    <th className="p-5  h-20 text-left bg-white">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Translation</span>
                    </th>
                    <th className="p-5 h-20 bg-white text-left">
                      <span className="text-sm text-body text-opacity-40 font-heading font-semibold uppercase">Progress</span>
                    </th>
                  </tr>
                </thead>


                <tbody>
                  {
                    userWords.map((word, ind) => (
                      <TableRow 
                        key={word.id}
                        word={word}
                        ind={ind}
                      />
                      // <>
                      // <tr key={word.id}>
                      //   <td className="p-0">
                      //     <div 
                      //       className={clsx(
                      //         'flex items-center pl-9 p-5 h-20 min-w-max ',
                      //         {
                      //           'bg-gray-50 border-l border-t border-b border-gray-100 rounded-bl-xl rounded-tl-xl': ind % 2 !== 0
                      //         }
                      //       )}
                      //     >

                      //       <input className="border border-gray-200 focus:outline-0 focus:ring-offset-0 focus:ring-0 !focus:shadow-none focus:ring-transparent focus:ring-opacity-0 w-6 h-6 mr-9 text-orange-500 rounded-md" type="checkbox"/>
                      //       <div className="flex items-center justify-start">
                      //         {/* <img className="mr-5" src="uinel-assets/images/dashboard-tables/av1.png" alt=""/> */}
                      //         <div>
                      //           <div className="flex items-center flex-row font-heading font-medium">
                      //             {word.word} 

                      //             <SpeakerButton 
                      //               word={word.word}
                      //               language={word.languageFrom}
                      //             />
                      //           </div>
                      //           {/* <div className="text-sm text-darkBlueGray-400 font-heading">reta@shuffle.dev</div> */}
                      //         </div>
                      //       </div>
                      //     </div>
                      //   </td>
                      //   <td className="p-0">
                      //     <div 
                      //       className={clsx(
                      //         'flex flex-col items-start justify-center p-5 h-20 text-center min-w-max',
                      //         {
                      //           'bg-gray-50 border-t border-b border-gray-100': ind % 2 !== 0
                      //         }
                      //       )}
                      //     >
                      //       <span className="font-heading font-medium">
                      //         { word.translation }
                      //       </span>
                      //       <span className="text-sm text-darkBlueGray-400 font-heading">
                      //         { word.transcription }
                      //       </span>
                      //     </div>
                      //   </td>
                      //   <td className="p-0">
                      //     <div 
                      //       className={clsx(
                      //         'flex items-center w-full p-5 pr-12 h-20 min-w-max',
                      //         {
                      //           'bg-gray-50 border-t border-b border-r border-gray-100 rounded-br-xl rounded-tr-xl': ind % 2 !== 0
                      //         }
                      //       )}  
                      //     >
                      //       <div className="flex-1 pr-20">
                      //         <div className="relative w-full h-1 bg-orange-100 rounded-sm">
                      //           <div className={`absolute top-0 left-0 w-[${word.progress}%]  h-full bg-orange-300 rounded-sm`}></div>
                      //         </div>
                      //         <span className="block mt-2 text-sm text-darkBlueGray-400 font-heading">{word.progress}%</span>
                      //       </div>
                      //       <a className="inline-block" href="#">
                      //         <svg width="13" height="3" viewBox="0 0 13 3" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.8" cx="1.5" cy="1.5" r="1.5" fill="#faaf7e"></circle><circle opacity="0.8" cx="6.5" cy="1.5" r="1.5" fill="#faaf7e"></circle><circle opacity="0.8" cx="11.5" cy="1.5" r="1.5" fill="#faaf7e"></circle></svg>
                      //       </a>
                      //     </div>
                      //   </td>
                      // </tr>
                      // </>
                      
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
          {/* <div className="mx-auto max-w-max"><a x-show="!showContent" className="block py-4 px-7 w-full leading-3 text-white font-semibold tracking-tighter font-heading text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl" href="#">Show more</a></div> */}
        </div>
      </div>
    </section>
  )
}