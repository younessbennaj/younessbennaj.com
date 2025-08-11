import { useMemo } from 'react'
import { normalizeTags } from '@/lib/articleUtils'

export function useNormalizedTags(tags) {
  return useMemo(() => normalizeTags(tags), [tags])
}
