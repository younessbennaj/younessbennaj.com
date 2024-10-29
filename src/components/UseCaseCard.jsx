import Image from 'next/image'

export const UseCaseCard = ({ image, title, tags }) => {
  return (
    <div className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer dark:bg-zinc-900">
      <Image
        src={image}
        alt={title}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="flex flex-wrap space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="focus:ring-ring text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-md border border-transparent bg-zinc-300 px-1 py-0 text-[10px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
