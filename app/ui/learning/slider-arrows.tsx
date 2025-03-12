'use client'

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect } from "react";

export default function SliderArrows({ onUpdate }: {onUpdate: (value: 'next' | 'previous') => void}) {
  const handleClick = useCallback((value: 'next' | 'previous') => {
    onUpdate(value)
  }, [onUpdate])

  const keyDownHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleClick('previous');
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleClick('next');
    }    
  }, [handleClick]) 
  

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);
  
  return (
    <div className="flex justify-center pt-7">
      <button 
        className="flex h-10 w-10 items-center mr-4 justify-center rounded-md border cursor-pointer"
        onClick={() => handleClick('previous')}
      >
        <ArrowLeftIcon className="w-4" />
      </button>

      <button 
        className="flex h-10 w-10 items-center justify-center rounded-md border cursor-pointer"
        onClick={() => handleClick('next')}
      >
        <ArrowRightIcon className="w-4" />
      </button>
    </div>
  )
}