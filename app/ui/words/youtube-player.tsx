'use client'

import FailedMedia from "@/app/ui/words/failed-media";
import { YouTubeEmbed } from '@next/third-parties/google'

export default function YoutubePlayer({ videoId }: { videoId: string }) {
  
  return (
    <>     
      {videoId ? (
        <div className="h-44 lg:h-auto flex items-center">
          <YouTubeEmbed 
            videoid={videoId}
            width={236}
          />
        </div>
      ) : (
        <FailedMedia />
      )}
    </>
  )
  
}