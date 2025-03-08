import { ArticleType, Tab } from '@/app/lib/definitions'
import YoutubePlayer from '@/app/ui/words/youtube-player';
import ImageContent from '@/app/ui/words/image-content';
import { getYouTubeVideoId } from '@/app/lib/words/wordUtils';

export default function MediaContent({ article, type }: { article: ArticleType, type: Tab }) {
  const videoId = getYouTubeVideoId(article.link)
  
  return (
    <div className="py-12 border-t-2 border-gray-100">
      <div className="flex flex-wrap lg:flex-nowrap items-center">
        {
          type === Tab.articles ? (
            <ImageContent 
              src={article.image ?? ''} 
            />
          ) : (
            <YoutubePlayer 
              videoId={videoId ?? ''} 
            />
          )
        }
        
        <div className="w-full lg:w-9/12 px-4 mb-10 lg:mb-0">
          <div className="max-w-2xl">
            <span className="block text-gray-400 mb-1">
              {article.date}
            </span>
            <p className="text-2xl font-semibold text-gray-900">
              {article.title}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-auto px-4 ml-auto text-right">
          <a 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xl font-semibold text-orange-500 hover:text-gray-900" 
            href={article.link}
          >
            <span className="mr-2">
              { type === Tab.articles ? 'Read' : 'Watch' }
            </span>

            <svg className="animate-bounce" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.33301 14.6668L14.6663 1.3335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M1.33301 1.3335H14.6663V14.6668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

