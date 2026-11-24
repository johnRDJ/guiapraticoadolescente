import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import firstPointer from "@/assets/depoimento_1.webp";
const first = firstPointer;
import secondPointer from "@/assets/depoimento_2.webp";
const second = secondPointer;
import thirdPointer from "@/assets/depoimento_3.webp";
const third = thirdPointer;
import fourthPointer from "@/assets/depoimento_4.webp";
const fourth = fourthPointer;

export const TESTIMONIAL_INTERVAL_MS = 3000;
export const TESTIMONIAL_RESUME_DELAY_MS = 4000;
const screenshots = [
  { image: first, name: "Mariana", height: 1154 },
  { image: second, name: "Beatriz", height: 1155 },
  { image: third, name: "Juliana", height: 1162 },
  { image: fourth, name: "Rafaela", height: 1154 },
];

export function TestimonialsCarousel() {
  const [viewportRef, api] = useEmblaCarousel({ loop: true, align: "center", duration: 30, watchDrag: true });
  const regionRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const pauseTemporarily = () => {
    setPaused(true);
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimerRef.current = null;
    }, TESTIMONIAL_RESUME_DELAY_MS);
  };

  useEffect(() => () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  }, []);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), { threshold: 0.25 });
    observer.observe(region);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect).on("reInit", onSelect);
    return () => {
      api.off("select", onSelect).off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || reducedMotion || !inView || !pageVisible) return;
    const timer = window.setInterval(() => api.scrollNext(), TESTIMONIAL_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [api, paused, reducedMotion, inView, pageVisible]);

  return (
    <div ref={regionRef} className="testimonial-carousel" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de profissionais"
      onPointerDown={pauseTemporarily} onFocusCapture={pauseTemporarily}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        pauseTemporarily();
        if (event.key === "ArrowLeft") api?.scrollPrev(reducedMotion);
        else api?.scrollNext(reducedMotion);
      }}>
      <div className="testimonial-carousel__row">
        <div className="testimonial-carousel__viewport" ref={viewportRef}>
          <div className="testimonial-carousel__track">
            {screenshots.map(({ image, name, height }, index) => (
              <div className="testimonial-carousel__slide" key={image} role="group" aria-roledescription="slide" aria-label={`${index + 1} de 4`} aria-hidden={index !== selected}>
                <img className="testimonial-image" src={image} alt={`Print original do depoimento de ${name} no WhatsApp`} width={650} height={height} loading="lazy" decoding="async" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">Depoimento {selected + 1} de 4</span>
    </div>
  );
}