'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from './Button'
import { ArrowLeft, ArrowRight } from 'react-feather'

export function ImageCarousel({ images }) {
  const containerRef = useRef(null)
  const imagesRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  let previousDisabled = images.length <= 1 || currentIndex === 0
  let nextDisabled = images.length <= 1 || currentIndex === images.length - 1

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }

    handleResize() // Définir la largeur initiale
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleNextClick() {
    imagesRef.current.scrollBy({
      left: containerWidth,
      behavior: 'smooth',
    })
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1))
  }

  function handlePreviousClick() {
    imagesRef.current.scrollBy({
      left: -containerWidth,
      behavior: 'smooth',
    })
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <div
      ref={containerRef}
      className="group relative w-full overflow-hidden rounded-lg"
    >
      <div
        ref={imagesRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
      >
        {images.map((image, index) => (
          <Image
            style={{
              maxWidth: containerWidth ? `${containerWidth}px` : '100%',
              minWidth: containerWidth ? `${containerWidth}px` : '100%',
            }}
            className="w-full snap-center object-cover"
            key={image.src + index}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>

      {!previousDisabled && (
        <Button
          variant="ghost"
          className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-[40px] bg-zinc-100 group-hover:bg-zinc-400/80"
          onClick={handlePreviousClick}
        >
          <ArrowLeft />
        </Button>
      )}
      {!nextDisabled && (
        <Button
          disabled={nextDisabled}
          variant="ghost"
          className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-[40px] bg-zinc-100 group-hover:bg-zinc-400/80"
          onClick={handleNextClick}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  )
}
