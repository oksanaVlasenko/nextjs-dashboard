'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react"

interface Option {
  label: string;
  id: string;
  flag?: string;
}

interface DropdownProps {
  selected: string | null;
  options: Option[];
  placeholder?: string;
  disabledOption?: string;
  onSelect: (value: string) => void;
}

export default function dropdown({
  selected, 
  options, 
  placeholder,
  disabledOption,
  onSelect
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value

    setSearchQuery(query);
  };
   

  const handleSelect = (option: Option) => {
    onSelect(option.id); 
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    onSelect(''); 
    setSearchQuery('');
  };

  const selectedName = options.find((option: Option) => option.id === selected)?.label
  const selectedFlag = options.find((option: Option) => option.id === selected)?.flag

  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-sm relative w-full rounded-t-lg">
      <div 
        className="group relative block px-3.5 py-1.5 bg-white border rounded-t-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap items-center justify-between -m-2">
          <div className="w-auto p-2">
            {selected ? (
              <div className="flex items-center space-x-2">
                {
                  selectedFlag && 
                  <div className="w-auto p-2">
                    <img src={selectedFlag} alt="Flag icon" className="w-5 h-5 rounded-full" />
                  </div>
                }
                <span className="font-heading mb-0.5 text-sm font-medium">{selectedName}</span>
                <button onClick={handleClear} className="text-sm text-neutral-500">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <span className="text-sm text-gray-700">
                {placeholder} 
              </span>
            )}
          </div>
          <div className="w-auto p-2">
            <span 
              className={clsx(
                'inline-block transform rotate-0',
                {
                  'rotate-180': isOpen,
                  'rotate-0': !isOpen
                }
              )}
            >
              <svg className="relative -top-px text-neutral-300 group-hover:text-neutral-400" width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6673 9.5L8.00065 14.1667L3.33398 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {
        isOpen && ( 
          <div  
            ref={containerRef}
            style={{
              transition: "0.3s ease-in-out",
            }} 
            className="absolute top left-0 w-full duration-500 z-50 max-h-60 overflow-y-auto bg-white border-l border-r border-b rounded-b-lg overflow-x-hidden scrollbar max-height 0.3s ease-in-out"
          >
            <div className="flex flex-wrap">
              <div className="sticky top-0 z-10 bg-white flex w-full items-center border rounded-lg my-3 mx-3 ">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full text-sm text-gray-700 px-3 focus:ring-0 placeholder-gray-500 placeholder-text-sm border-none"
                  placeholder="Search..."
                />

                <MagnifyingGlassIcon className="ml-auto w-5 h-5 text-grey-900 mr-5 peer-focus:text-gray-900" />
              </div>
              

              {filteredOptions.map((option, ind) => (
                <div 
                  key={`${option.id}-${ind}`} 
                  className={clsx(
                    'w-full p-3 px-5 block hover:bg-orange-50',
                    {
                      'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 pointer-events-none': option.id === disabledOption,
                    }
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex flex-wrap -m-2">
                      {
                        option.flag && 
                        <div className="w-auto p-2">
                          <img src={option.flag} alt="Flag icon" className="w-5 h-5 rounded-full" />
                        </div>
                      }
                      
                      <div className="w-auto p-2">
                        <h3 className="font-heading mb-0.5 text-sm font-medium">{option.label}</h3>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
        
    </div>
  )
}