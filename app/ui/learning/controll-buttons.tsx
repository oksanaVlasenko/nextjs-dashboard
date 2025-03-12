import { Button, WhiteButton } from "@/app/ui/components/button"

export default function ControllButtons({ onDontKnow, onKnow }: {
  onDontKnow: () => void, 
  onKnow: () => void
}) {
  return (
    <>
      <div className='flex justify-between my-4'>
        <WhiteButton 
          className='px-2 py-3 text-sm mr-4'
          onClick={(e) => {
            e.stopPropagation()
            onDontKnow()
          }}
        >
          Don&apos;t know
        </WhiteButton>
        
        <Button 
          className='px-2 py-3 text-sm'
          onClick={(e) => {
            e.stopPropagation()
            onKnow()
          }}
        >
          Know
        </Button>
      </div>
    </>
    
  )
}