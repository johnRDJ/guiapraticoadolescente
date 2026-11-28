// The deadline, rather than the displayed seconds, is persisted per browser.
export const CYCLE_MS = 11 * 60 * 60 * 1000;
export const CYCLE_END_KEY = "offer-cycle-end";
const LEGACY_START_KEY = "offer-cycle-start";

export type CountdownStorage = Pick<Storage, "getItem" | "setItem">;

function readTimestamp(storage: CountdownStorage | null, key: string): number | null {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return null;
    const value = Number(raw);
    return Number.isSafeInteger(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

// Advance from the previous deadline, preserving elapsed time even across many cycles.
export function advanceCycleEnd(cycleEnd: number, now: number): number {
  if (now < cycleEnd) return cycleEnd;
  return cycleEnd + (Math.floor((now - cycleEnd) / CYCLE_MS) + 1) * CYCLE_MS;
}

export function persistCycleEnd(cycleEnd: number, storage: CountdownStorage | null): void {
  try {
    storage?.setItem(CYCLE_END_KEY, String(cycleEnd));
  } catch {
    // With browser storage blocked, this page can count down but cannot persist a reload.
  }
}

export function loadCycleEnd(now: number, storage: CountdownStorage | null): number {
  const storedEnd = readTimestamp(storage, CYCLE_END_KEY);
  const legacyStart = storedEnd === null ? readTimestamp(storage, LEGACY_START_KEY) : null;
  const previousEnd = storedEnd ?? (legacyStart === null ? now + CYCLE_MS : legacyStart + CYCLE_MS);
  const cycleEnd = advanceCycleEnd(previousEnd, now);
  if (storedEnd !== cycleEnd) persistCycleEnd(cycleEnd, storage);
  return cycleEnd;
}

export function remainingUntil(cycleEnd: number, now: number): number {
  return Math.min(CYCLE_MS, Math.max(0, cycleEnd - now));
}

// HH:MM:SS with leading zeros. The final second before the restart shows 00:00:00.
export function formatRemaining(ms: number): string {
  const total = Math.min(Math.max(Math.floor(ms / 1000), 0), CYCLE_MS / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

// Called only after hydration; access to storage itself may throw in restricted browsers.
export function getCountdownStorage(): CountdownStorage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
