// Simple utility function for className merging (no external dependencies)
export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
}

// Type definition for compatibility
export type ClassValue = 
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[]
