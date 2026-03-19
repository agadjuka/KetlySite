const STORAGE_KEY = 'vyon_try_on_instructions_seen_session';

export function hasSeenTryOnInstructionsThisSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function markTryOnInstructionsSeenThisSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* private mode / quota */
  }
}
