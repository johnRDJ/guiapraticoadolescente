import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { advanceCycleEnd, CYCLE_END_KEY, formatRemaining, getCountdownStorage, loadCycleEnd, persistCycleEnd, remainingUntil } from "@/lib/offer-countdown";

// Cyclic countdown: starts at 11:00:00, ticks down every second and restarts at 00:00:00.
// Restore the persisted deadline before displaying any time, avoiding a false 11-hour reset.
export function OfferBar() {
  const [label, setLabel] = useState("--:--:--");

  useEffect(() => {
    const storage = getCountdownStorage();
    let cycleEnd = loadCycleEnd(Date.now(), storage);
    const tick = () => {
      const now = Date.now();
      const nextEnd = advanceCycleEnd(cycleEnd, now);
      if (nextEnd !== cycleEnd) {
        cycleEnd = nextEnd;
        persistCycleEnd(cycleEnd, storage);
      }
      setLabel(formatRemaining(remainingUntil(cycleEnd, now)));
    };
    const sync = () => {
      if (storage) cycleEnd = loadCycleEnd(Date.now(), storage);
      tick();
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === CYCLE_END_KEY) sync();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="offer-bar" role="region" aria-label="Oferta por tempo limitado">
      <span className="offer-bar__lead">
        <span className="offer-bar__dot" aria-hidden="true" />
        <Zap className="offer-bar__bolt" aria-hidden="true" fill="currentColor" strokeWidth={1.5} />
        <span className="offer-bar__text">A oferta acaba hoje em:</span>
      </span>
      <span className="offer-bar__timer" aria-live="off" aria-label={label}>
        {label.split(":").map((part, i) => (
          <span key={i} className="offer-bar__group">
            {i > 0 && <span className="offer-bar__sep" aria-hidden="true">:</span>}
            <span className="offer-bar__num">{part}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
