'use client'

import React from 'react'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid'

function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Alert({
  type = 'info',
  title,
  description,
  details,
  detailsLabelCollapsed = 'En savoir plus',
  detailsLabelExpanded = 'Réduire',
  defaultExpanded = false,
  expanded, // controlled (optional)
  onExpandedChange,
  expandable, // if undefined -> derived from !!details
  detailsId,
  animate = true,
  className = '',
  ariaLabel,
}) {
  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-800 dark:text-blue-200',
      Icon: InformationCircleIcon,
      role: 'status',
      label: 'Bon à savoir',
      divider: 'border-blue-200/60 dark:border-blue-900',
      link: 'text-blue-800 hover:text-blue-900 dark:text-blue-200 dark:hover:text-blue-100',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-950/40',
      text: 'text-green-800 dark:text-green-200',
      Icon: CheckCircleIcon,
      role: 'status',
      label: 'À retenir',
      divider: 'border-green-200/60 dark:border-green-900',
      link: 'text-green-800 hover:text-green-900 dark:text-green-200 dark:hover:text-green-100',
    },
    warning: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      text: 'text-orange-800 dark:text-orange-200',
      Icon: ExclamationTriangleIcon,
      role: 'alert',
      label: 'Point de vigilance',
      divider: 'border-orange-200/60 dark:border-orange-900',
      link: 'text-orange-800 hover:text-orange-900 dark:text-orange-200 dark:hover:text-orange-100',
    },
    tip: {
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      text: 'text-sky-800 dark:text-sky-200',
      Icon: LightBulbIcon,
      role: 'status',
      label: 'Astuce',
      divider: 'border-sky-200/60 dark:border-sky-900',
      link: 'text-sky-800 hover:text-sky-900 dark:text-sky-200 dark:hover:text-sky-100',
    },
  }

  const v = variants[type] || variants.info
  const Icon = v.Icon

  const internalId = React.useId()
  const regionId = detailsId || `alert-details-${internalId}`

  const isControlled = typeof expanded === 'boolean'
  const [uncontrolled, setUncontrolled] = React.useState(
    Boolean(defaultExpanded),
  )
  const isExpanded = isControlled ? expanded : uncontrolled
  const setExpanded = (next) => {
    if (!isControlled) setUncontrolled(next)
    if (onExpandedChange) onExpandedChange(next)
  }

  const canExpand = typeof expandable === 'boolean' ? expandable : !!details

  // Hydration/mount guard
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Reduced motion (client-only)
  const [prefersReduced, setPrefersReduced] = React.useState(false)
  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setPrefersReduced(!!e.matches)
    setPrefersReduced(!!m.matches)
    m.addEventListener
      ? m.addEventListener('change', onChange)
      : m.addListener(onChange)
    return () => {
      m.removeEventListener
        ? m.removeEventListener('change', onChange)
        : m.removeListener(onChange)
    }
  }, [])

  const detailsRef = React.useRef(null)
  const [inlineStyle, setInlineStyle] = React.useState(() =>
    defaultExpanded
      ? { maxHeight: 'none', opacity: 1, overflow: 'visible' }
      : { maxHeight: 0, opacity: 0, overflow: 'hidden' },
  )

  React.useEffect(() => {
    const el = detailsRef.current
    if (!el) return

    const shouldAnimate = mounted && animate && !prefersReduced

    if (isExpanded) {
      // OPEN
      if (shouldAnimate) {
        // Mesure la hauteur totale pour l'ouverture
        const target = el.scrollHeight
        // Point de départ : 0 (sans transition d'abord)
        setInlineStyle({
          maxHeight: 0,
          opacity: 0,
          overflow: 'hidden',
          transition: 'none',
        })
        requestAnimationFrame(() => {
          setInlineStyle({
            maxHeight: target,
            opacity: 1,
            overflow: 'hidden',
            transition:
              'max-height 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out',
          })
        })
        const t = setTimeout(() => {
          setInlineStyle({ maxHeight: 'none', opacity: 1, overflow: 'visible' })
        }, 260)
        return () => clearTimeout(t)
      } else {
        // Pas d'anim au premier paint / reduced motion
        setInlineStyle({ maxHeight: 'none', opacity: 1, overflow: 'visible' })
      }
    } else {
      // CLOSE
      if (shouldAnimate) {
        // IMPORTANT: partir de la hauteur *actuelle* (offsetHeight), pas scrollHeight
        const current = el.offsetHeight
        if (current === 0) {
          // Déjà fermé, pas d'anim inutile
          setInlineStyle({
            maxHeight: 0,
            opacity: 0,
            overflow: 'hidden',
            transition: 'none',
          })
          return
        }
        // Définir le point de départ = hauteur actuelle, puis animer vers 0
        setInlineStyle({
          maxHeight: current,
          opacity: 1,
          overflow: 'hidden',
          transition: 'none',
        })
        requestAnimationFrame(() => {
          setInlineStyle({
            maxHeight: 0,
            opacity: 0,
            overflow: 'hidden',
            transition:
              'max-height 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease-in',
          })
        })
      } else {
        setInlineStyle({ maxHeight: 0, opacity: 0, overflow: 'hidden' })
      }
    }
  }, [isExpanded, animate, prefersReduced, mounted]) // <- on retire defaultExpanded des deps

  return (
    <div
      role={v.role}
      aria-label={ariaLabel || v.label}
      className={cx(
        'rounded-xl px-4 py-3 shadow-sm sm:px-5 sm:py-4',
        v.bg,
        className,
      )}
    >
      <div className="flex items-start gap-2">
        <Icon
          className={cx('mt-0.5 h-5 w-5 shrink-0', v.text)}
          aria-hidden="true"
        />
        <div className="flex-1">
          {(title || v.label) && (
            <h4 className={cx('mb-1 text-sm font-semibold leading-6', v.text)}>
              {title || v.label}
            </h4>
          )}

          {description && (
            <div className="prose-sm prose max-w-none dark:prose-invert">
              {description}
            </div>
          )}

          {canExpand && (
            <div className="mt-2">
              <button
                type="button"
                className={cx(
                  'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium underline underline-offset-2',
                  v.link,
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2 dark:focus-visible:ring-white/30',
                )}
                aria-expanded={isExpanded}
                aria-controls={regionId}
                onClick={() => setExpanded(!isExpanded)}
              >
                {isExpanded ? detailsLabelExpanded : detailsLabelCollapsed}
              </button>
            </div>
          )}

          {canExpand && (
            <div
              id={regionId}
              role="region"
              aria-hidden={!isExpanded}
              className={cx('mt-3 border-t pt-3', v.divider)}
              ref={detailsRef}
              style={inlineStyle}
            >
              {details && (
                <div className="prose-sm prose max-w-none dark:prose-invert">
                  {details}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Alert
