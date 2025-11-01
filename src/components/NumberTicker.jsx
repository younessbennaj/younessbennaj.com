import * as React from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

/* ------------------------------ NumberTicker ------------------------------ */
/** Compteur animé façon “pompe à essence” */
export function NumberTicker({
  value, // nouvelle cible numérique
  className,
  decimalPlaces = 0,
  delay = 0, // en secondes
  locale = 'fr-FR',
  ...props
}) {
  const ref = React.useRef(null)

  // On mémorise la dernière valeur effectivement rendue
  const prevValueRef = React.useRef(typeof value === 'number' ? value : 0)

  // Motion value part de la dernière valeur rendue
  const motionValue = useMotionValue(prevValueRef.current)

  // Spring plus “tenu” pour limiter l’overshoot
  const springValue = useSpring(motionValue, {
    damping: 26, // + haut = moins d’oscillation
    stiffness: 180, // + bas = moins “raide”
    mass: 1,
  })

  const isInView = useInView(ref, { once: true, margin: '0px' })

  // À chaque changement de `value`, on anime de prev → value
  React.useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      // point de départ = dernière valeur affichée
      motionValue.set(prevValueRef.current)
      // destination = nouvelle valeur
      motionValue.set(value)
      // on met à jour notre référence pour la prochaine anim
      prevValueRef.current = value
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [value, isInView, delay, motionValue])

  // On rend la valeur animée, clampée à >= 0 pour éviter les flashes négatifs
  React.useEffect(() => {
    const unsub = springValue.on('change', (latest) => {
      if (ref.current) {
        const safe = Math.max(latest, 0)
        ref.current.textContent = Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(safe.toFixed(decimalPlaces)))
      }
    })
    return () => unsub()
  }, [springValue, decimalPlaces, locale])

  return (
    <span
      ref={ref}
      className={cn('inline-block tabular-nums tracking-wider', className)}
      {...props}
    >
      {Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(prevValueRef.current)}
    </span>
  )
}
