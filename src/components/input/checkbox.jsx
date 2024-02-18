import { twMerge } from "tailwind-merge"

export const Checkbox = ({
  id,
  label = 'Checkbox',
  className = '',
  fullWidth = false,
  labelClassName = '',
  ...props
}) => {
  return (
    <div className={twMerge("checkbox-wrapper-28 mb-2", (fullWidth ? 'w-full': ''))}>
      <input
        id={id}
        type="checkbox"
        className={twMerge("promoted-input-checkbox", className)}
        {...props}
      />
      <svg>
        <use xlinkHref="#checkmark-28" />
      </svg>
      <label htmlFor={id} className={twMerge('select-none', labelClassName)}>
        {label}
      </label>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="checkmark-28" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeMiterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"></path>
        </symbol>
      </svg>
    </div>
  )
}
