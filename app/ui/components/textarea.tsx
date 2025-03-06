import clsx from "clsx";
import { useId } from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassname?: string;
  label?: string;
  isControlled?: boolean;
}

export default function Textarea({ containerClassname, label, isControlled, ...rest }: TextareaProps) {
  const inputId = rest.id ?? useId()

  return (
    <div className={clsx(containerClassname)}>
      { 
        label && (
          <label
            className='custom-label'
            htmlFor={inputId}
          >
            {label}
          </label>
        )
      }
      
      <textarea
        {...rest}
        id={inputId}
        value={isControlled ? rest.value : undefined}
        defaultValue={!isControlled ? rest.defaultValue : undefined}
      />
    </div>
  )
}