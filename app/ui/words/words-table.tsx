import TableRow from "./table-row";
import { AdvancedWord } from "@/app/lib/definitions";

export default async function WordsTable({
  userWords
}: {
  userWords: AdvancedWord[]
}) {

  return (
    <section className="py-8 bg-blueGray-50" >
      <div className="container px-4 mx-auto">
        <div className="2xl:h-full bg-white rounded-3xl">          
          <div className="overflow-x-auto scrollbar">
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
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}