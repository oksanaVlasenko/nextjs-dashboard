import Link from "next/link"


export default function LearningItem({ name, description, link }: {
  name: string,
  description: string,
  link: string
}) {

  return (
    <div className="h-full sm:h-[22rem] px-6 pt-5 pb-7 bg-white border rounded-xl w-auto sm:w-full sm:max-w-xs flex flex-col justify-between">
      <div>
        <h2 className="font-heading mb-6 font-semibold text-3xl">
          {name}
        </h2>

        <span className="text-neutral-600 tracking-tight font-semibold group-hover:text-neutral-800 transition duration-200">
          {description}
        </span>
      </div>
      
      <Link 
        className="inline-flex items-center mt-6 text-xl font-semibold text-orange-500 hover:text-gray-900" 
        href={link}
      >
        <span className="mr-2">
          Try
        </span>

        <svg className="animate-bounce" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.33301 14.6668L14.6663 1.3335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M1.33301 1.3335H14.6663V14.6668" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </Link>
    </div>
  )
}