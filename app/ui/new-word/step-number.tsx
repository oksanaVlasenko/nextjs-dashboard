import clsx from "clsx";

export default function StepNumber({ number, isActive, isDone }: { 
  number: number, 
  isActive: boolean, 
  isDone: boolean 
}) {
  return (
    <div className="w-auto p-2">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="block pb-4">
          <div 
            className={clsx(
              'flex items-center justify-center w-10 h-10 border border-neutral-200 rounded-full',
              {
                'bg-orange-100': isActive
              }
            )}
          >
            {  
              !isDone ? (
                <span 
                  className={clsx(
                    'text-lg font-semibold',
                  )}
                >
                  { number }
                </span>
              ) : (
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 7L5 11L15 1" stroke="#0C1523" strokeWidth="2" strokeLinejoin="round"></path>
                </svg>
              )
            }
            
          </div>
        </div>
        <div className="w-px h-full border border-dashed"></div>
      </div>
    </div>
  )
}