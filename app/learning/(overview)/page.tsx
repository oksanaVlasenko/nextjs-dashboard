import { getSession } from "@/app/lib/cacheSession";
import { getUserWords } from "@/app/lib/words/data";
import Header from "@/app/ui/dashboard/header";
import FlippingModule from "@/app/ui/learning/flipping-module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Learning',
};

export default async function Page() {
  const session = await getSession() 
  const userId = session?.user?.id ?? '';
  const result = await getUserWords({});

  const userWords = result.updatedWords

  return (
    <>
      <Header />

      <FlippingModule words={userWords} />
    </>
  )
}