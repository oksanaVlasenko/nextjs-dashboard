import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex justify-center items-center text-center h-full w-full px-4 py-3 font-semibold tracking-tight text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function WhiteButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex justify-center items-center text-center w-full px-4 py-3 font-semibold tracking-tight hover:text-white border border-neutral-900 bg-white hover:bg-neutral-900  rounded-lg  transition duration-200 group',
        className,
      )}
    >
      {children}
    </button>
  );
}

export function OrangeButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest} // hover:bg-orange-500 hover:text-white
      className={clsx(
        'flex justify-center items-center text-center w-full px-4 py-2 border font-semibold tracking-tight text-orange-500 border-orange-500 bg-white  rounded-lg transition duration-200',
        className,
      )}
    >
      {children}
    </button>
  );
}
