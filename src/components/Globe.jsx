'use client'
import { useRef, useEffect, useState } from 'react'
import createGlobe from 'cobe'
import dayjs from 'dayjs'

const CITIES = [
  {
    name: 'Tokyo',
    lat: 35.6762,
    long: 139.6503,
    start_date: '2024-09-03',
    end_date: '2024-11-03',
  },
  {
    name: 'Bangkok',
    lat: 13.7563,
    long: 100.5018,
    start_date: '2024-11-03',
    end_date: '2025-01-26',
  },
  {
    name: 'Kuala Lumpur',
    lat: 3.139,
    long: 101.6869,
    start_date: '2025-01-26',
    end_date: '2025-03-02',
  },
  {
    name: 'Bangkok',
    lat: 13.7563,
    long: 100.5018,
    start_date: '2025-03-02',
    end_date: '2025-04-15',
  },
  {
    name: 'Tokyo',
    lat: 35.6762,
    long: 139.6503,
    start_date: '2025-04-15',
    end_date: '2025-07-15',
  },
  {
    name: 'Bangkok',
    lat: 13.7563,
    long: 100.5018,
    start_date: '2025-07-15',
    end_date: '2025-09-15',
  },
]

export function Globe() {
  const [cityIndex, setCityIndex] = useState(0)
  const canvasRef = useRef()
  const locationToAngles = (lat, long) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ]
  }
  const currentAngles = locationToAngles(
    CITIES[cityIndex].lat,
    CITIES[cityIndex].long,
  )
  const focusRef = useRef([currentAngles[0], currentAngles[1]])

  const handleNextClick = () => {
    focusRef.current = locationToAngles(
      CITIES[(cityIndex + 1) % CITIES.length].lat,
      CITIES[(cityIndex + 1) % CITIES.length].long,
    )
    setCityIndex((prevIndex) => (prevIndex + 1) % CITIES.length)
  }

  const handlePreviousClick = () => {
    focusRef.current = locationToAngles(
      CITIES[(cityIndex - 1 + CITIES.length) % CITIES.length].lat,
      CITIES[(cityIndex - 1 + CITIES.length) % CITIES.length].long,
    )
    setCityIndex((prevIndex) => (prevIndex - 1 + CITIES.length) % CITIES.length)
  }

  useEffect(() => {
    let width = 0
    let currentPhi = 0
    let currentTheta = 0
    const doublePi = Math.PI * 2
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 200 / 255, 21 / 255],
      glowColor: [1.2, 1.2, 1.2],
      markers: [
        { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
        { location: [13.7563, 100.5018], size: 0.1 }, // Bangkok
        { location: [3.139, 101.6869], size: 0.1 }, // Kuala Lumpur
      ],
      onRender: (state) => {
        state.phi = currentPhi
        state.theta = currentTheta
        const [focusPhi, focusTheta] = focusRef.current
        const distPositive = (focusPhi - currentPhi + doublePi) % doublePi
        const distNegative = (currentPhi - focusPhi + doublePi) % doublePi
        // Control the speed
        if (distPositive < distNegative) {
          currentPhi += distPositive * 0.08
        } else {
          currentPhi -= distNegative * 0.08
        }
        currentTheta = currentTheta * 0.92 + focusTheta * 0.08
        state.width = width * 2
        state.height = width * 2
      },
    })
    setTimeout(() => (canvasRef.current.style.opacity = '1'))
    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-1 text-center">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-600/60 bg-clip-text text-center text-5xl font-semibold leading-[70px] text-transparent md:text-5xl md:leading-[70px] dark:from-white dark:to-gray-800/10">
          {CITIES[cityIndex].name}
        </span>
        <span className="text-xs text-slate-900/80 dark:text-gray-300/80">
          From {dayjs(CITIES[cityIndex].start_date).format('D MMM YYYY')} to{' '}
          {dayjs(CITIES[cityIndex].end_date).format('D MMM YYYY')}
        </span>
      </div>
      <div className="relative w-full">
        <div className="rounded-lg">
          <div
            style={{
              width: '100%',
              maxWidth: 500,
              aspectRatio: 1,
              margin: 'auto',
              position: 'relative',
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                contain: 'layout paint size',
                opacity: 0,
                transition: 'opacity 1s ease',
              }}
            />
          </div>
        </div>
        <button
          onClick={handlePreviousClick}
          type="button"
          className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/10 backdrop-blur-sm group-hover:bg-gray-800/20 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-800/30 dark:bg-white/30 dark:group-hover:bg-white/40 dark:group-focus:ring-white/50 md:dark:bg-gray-800/30 md:dark:group-hover:bg-gray-800/40 md:dark:group-focus:ring-gray-800/50">
            <svg
              className="h-4 w-4 text-white md:text-gray-800/80 rtl:rotate-180 dark:text-white/80"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          onClick={handleNextClick}
          type="button"
          className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/10 backdrop-blur-sm group-hover:bg-gray-800/20 group-focus:outline-none group-focus:ring-4 group-focus:ring-gray-800/30 dark:bg-white/30 dark:group-hover:bg-white/40 dark:group-focus:ring-white/50 md:dark:bg-gray-800/30 md:dark:group-hover:bg-gray-800/40 md:dark:group-focus:ring-gray-800/50">
            <svg
              className="h-4 w-4 text-white md:text-gray-800/80 rtl:rotate-180 dark:text-white/80"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  )
}
