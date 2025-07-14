import { twMerge } from "tailwind-merge";

const defaultInputClass = [
  'bg-[rgba(255,255,255,0.7)]',
  'outline-none',
  'border',
  'border-gray-300',
  'text-gray-900',
  'text-sm',
  'rounded-lg',
  'focus:ring-blue-500',
  'focus:border-blue-500',
  'block',
  'w-full',
  'p-2.5',
].join(' ');

export const Input = ({
  id,
  name = null,
  rootClass = '',
  inputClass = '',
  labelClass = '',
  label = 'Label',
  type = 'text',
  ...props
}) => {
  return (
    <div className={twMerge("mb-3", rootClass)}>
      <label
        htmlFor={id}
        className={twMerge("block mb-1 font-medium text-gray-900 dark:text-white", labelClass)}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name ?? id}
        className={twMerge(defaultInputClass, inputClass)}
        {...props}
      />
    </div>
  )
}
