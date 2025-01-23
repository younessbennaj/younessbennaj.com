'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from './Button'
import { ArrowLeft, ArrowRight } from 'react-feather'

function ImageCarousel({ images }) {
  const containerRef = useRef(null)
  const imagesRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(null)

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
  }

  function handlePreviousClick() {
    imagesRef.current.scrollBy({
      left: -containerWidth,
      behavior: 'smooth',
    })
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

      <Button
        variant="ghost"
        className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-[40px] bg-zinc-100 group-hover:bg-zinc-400/80"
        onClick={handlePreviousClick}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-[40px] bg-zinc-100 group-hover:bg-zinc-400/80"
        onClick={handleNextClick}
      >
        <ArrowRight />
      </Button>
    </div>
  )
}

export function ProjectCard({ title, description, status, image, href }) {
  let statusWord = ''
  switch (status) {
    case 'in_progress':
      statusWord = 'In progress'
      break
    case 'completed':
      statusWord = 'Completed'
      break
    case 'coming_soon':
      statusWord = 'Coming soon'
      break
    default:
      statusWord = ''
  }
  return (
    <div
      className="relative col-span-2 md:col-span-1"
      // href={href ? href : '#'}
      // target={href ? '_blank' : '_self'}x
    >
      <div>
        <div className="relative rounded-lg">
          {/* <Chips
            type={
              status === 'coming_soon'
                ? 'info'
                : status === 'in_progress'
                  ? 'warning'
                  : 'success'
            }
          >
            {statusWord}
          </Chips> */}
          {status === 'coming_soon' && (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 rounded-lg bg-white/30 backdrop-blur-sm"></div>
          )}
          {/* <Image className="z-0 rounded-lg" alt={description} src={image} />
           */}
          <ImageCarousel
            images={[
              {
                src: image,
                alt: description,
              },
              {
                src: image,
                alt: description,
              },
              {
                src: image,
                alt: description,
              },
            ]}
          />
        </div>
        <h4 className="mt-3 text-lg font-semibold">{title}</h4>
        <p className="text-xs leading-4 text-zinc-400">{description}</p>
      </div>
    </div>
  )
}
