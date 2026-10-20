// Favourites are stored per year, taken from the program page's data-program-year.
const YEAR = document.querySelector<HTMLElement>('[data-program-year]')?.dataset.programYear ?? '';
const STORAGE_KEY = `offentlig-fagdag:favourites:${YEAR}`;
const FILTER_KEY = `offentlig-fagdag:filter:${YEAR}`;
const CHANGE_EVENT = 'favourites:change';

let memoryFallback: Set<string> | null = null;

function read(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.filter(v => typeof v === 'string') : []);
  } catch {
    return memoryFallback ? new Set(memoryFallback) : new Set();
  }
}

function write(set: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
    memoryFallback = null;
  } catch {
    memoryFallback = new Set(set);
  }
}

export function load(): string[] {
  return [...read()];
}

export function has(id: string): boolean {
  return read().has(id);
}

export function toggle(id: string): boolean {
  const set = read();
  const nowFavourited = !set.has(id);
  if (nowFavourited) set.add(id);
  else set.delete(id);
  write(set);
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { id, favourited: nowFavourited } }));
  return nowFavourited;
}

export function isFilterActive(): boolean {
  try {
    return localStorage.getItem(FILTER_KEY) === '1';
  } catch {
    return false;
  }
}

export function setFilterActive(active: boolean): void {
  try {
    if (active) localStorage.setItem(FILTER_KEY, '1');
    else localStorage.removeItem(FILTER_KEY);
  } catch {
    // no-op; filter state won't persist across reloads
  }
}

export const favouritesStorageKey = STORAGE_KEY;
export const filterStorageKey = FILTER_KEY;
export const favouritesChangeEvent = CHANGE_EVENT;
