import { getWordsTotalPages } from "@/app/lib/actions";
import { getSession } from "@/app/lib/auth";
import Header from "@/app/ui/dashboard/header";
import Pagination from "@/app/ui/invoices/pagination";
import { TableWordsSkeleton } from "@/app/ui/skeletons";
import WordsTable from "@/app/ui/words/words-table";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await getSession() 
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getWordsTotalPages(query, session?.user?.id!);

  return (
    <>
      <Header />

      <div className="flex flex-row px-9 pt-4 mb-2">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="mb-3 text-3xl font-heading font-medium">Recent Words</h2>
          {/* <p className="text-darkBlueGray-400 font-heading font-normal">List of recent words.</p> */}
        </div>
        {/* <div className="w-full md:w-1/2 md:hidden  mb-6 max-w-max md:ml-auto">
          <SelectAllWords words={userWords} />
        </div> */}
      </div>

      <Suspense key={query + currentPage} fallback={<TableWordsSkeleton />}>
        <WordsTable query={query} currentPage={currentPage} />
      </Suspense>

      <div className="my-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}