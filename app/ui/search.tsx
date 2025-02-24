'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className="flex w-full container items-center lg:w-auto py-1 px-4 mb-0 md:mb-0 border rounded bg-white">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        id="search"
        className="text-sm outline-none focus:ring-0 placeholder-gray-500 placeholder-text-sm border-none"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <MagnifyingGlassIcon className="ml-auto w-5 h-5 text-grey-900 peer-focus:text-gray-900" />
    </div>
  );
}
