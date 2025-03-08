import { generateExporeWord } from "@/app/lib/words/actions";
import { Word } from "@prisma/client";
import { Tab } from "@/app/lib/definitions";
import MediaContent from "@/app/ui/words/media-content";

type MediaProps = {
  data: Word;
  type: Tab
};

export default async function Media({ data, type }: MediaProps) {

  const result = await generateExporeWord({
    word: data.word,
    fromLang: data.languageFrom,
    type
  })
 
  return (
    <section className="py-4 overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="px-6 pt-5 pb-7 bg-white rounded-xl">
          {
            result.map((article) => (
              <MediaContent 
                key={article.title}
                type={type}
                article={article}
              />
            ))
          } 
        </div>
      </div>
    </section>
  )
}