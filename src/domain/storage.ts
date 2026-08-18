import { createDemoStore } from '../crm/seed'
import type { CrmStore } from './types'

export const STORAGE_KEY = 'fof-crm:v1'

function isStore(value: unknown): value is CrmStore {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<CrmStore>
  return candidate.version === 1 && Array.isArray(candidate.members) && Array.isArray(candidate.activities) && Array.isArray(candidate.owners)
}

export function loadStore(): CrmStore {
  if (typeof window === 'undefined') return createDemoStore()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isStore(parsed)) return parsed
    }
  } catch {
    // Fall back to a fresh demo store when storage is unavailable or corrupt.
  }
  return createDemoStore()
}

export function saveStore(store: CrmStore): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function resetStore(): CrmStore {
  const store = createDemoStore()
  saveStore(store)
  return store
}
