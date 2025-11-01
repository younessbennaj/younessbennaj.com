import Image from 'next/image'

export function ArticleImage({
  src,
  redirectUrl,
  redirectDescription,
  alt,
  description,
}) {
  return (
    <>
      <Image src={src} alt={alt} className="mb-2" />
      <figcaption className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        {description}{' '}
        <a
          className="m-0 text-blue-500 hover:underline"
          href={redirectUrl}
          target="_blank"
        >
          {redirectDescription}
        </a>
      </figcaption>
    </>
  )
}
