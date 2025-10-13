import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-sky-600 font-medium text-white hover:bg-sky-500 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
  secondary:
    'bg-gray-500 font-semibold text-white hover:bg-gray-400 active:bg-gray-600  dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  ghost: 'bg-zinc-300/50',
  dark: 'bg-white text-sky-950 font-semibold hover:bg-slate-200 active:bg-slate-200 active:text-slate-900 text-lg',
}

export function Button({ variant = 'primary', className, ...props }) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-lg py-2.5 px-3 text-md outline-offset-2 transition active:transition-none disabled:opacity-50',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
