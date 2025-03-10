import clsx from "clsx";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className="py-4 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div 
          className={clsx(
            'px-6 pt-5 pb-7 bg-white rounded-xl',
            className
          )}
        >
          {children}
        </div>
      </div>
    </section>
  )
}