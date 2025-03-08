'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from 'clsx';
import { Tab } from "@/app/lib/definitions";

type TabProps = {
  label: string,
  id: Tab
}

export default function Tabs({ tabs }: { tabs: TabProps[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTab = searchParams.get('tab')?.toString() ?? tabs[0].id

  const changeTab = (tabId: Tab) => {
    const params = new URLSearchParams(searchParams);

    if (tabId) {
      params.set('tab', tabId);
    } else {
      params.delete('tab');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="px-6 mb-4">
      <div className="border-b border-gray-100">
        {
          tabs.map((tab) => (
            <p 
              key={tab.id}
              className={clsx(
                'inline-block py-4 pr-16 mr-9 font-heading font-medium cursor-pointer ', 
                {
                  'border-b-2 border-orange-500 text-orange-500 hover:text-orange-600': activeTab === tab.id,
                  'text-gray-100 hover:text-gray-300': activeTab !== tab.id
                }
              )}
              onClick={() => changeTab(tab.id)}
            >
              { tab.label }
            </p>
          ))
        }
      </div>
    </div>
  )
}