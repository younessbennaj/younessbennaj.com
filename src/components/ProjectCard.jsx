import Image from 'next/image'
import { Chips } from '@/components/Chips'

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
    <a
      className="relative col-span-2 md:col-span-1"
      href={href ? href : '#'}
      target={href ? '_blank' : '_self'}
    >
      <div>
        <div className="relative rounded-lg">
          <Chips
            type={
              status === 'coming_soon'
                ? 'info'
                : status === 'in_progress'
                  ? 'warning'
                  : 'success'
            }
          >
            {statusWord}
          </Chips>
          {status === 'coming_soon' && (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-10 rounded-lg bg-white/30 backdrop-blur-sm"></div>
          )}
          <Image className="z-0 rounded-lg" alt={description} src={image} />
        </div>
        <h4 className="mt-3 text-lg font-semibold">{title}</h4>
        <p className="text-xs leading-4 text-zinc-400">{description}</p>
      </div>
    </a>
  )
}
