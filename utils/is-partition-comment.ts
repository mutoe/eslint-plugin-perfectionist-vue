
import { matches } from './matches'

export let isPartitionComment = (
  partitionComment: string[] | boolean | string,
  comment: string,
  matcher: 'minimatch' | 'regex',
) =>
  (Array.isArray(partitionComment) &&
    partitionComment.some(pattern =>
      matches(comment.trim(), pattern, matcher),
    )) ||
  (typeof partitionComment === 'string' &&
    matches(comment.trim(), partitionComment, matcher)) ||
  partitionComment === true
