import Header from "@/app/ui/dashboard/header";
import WordsTable from "@/app/ui/words/words-table";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  return (
    <>
      <Header />

      <WordsTable />
    </>
  )
}