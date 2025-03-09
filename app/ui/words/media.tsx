import { generateExporeWord } from "@/app/lib/words/actions";
import { Word } from "@prisma/client";
import { Tab } from "@/app/lib/definitions";
import MediaContent from "@/app/ui/words/media-content";
import Section from "@/app/ui/components/section-component";

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
    <Section>
      {
        result.map((article) => (
          <MediaContent 
            key={article.title}
            type={type}
            article={article}
          />
        ))
      } 
    </Section>
  )
}