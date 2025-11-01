'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

// TODO: Dark mode support - we might enable this in the future
// For now, keeping it simple with light mode only
// function ThemeWatcher() {
//   let { resolvedTheme, setTheme } = useTheme()

//   useEffect(() => {
//     let media = window.matchMedia('(prefers-color-scheme: dark)')

//     function onMediaChange() {
//       let systemTheme = media.matches ? 'dark' : 'light'
//       if (resolvedTheme === systemTheme) {
//         setTheme('system')
//       }
//     }

//     onMediaChange()
//     media.addEventListener('change', onMediaChange)

//     return () => {
//       media.removeEventListener('change', onMediaChange)
//     }
//   }, [resolvedTheme, setTheme])

//   return null
// }

export const AppContext = createContext({})

export function Providers({ children }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {/* TODO: Enable dark mode in the future - for now keeping it simple */}
        {/* <ThemeWatcher /> */}
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}
