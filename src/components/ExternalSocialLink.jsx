import Link from 'next/link'

export function ExternalSocialLink({
  icon: Icon,
  href,
  target,
  rel,
  ...props
}) {
  // Handle external links
  if (target === '_blank' || href?.startsWith('http')) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="group -m-1 p-1"
        {...props}
      >
        <Icon />
      </a>
    )
  }

  // Handle internal links
  return (
    <Link className="group -m-1 p-1" href={href} {...props}>
      <Icon />
    </Link>
  )
}
