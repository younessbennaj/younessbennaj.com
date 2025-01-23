import classNames from 'classnames'

export function Chips({ children, type }) {
  return (
    <span
      className={classNames(
        'absolute bottom-2 left-2 z-20 rounded-full border px-2 py-1 text-xs leading-5',
        {
          'border-blue-700 bg-blue-100 text-blue-700': type === 'info',
          'border-orange-700 bg-orange-100 text-orange-700': type === 'warning',
          'border-green-700 bg-green-100 text-green-700': type === 'success',
        },
      )}
    >
      {children}
    </span>
  )
}
