// app/lib/clipboard.ts v6.2.0

/**
 * Fallback copy-to-clipboard using deprecated execCommand.
 * Used when navigator.clipboard is unavailable (older browsers, non-HTTPS).
 */
export function fallbackCopy(text: string): boolean {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'absolute'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    return true
  } catch {
    return false
  }
}

/**
 * Copy text to clipboard with fallback support.
 * Returns true if successful.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Fall through to fallback
  }
  return fallbackCopy(text)
}
