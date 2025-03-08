import { Tab } from "@/app/lib/definitions";
import { fetchWordById } from "@/app/lib/words/data";
import Header from "@/app/ui/dashboard/header";
import TabContent from "@/app/ui/words/tab-content";
import Tabs from "@/app/ui/words/tabs";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Metadata } from 'next';
import Link from "next/link";
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Word',
};

const tabs = [
  { label: 'Word', id: Tab.word },
  { label: 'Articles', id: Tab.articles },
  { label: 'Videos', id: Tab.videos },
  { label: 'Songs', id: Tab.songs }
]

export default async function Page(props: { 
  params: Promise<{ id: string }>,
  searchParams?: Promise<{ tab?: Tab }>
}) {
  const searchParams = await props.searchParams;
  
  const activeTab: Tab = searchParams?.tab || Tab.word

  const params = await props.params;
  const id = params.id;

  const word = await fetchWordById(id)

  if (!word) {
    notFound();
  }

  return (
    <main>
      <Header />

      <div className="w-auto p-6 mb-3 flex items-center">
        <Link 
          href='/dashboard'
        >
          <ArrowUturnLeftIcon className="w-7 h-7 mr-4 cursor-pointer" /> 
        </Link>
        
        
        <h2 className=" text-3xl font-heading font-medium">
          {word.word}
        </h2>
      </div>

      <Tabs 
        tabs={tabs}
      />

      <TabContent 
        activeTab={activeTab} 
        word={word} 
      />
    </main>
  )
}