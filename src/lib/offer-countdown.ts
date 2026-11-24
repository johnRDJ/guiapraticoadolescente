export const OFFER_DURATION_MS = 15 * 60 * 1000;

// Remaining time clamped to [0, duration], formatted as MM:SS.
export function formatRemaining(deadline: number, now: number): string {
  const ms = Math.min(Math.max(deadline - now, 0), OFFER_DURATION_MS);
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
