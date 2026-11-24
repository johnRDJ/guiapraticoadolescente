import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import page17ImagePointer from "@/assets/guia-previa-17.webp";
const page17Image = page17ImagePointer;
import page9ImagePointer from "@/assets/guia-previa-9.webp";
const page9Image = page9ImagePointer;
import page5ImagePointer from "@/assets/guia-previa-5.webp";
const page5Image = page5ImagePointer;
import page19ImagePointer from "@/assets/guia-previa-19.webp";
const page19Image = page19ImagePointer;

const pages = [
  { page: 5, caption: "A primeira sessão", width: 1055, height: 1491, src: page5Image },
  { page: 17, caption: "Da queixa à direção de investigação", width: 1357, height: 1920, src: page17Image },
  { page: 19, caption: "Organização do caso", width: 1024, height: 1536, src: page19Image },
  { page: 9, caption: "Quando ele responde ‘não sei’", width: 1024, height: 1536, src: page9Image },
];

export function GuidePreviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const next = (i + pages.length) % pages.length;
    const track = trackRef.current;
    if (track) track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className="guide-carousel" aria-roledescription="carrossel">
      <div className="guide-carousel__stage">
        <button type="button" className="guide-carousel__arrow" aria-label="Página anterior" onClick={() => goTo(index - 1)}>
          <ChevronLeft size={18} />
        </button>
        <div className="guide-carousel__track" ref={trackRef} onScroll={onScroll}>
          {pages.map(({ page, caption, width, height, src }, i) => (
            <figure className="guide-carousel__slide" key={page}>
              <img src={src} alt={`Página ${page} do guia Adolescente na Prática: ${caption}`} width={width} height={height} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
            </figure>
          ))}
        </div>
        <button type="button" className="guide-carousel__arrow" aria-label="Próxima página" onClick={() => goTo(index + 1)}>
          <ChevronRight size={18} />
        </button>
      </div>
      <p className="guide-carousel__caption">{pages[index]?.caption}</p>
      <div className="guide-carousel__dots">
        {pages.map((p, i) => (
          <button type="button" key={p.page} aria-label={`Ver página ${p.page}`} aria-current={i === index} className={i === index ? "is-active" : ""} onClick={() => goTo(i)} />
        ))}
      </div>
    </div>
  );
}
