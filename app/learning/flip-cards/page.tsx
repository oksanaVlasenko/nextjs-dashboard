import Header from "@/app/ui/dashboard/header";
import FlippingModule from "@/app/ui/learning/flipping-module";

import { getUserWords } from "@/app/lib/words/data";

import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/learning/breadcrumbs";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: 'Flip Cards',
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
            label: 'Flip Cards',
            href: '/learning/flip-cards',
            active: true,
          },
        ]}
      />

      <FlippingModule words={userWords} />
    </>
  )
}