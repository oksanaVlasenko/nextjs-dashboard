export const config = {
  runtime: 'nodejs', // Вимкнути Edge Runtime
}

import Nspell from "nspell";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import isoCodes from '../../lib/languages-code-list.json'

export async function POST(req: any) {
  const { word, langCode } = await req.json();

  console.log(word, langCode)
  
  const iso1 = isoCodes.find((codes: any) => codes['alpha3-b'] === langCode)?.alpha2;

  console.log(iso1, ' iso 1')

  if (!word) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  const affPath = path.join(process.cwd(), `public/dictionaries/${iso1}/index.aff`);
  const dicPath = path.join(process.cwd(), `public/dictionaries/${iso1}/index.dic`);

  console.log(affPath, ' path')
  try {
    const aff = fs.readFileSync(affPath, "utf8");
    const dic = fs.readFileSync(dicPath, "utf8");

    const dict = new Nspell(aff, dic);

    if (!dict) {
      return NextResponse.json({ correct: false, suggestions: [] });
    }

    const isCorrect = dict.correct(word);
    const suggestions = isCorrect ? [] : dict.suggest(word);

    return NextResponse.json({ correct: isCorrect, suggestions });
  } catch (error) {
    console.error("Error loading dictionary:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
