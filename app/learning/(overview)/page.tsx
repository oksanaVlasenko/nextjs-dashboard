import { getUserWords } from "@/app/lib/actions";
import { getSession } from "@/app/lib/auth";
import Header from "@/app/ui/dashboard/header";
import FlippingModule from "@/app/ui/learning/flipping-module";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Learning',
};

export default async function Page() {
  const session = await getSession() 
  const userId = session?.user?.id ?? '';
  const result = await getUserWords({
    userId
  });

  const userWords = result.updatedWords

  return (
    <>
      <Header />

      <FlippingModule words={userWords} />
    </>
  )
}