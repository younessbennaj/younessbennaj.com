export const READING_WORDS_PER_MINUTE = 200

export function calculateReadingTime(text) {
  if (!text) return 0
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / READING_WORDS_PER_MINUTE))
}

export function slugify(text) {
  return (text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w]+/g, '-')
}

export function tagSlug(text) {
  return slugify(text)
}

export function normalizeTag(tag) {
  if (typeof tag === 'string') {
    return { label: tag, value: tagSlug(tag) }
  }
  return {
    label: tag.label,
    value: tag.value ?? tagSlug(tag.label),
  }
}

export function normalizeTags(tags) {
  if (!Array.isArray(tags)) return []
  return tags.map(normalizeTag)
}
