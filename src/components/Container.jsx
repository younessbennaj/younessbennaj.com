import { forwardRef } from 'react'
import clsx from 'clsx'

export const ContainerOuter = forwardRef(function OuterContainer(
  { className, children, innerClassName, ...props },
  ref,
) {
  return (
    <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
      <div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
    </div>
  )
})

export const ContainerInner = forwardRef(function InnerContainer(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  )
})

// export const ContainerInner = forwardRef(function InnerContainer(
//   { className, children, variant = 'default', innerClassName, ...props },
//   ref,
// ) {
//   const variantClasses = {
//     default: '',
//     dark: 'bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 py-10 rounded-lg',
//     light: 'bg-white text-zinc-900 dark:bg-zinc-800 dark:text-white rounded-lg',
//   }

//   return (
//     <div
//       ref={ref}
//       className={clsx(
//         'relative px-4 sm:px-8 lg:px-12',
//         variantClasses[variant],
//         className,
//       )}
//       {...props}
//     >
//       <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
//     </div>
//   )
// })

export const Container = forwardRef(function Container(
  { children, ...props },
  ref,
) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  )
})

// import { forwardRef } from 'react'
// import { ContainerOuter } from './ContainerOuter'
// import { ContainerInner } from './ContainerInner'

// export const Container = forwardRef(function Container(
//   { children, variant = 'default', ...props },
//   ref,
// ) {
//   return (
//     <ContainerOuter ref={ref} {...props}>
//       <ContainerInner variant={variant} {...props}>
//         {children}
//       </ContainerInner>
//     </ContainerOuter>
//   )
// })
