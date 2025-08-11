import { memo } from 'react'

const SHARE_LINKS = {
  linkedin: (url, title) =>
    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  twitter: (url, title) =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  facebook: (url) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
}

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    className: 'text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400',
    getUrl: SHARE_LINKS.linkedin,
  },
  {
    name: 'X',
    className: 'text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400',
    getUrl: SHARE_LINKS.twitter,
  },
  {
    name: 'Facebook',
    className: 'text-zinc-500 hover:text-blue-700 dark:hover:text-blue-500',
    getUrl: SHARE_LINKS.facebook,
  },
]

export const ShareLinks = memo(function ShareLinks({
  url,
  title,
  className = '',
}) {
  if (!url) return null

  return (
    <nav aria-label="Share links" className={`flex space-x-4 ${className}`}>
      {SOCIAL_LINKS.map(({ name, getUrl, className: linkClassName }) => (
        <a
          key={name}
          href={getUrl(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          className={linkClassName}
        >
          {name}
        </a>
      ))}
    </nav>
  )
})
