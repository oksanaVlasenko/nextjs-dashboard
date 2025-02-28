"use client";

import { useRef, useState } from "react";
import { WhiteButton } from "../button";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function FileUploader({className, onUploadPhoto}: {
  className: string, 
  onUploadPhoto: (url: string, file: File) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      onUploadPhoto(URL.createObjectURL(selectedFile), selectedFile)
    }
  };

  return (
    <div className={clsx(className)}>
      <WhiteButton onClick={() => fileInputRef.current?.click()}>
        <ArrowUpTrayIcon className="w-5 h-5 text-neutral-900 group-hover:text-white sm:mx-4 peer-focus:text-gray-900" />

        Upload avatar
      </WhiteButton>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

