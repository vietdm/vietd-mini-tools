import { twMerge } from "tailwind-merge";

export const ButtonColor = {
  primary: 'from-blue-500 via-blue-600 to-blue-700',
  green: 'from-green-400 via-green-500 to-green-600',
  purple: 'from-purple-500 via-purple-600 to-purple-700'
}

export const Button = ({
  color = 'primary',
  size = 'nomal',
  className = '',
  type = 'button',
  children,
  ...props
}) => {
  const classNameDefault = 'text-white bg-gradient-to-r hover:bg-gradient-to-br focus:ring-4 font-medium rounded-lg text-center select-none';
  const classNameSize = size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-5 py-2.5 text-md';

  return (
    <button
      type={type}
      className={twMerge(
        classNameDefault,
        ButtonColor[color],
        classNameSize,
        className,
      )}
      {...props}>
      {children}
    </button>
  );
}
