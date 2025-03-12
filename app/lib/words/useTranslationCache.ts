import { useRef } from "react";
import { getTranslationWords } from "@/app/lib/words/data";
import { TranslationOption } from "@/app/lib/definitions";

export const useTranslationCache = () => {
  const cache = useRef(new Map<string, TranslationOption[]>());

  const getTranslation = async (word: TranslationOption) => {
    if (cache.current.has(word.id)) {

      return cache.current.get(word.id);
    }

    const options = await getTranslationWords(word);
    cache.current.set(word.id, options);

    return options;
  };

  return { getTranslation };
};
