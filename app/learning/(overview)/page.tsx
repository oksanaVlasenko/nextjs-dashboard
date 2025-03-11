import Header from "@/app/ui/dashboard/header";
import LearningNav from "@/app/ui/learning/nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Learning',
};

export default async function Page() {
  return (
    <>
      <Header showSearch={false} />

      <LearningNav />
    </>
  )
}