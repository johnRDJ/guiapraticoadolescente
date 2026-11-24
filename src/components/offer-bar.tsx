import { useEffect, useState } from "react";
import { OFFER_DURATION_MS, formatRemaining } from "@/lib/offer-countdown";

const KEY = "offer-deadline";

// Deadline is kept per browser session (sessionStorage): a new visit restarts at 15:00.
export function OfferBar() {
  const [label, setLabel] = useState("15:00");

  useEffect(() => {
    let deadline = Number(sessionStorage.getItem(KEY));
    if (!deadline) {
      deadline = Date.now() + OFFER_DURATION_MS;
      sessionStorage.setItem(KEY, String(deadline));
    }
    const tick = () => setLabel(formatRemaining(deadline, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="offer-bar" role="region" aria-label="Oferta por tempo limitado">
      <span className="offer-bar__text">🔥 OFERTA ESPECIAL POR TEMPO LIMITADO. TERMINA EM:</span>
      <span className="offer-bar__timer" aria-live="off">{label}</span>
    </div>
  );
}
