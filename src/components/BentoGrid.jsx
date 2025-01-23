import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { ArrowRightIcon } from '@radix-ui/react-icons'

export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid w-full auto-rows-[18rem] grid-cols-2 gap-4 md:auto-rows-[22rem] md:grid-cols-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  //   background,
  //   Icon,
  description,
  href,
  cta,
}) => (
  <div
    key={name}
    className={cn(
      'group relative flex flex-col justify-end overflow-hidden rounded-xl',
      // light styles
      'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      // dark styles
      'transform-gpu dark:border dark:border-zinc-800/50 dark:bg-zinc-800',
      className,
    )}
  >
    {/* <div>{background}</div> */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      {/* <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" /> */}
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="line-clamp-3 max-w-lg text-neutral-400 md:line-clamp-none">
        {description}
      </p>
    </div>

    <div
      className={cn(
        'pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100',
      )}
    >
      <Button
        href={href}
        variant="secondary"
        className="pointer-events-auto dark:bg-black"
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
)
