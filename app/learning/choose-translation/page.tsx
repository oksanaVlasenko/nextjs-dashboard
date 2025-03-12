import Header from "@/app/ui/dashboard/header";

import { getUserWords } from "@/app/lib/words/data";

import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/learning/breadcrumbs";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import TranslationModule from "@/app/ui/learning/translation-module";

export const metadata: Metadata = {
  title: 'Choose Translation',
};

export default async function Page() {
  const result = await getUserWords({});
  
  const userWords = result.updatedWords

  return (
    <>
      <Header showSearch={false} />

      <Breadcrumbs
        breadcrumbs={[
          { label: 'Learning', href: '/learning', icon: AcademicCapIcon },
          {
            label: 'Choose Translation',
            href: '/learning/choose-translation',
            active: true,
          },
        ]}
      />

      <TranslationModule words={userWords} />
    </>
  )
}