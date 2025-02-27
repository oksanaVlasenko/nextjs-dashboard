interface ProfileRowProps {
  children: React.ReactNode;
  label: string;
  labelFor: string;
}

export default function ProfileRow({ children, label, labelFor }: ProfileRowProps) {

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-4 group">
      <label htmlFor={labelFor} className="mb-3 text-neutral-600 font-medium tracking-tight md:mr-auto md:mb-0">
        {label}
      </label>

      {children}
    </div>
  )
}