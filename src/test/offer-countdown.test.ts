import { describe, expect, it } from "vitest";
import { advanceCycleEnd, CYCLE_END_KEY, CYCLE_MS, formatRemaining, loadCycleEnd, remainingUntil, type CountdownStorage } from "../lib/offer-countdown";

function makeStorage(entries: Record<string, string> = {}): CountdownStorage {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value); },
  };
}

describe("Persistent 11-hour countdown", () => {
  const start = 1_700_000_000_000;
  const end = start + 39_600_000;

  it("starts and stores an exact 11-hour deadline if no cycle exists", () => {
    const storage = makeStorage();
    expect(CYCLE_MS).toBe(39_600_000);
    expect(loadCycleEnd(start, storage)).toBe(end);
    expect(storage.getItem(CYCLE_END_KEY)).toBe(String(end));
    expect(formatRemaining(remainingUntil(end, start))).toBe("11:00:00");
  });

  it("decreases second by second", () => {
    expect(formatRemaining(remainingUntil(end, start + 1000))).toBe("10:59:59");
    expect(formatRemaining(remainingUntil(end, start + 2000))).toBe("10:59:58");
  });

  it("restores the same deadline after a reload without resetting", () => {
    const storage = makeStorage();
    loadCycleEnd(start, storage);
    const restored = loadCycleEnd(start + 60_000, storage);
    expect(restored).toBe(end);
    expect(formatRemaining(remainingUntil(restored, start + 60_000))).toBe("10:59:00");
  });

  it("includes time spent with the browser closed", () => {
    const storage = makeStorage({ [CYCLE_END_KEY]: String(end) });
    const returned = start + 7_200_000;
    expect(loadCycleEnd(returned, storage)).toBe(end);
    expect(formatRemaining(remainingUntil(end, returned))).toBe("09:00:00");
  });

  it("shows zero in the final second and automatically persists the next 11-hour cycle", () => {
    const storage = makeStorage({ [CYCLE_END_KEY]: String(end) });
    expect(formatRemaining(remainingUntil(end, end - 500))).toBe("00:00:00");
    const nextEnd = loadCycleEnd(end, storage);
    expect(nextEnd).toBe(end + 39_600_000);
    expect(storage.getItem(CYCLE_END_KEY)).toBe(String(nextEnd));
    expect(formatRemaining(remainingUntil(nextEnd, end))).toBe("11:00:00");
  });

  it("preserves elapsed offline time over multiple expired cycles", () => {
    const storage = makeStorage({ [CYCLE_END_KEY]: String(end) });
    const returned = end + 39_600_000 * 2 + 7_200_000;
    const nextEnd = loadCycleEnd(returned, storage);
    expect(nextEnd).toBe(end + 39_600_000 * 3);
    expect(formatRemaining(remainingUntil(nextEnd, returned))).toBe("09:00:00");
    expect(loadCycleEnd(returned + 1000, storage)).toBe(nextEnd);
  });

  it("migrates existing visitors without restarting their previous cycle", () => {
    const storage = makeStorage({ "offer-cycle-start": String(start) });
    expect(loadCycleEnd(start + 6_715_000, storage)).toBe(end);
    expect(storage.getItem(CYCLE_END_KEY)).toBe(String(end));
    expect(formatRemaining(remainingUntil(end, start + 6_715_000))).toBe("09:08:05");
  });

  it("prefers an existing deadline over the legacy start", () => {
    const storage = makeStorage({ [CYCLE_END_KEY]: String(end), "offer-cycle-start": String(start + 1000) });
    expect(loadCycleEnd(start + 2000, storage)).toBe(end);
  });

  it("replaces an invalid timestamp with a valid new cycle", () => {
    const storage = makeStorage({ [CYCLE_END_KEY]: "NaN" });
    expect(loadCycleEnd(start, storage)).toBe(end);
    expect(storage.getItem(CYCLE_END_KEY)).toBe(String(end));
  });

  it("continues the current page countdown when storage is blocked", () => {
    const storage = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(loadCycleEnd(start, storage)).toBe(end);
    expect(formatRemaining(remainingUntil(end, start + 1000))).toBe("10:59:59");
  });

  it("keeps the deadline unchanged if the system clock moves backwards", () => {
    expect(advanceCycleEnd(end, start - 5000)).toBe(end);
    expect(formatRemaining(remainingUntil(end, start - 5000))).toBe("11:00:00");
  });
});