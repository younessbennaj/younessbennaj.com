import { ImageCarousel } from './ImageCarousel'
import { Button } from './Button'
import { ArrowRight } from 'react-feather'
import { Chips } from './Chips'

export function ProjectCard({
  title,
  description,
  status,
  images,
  githubLink,
  liveLink,
}) {
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
    <div className="relative col-span-2 md:col-span-1">
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
          <ImageCarousel images={images} />
        </div>
        <h4 className="mt-3 text-lg font-semibold">{title}</h4>
        <p className="text-xs leading-4 text-zinc-400">{description}</p>
        {githubLink && liveLink && (
          <div className="mt-4 flex gap-4">
            <Button variant="secondary" href={githubLink} target="_blank">
              Github <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" href={liveLink} target="_blank">
              Live <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
