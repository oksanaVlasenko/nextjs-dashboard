import { Word } from "@prisma/client";
import EditWord from "@/app/ui/words/edit-word";
import Media from "@/app/ui/words/media";
import { Tab } from "@/app/lib/definitions";
import { Suspense } from "react";
import { MediaTableSkeleton } from "@/app/ui/skeletons";

export default function TabContent({ activeTab, word }: { activeTab: Tab, word: Word }) {
  const componentsMap = {
    word: <EditWord data={word} />,
    articles: (
      <Suspense fallback={<MediaTableSkeleton /> }>
        <Media data={word} type={Tab.articles} />
      </Suspense>
    ),
    videos: (
      <Suspense fallback={<MediaTableSkeleton /> }>
        <Media data={word} type={Tab.videos} />
      </Suspense>
    ),
     
    songs: (
      <Suspense fallback={<MediaTableSkeleton /> }>
        <Media data={word} type={Tab.songs} />
      </Suspense>
    ),
    
  };
  
  return (
    <div>
      {componentsMap[activeTab] || null} 
    </div>
  );
}