import clsx from "clsx";
import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassname?: string;
  label?: string;
  isControlled?: boolean;
}

export default function Input({ containerClassname, label, isControlled, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = rest.id ?? generatedId

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
      
      <input
        {...rest}
        id={inputId}
        value={isControlled ? rest.value : undefined}
        defaultValue={!isControlled ? rest.defaultValue : undefined}
      />
    </div>
  )
}