'use client'

import { useMediaQuery } from '@uidotdev/usehooks'
import tailwindConfig from '../../tailwind.config.js'
import resolveConfig from 'tailwindcss/resolveConfig'

export function useResponsive() {
  const fullConfig = resolveConfig(tailwindConfig)
  const screens = fullConfig.theme.screens

  const isSmallDevice = useMediaQuery(
    `only screen and (max-width : ${screens.sm})`,
  )
  const isMediumDevice = useMediaQuery(
    `only screen and (min-width : ${screens.sm}) and (max-width : ${screens.md})`,
  )
  const isLargeDevice = useMediaQuery(
    `only screen and (min-width : ${screens.lg}) and (max-width : ${screens.xl})`,
  )
  const isExtraLargeDevice = useMediaQuery(
    `only screen and (min-width : ${screens.xl})`,
  )

  return {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
  }
}
