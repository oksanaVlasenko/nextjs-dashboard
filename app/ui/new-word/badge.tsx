import clsx from "clsx"

type Option = {
  id: string,
  label: string
}

export default function Badge({ option, selected, onSelect, className }: { 
  option: Option, 
  selected: string, 
  className?: string,
  onSelect: (value: string) => void, 
}) {
  return (
    <label 
      key={option.id} 
      className={clsx(
        "flex items-center cursor-pointer",
        className
      )}
    >
      <input
        id={option.id}
        type="radio"
        name="radio"
        value={option.id}
        checked={selected === option.id}
        onChange={() => onSelect(option.id)}
        className="hidden"
      />
      <span
        className={`bg-white border text-neutral-900 text-sm font-medium px-5 py-2 rounded-lg transition-all ${
          selected === option.id ? "ring-2 ring-orange-500" : ""
        }`}
      >
        {option.label}
      </span>
    </label>
  )
}