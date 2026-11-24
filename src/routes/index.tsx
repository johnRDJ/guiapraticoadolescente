import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SalesFooter } from "@/components/sales-footer";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { GuidePreviewCarousel } from "@/components/guide-preview-carousel";
import { OfferBar } from "@/components/offer-bar";
import heroMockupAssetPointer from "@/assets/hero-mockup.webp";
const heroMockupAsset = heroMockupAssetPointer;
import authorPhotoPointer from "@/assets/autora-annie.webp";
const authorPhoto = authorPhotoPointer;
import bonus01AssetPointer from "@/assets/bonus-01-checklist.webp";
const bonus01Asset = bonus01AssetPointer;
import bonus02AssetPointer from "@/assets/bonus-02-estrategias.webp";
const bonus02Asset = bonus02AssetPointer;
import bonus03AssetPointer from "@/assets/bonus-03-mapa.webp";
const bonus03Asset = bonus03AssetPointer;
import bonus04AssetPointer from "@/assets/bonus-04-conceitualizacao.webp";
const bonus04Asset = bonus04AssetPointer;
import bonus05AssetPointer from "@/assets/bonus-05-ficha-registro.webp";
const bonus05Asset = bonus05AssetPointer;
// Checkout page of the offer (Cakto).
import { offerDetails, formatOfferPrice, offerItems, offerAssurances } from "@/lib/offer-details";
const checkoutUrl = offerDetails.checkoutUrl;
import { useEffect, useState, type SyntheticEvent } from "react";
import {
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  Compass,
  Gift,
  HeartHandshake,
  Lock,
  Search,
  ShieldCheck,
  Zap,
  ClipboardList,
} from "lucide-react";

const benefits = [
  { icon: Compass, title: "Entenda a dinâmica do atendimento com adolescentes", text: "Compreenda o que muda em relação ao atendimento de adultos, como funciona a dinâmica entre pais e adolescente e como estruturar os primeiros encontros, preservando o espaço de confiança do adolescente." },
  { icon: HeartHandshake, title: "Construa vínculo e favoreça a comunicação", text: "Aprenda a desenvolver uma relação de confiança com o adolescente e a abrir espaço para o diálogo, compreendendo o que pode estar por trás das dificuldades de comunicação." },
  { icon: Search, title: "Investigue as diferentes áreas da vida do adolescente", text: "Tenha clareza sobre o que observar e perguntar sobre emoções, família, escola, amizades, rotina e uso de telas, compreendendo como esses contextos podem influenciar seu comportamento e suas dificuldades." },
  { icon: ClipboardList, title: "Organize o caso e conduza as sessões com mais direção", text: "Aprenda a preparar os encontros, identificar o que precisa ser aprofundado e organizar as informações coletadas para transformar a queixa inicial em direção de investigação e próximos passos." },
];

export const bonuses = [
  { number: "01", title: "Checklist da Primeira Sessão com Adolescente", text: "Roteiro prático para imprimir ou ter na tela durante a primeira consulta, garantindo que nada essencial seja esquecido: acolhimento, combinados, sigilo, queixa, contexto e próximos passos.", value: "R$ 97,00", image: bonus01Asset, fallback: bonus01Asset, alt: "Mockup do Checklist da Primeira Sessão com Adolescente", tone: "sage" },
  { number: "02", title: "20 Estratégias para Quando o Adolescente Não Quer Falar", text: "Compilado de 20 perguntas, abordagens e frases para conduzir a conversa e favorecer o diálogo com o adolescente, sem forçar e sem deixar a sessão travar.", value: "R$ 37,00", image: bonus02Asset, fallback: bonus02Asset, alt: "Mockup das 20 Estratégias para Quando o Adolescente Não Quer Falar", tone: "blue" },
  { number: "03", title: "Mapa de Investigação do Adolescente", text: "Uma ferramenta visual para organizar as áreas relevantes da vida do adolescente (emoções, família, escola, amizades, rotina, saúde e interesses) e identificar o que já sabe e o que ainda precisa investigar.", value: "R$ 27,00", image: bonus03Asset, fallback: bonus03Asset, alt: "Mockup do Mapa de Investigação do Adolescente", tone: "gold" },
  { number: "04", title: "Modelo de Conceitualização do Adolescente", text: "Organize as informações coletadas e transforme dados soltos em uma visão estruturada do caso e das suas hipóteses de trabalho.", value: "R$ 36,00", image: bonus04Asset, fallback: bonus04Asset, alt: "Mockup do Modelo de Conceitualização do Adolescente", tone: "plum" },
  { number: "05", title: "Ficha de Registro de Sessão com Adolescente", text: "Registre cada sessão em 5 minutos, sem precisar reler tudo na semana seguinte. Ficha editável com o que observar, perguntar, considerar e o próximo passo, com exemplo preenchido e painel das 10 primeiras sessões.", value: "R$ 27,00", image: bonus05Asset, fallback: bonus05Asset, alt: "Mockup da Ficha de Registro de Sessão com Adolescente", tone: "sage" },
];

export const bonusTotal = "R$ 224,00";

const faqItems = [
  { question: "Este guia é indicado para quem nunca atendeu adolescentes?", answer: "Sim! O guia foi pensado para psicólogos e terapeutas que desejam começar a atender adolescentes com mais clareza e direcionamento. Ele reúne orientações e ferramentas práticas para ajudar a compreender o adolescente, estruturar os atendimentos, investigar diferentes áreas da sua vida e organizar o caso." },
  { question: "Já atendo adolescentes, mas me sinto inseguro(a). O guia é para mim?", answer: "Sim! Mesmo que você já tenha experiência atendendo adolescentes, o guia pode servir como um material de apoio para organizar sua investigação clínica, preparar os atendimentos, ampliar suas possibilidades de condução e consultar ferramentas práticas em diferentes situações do consultório." },
  { question: "O guia funciona para qualquer faixa etária e abordagem?", answer: "O material tem foco prático na condução do atendimento de adolescentes e pode ser adaptado ao seu raciocínio clínico e à sua abordagem. A aplicação depende sempre da avaliação individualizada de cada caso." },
  { question: "Como e quando recebo o guia, e por quanto tempo terei acesso?", answer: "O acesso é liberado imediatamente após a confirmação do pagamento. Você receberá o material em formato digital, por e-mail, e poderá acessá-lo para sempre, sem prazo de expiração." },
  { question: "Este produto substitui uma formação ou especialização em atendimento de adolescentes?", answer: "Não. Este é um guia prático de apoio, de caráter educacional. Ele não substitui formação profissional, especialização, supervisão clínica nem a avaliação individualizada de cada caso." },
];

function ProductImage({
  src,
  fallback,
  alt,
  className,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (!image.src.endsWith(fallback)) image.src = fallback;
  };

  return <img className={className} src={src} alt={alt} onError={handleError} width={720} height={720} loading="lazy" decoding="async" />;
}


export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Adolescente na Prática | Guia para psicólogos e terapeutas" },
    { name: "description", content: "Guia prático para psicólogos e terapeutas atenderem adolescentes: o que observar, perguntar e como conduzir as primeiras sessões. R$ 24,97 + 5 bônus." },
    { property: "og:title", content: "Adolescente na Prática | Guia para psicólogos e terapeutas" },
    { property: "og:description", content: "Saiba conduzir as primeiras sessões quando o adolescente fica em silêncio ou responde “não sei”. Guia digital + 4 ferramentas bônus." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Home,
});

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="landing-page">
      <OfferBar />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__glow hero__glow--one" aria-hidden="true" />
        <div className="hero__glow hero__glow--two" aria-hidden="true" />
        <div className="hero__content">
          <h1 id="hero-title">Guia prático para psicólogos e terapeutas <span>atenderem adolescentes</span></h1>
          <img className="hero__mockup" src={heroMockupAsset} width="500" height="500" alt="Livro do Guia Prático para Atender Adolescentes" fetchPriority="high" />
          <p className="hero__subtitle">
            Tenha mais clareza para estruturar os atendimentos, investigar diferentes áreas da vida do adolescente e conduzir a primeira sessão com mais segurança.
          </p>
          <div className="hero__actions">
            <a className="cta-button" href="#oferta">
              <span>QUERO GARANTIR MEU ACESSO</span>
            </a>
            <p className="hero__note"><Zap size={14} fill="currentColor" /> ACESSO IMEDIATO <span>+</span> <Gift size={14} /> BÔNUS GRATUITOS
            </p>
          </div>
        </div>
      </section>

      <section id="beneficios" className="section benefits-section" aria-labelledby="benefits-title">
        <div className="section-heading section-heading--lead">
          <h2 id="benefits-title">O que você irá receber ao garantir <span>seu guia</span></h2>
          <p>Um mapa prático para compreender o adolescente, organizar sua investigação clínica e conduzir os atendimentos com mais clareza e direcionamento.</p>
        </div>
        <div className="benefit-grid">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article className="benefit-card" key={title}>
              <div className={`benefit-icon benefit-icon--${index + 1}`}><Icon size={19} strokeWidth={1.7} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="guide-previews" role="group" aria-labelledby="guide-previews-title">
          <h3 id="guide-previews-title">Veja um pouco por dentro</h3>
          <p>Um material prático, feito para consultar durante a sessão, com fichas de trabalho para preencher ao longo dos atendimentos.</p>
          <GuidePreviewCarousel />
        </div>
        <div className="benefits-offer-action">
          <Button asChild className="cta-button section-offer-button">
            <a href="#oferta"><span>QUERO GARANTIR MEU ACESSO</span></a>
          </Button>
        </div>
      </section>


      <section id="bonos" className="section bonuses-section" aria-labelledby="bonuses-title">
        <div className="section-heading section-heading--tight">
          <span className="eyebrow eyebrow--accent"><Gift size={14} /> Bônus exclusivos</span>
          <h2 id="bonuses-title">Comprando hoje você ganha <span>5 bônus grátis</span></h2>
        </div>
        <div className="bonus-grid">
          {bonuses.map((bonus) => (
            <article className={`bonus-card bonus-card--${bonus.tone}${bonus.number === "05" ? " bonus-card--wide" : ""}`} key={bonus.number}>
              <div className="bonus-card__image-wrap">
                <ProductImage src={bonus.image} fallback={bonus.fallback} alt={bonus.alt} className="bonus-card__image" />
                {bonus.number === "02" && <span className="bonus-access-badge">ACESSO<br />IMEDIATO</span>}
                <span className="bonus-card__number">BÔNUS {bonus.number}</span>
              </div>
              <div className="bonus-card__body">
                <h3>{bonus.title}</h3>
                <p>{bonus.text}</p>
                <div className="bonus-card__value"><span>De</span><strong><s>{bonus.value}</s></strong><span className="bonus-included"><Check size={13} /> HOJE: GRÁTIS</span></div>
              </div>
            </article>
          ))}
        </div>
        <div className="bonuses-offer-action">
          <p>Total dos bônus: <s>{bonusTotal}</s></p>
          <Button asChild className="cta-button section-offer-button section-offer-button--bonuses">
            <a href="#oferta"><span>HOJE VOCÊ LEVA TUDO ISSO GRÁTIS</span></a>
          </Button>
        </div>
      </section>

      <section id="testimonios" className="section testimonials-section" aria-labelledby="testimonials-title">
        <div className="section-heading">
          <h2 id="testimonials-title">O que dizem os profissionais <span>que já utilizam o guia</span></h2>
          <p>Veja o depoimento de quem já adquiriu e aplicou as ferramentas práticas do guia.</p>
        </div>
        <TestimonialsCarousel />
      </section>

      <section id="oferta" className="dark-offer" aria-labelledby="offer-title">
        <div className="dark-offer__heading">
          <h2 id="offer-title">GARANTA JÁ O SEU!</h2>
          <p>INVESTIMENTO ÚNICO • ACESSO IMEDIATO</p>
        </div>
        <div className="dark-offer__card">
          <h3>GUIA PRÁTICO COMPLETO + 5 BÔNUS</h3>
          <img src={heroMockupAsset} alt="Livro do Guia Prático para Atender Adolescentes" className="dark-offer__mockup" width="500" height="500" loading="lazy" decoding="async" />
          <p className="dark-offer__old">De <s>R$ {formatOfferPrice(offerDetails.originalPrice)}</s> por apenas</p>
          <div className="dark-offer__price"><span>R$</span><strong>{formatOfferPrice(offerDetails.promotionalPrice)}</strong></div>
          <hr />
          <ul className="dark-offer__list">
            {offerItems.map((item) => <li key={item}><CircleCheck size={14} /> <span>{item}</span></li>)}
          </ul>
          <hr />
          <ul className="dark-offer__list dark-offer__list--bonus">
            {bonuses.map((bonus, i) => <li key={bonus.number}><Gift size={14} /> <span>BÔNUS {i + 1}: {bonus.title.toUpperCase()}</span></li>)}
          </ul>
          <hr />
          {/* UTMs are appended by the Utmify script; no duplicate handling here. */}
          <a className="cta-button dark-offer__cta" href={checkoutUrl} target="_blank" rel="noopener noreferrer"
            suppressHydrationWarning>
            <span>QUERO GARANTIR MEU ACESSO</span>
          </a>
          <p className="dark-offer__secure">
            <Lock size={11} />
            {offerAssurances.map((assurance, index) => (
              <span className={`dark-offer__secure-item${index > 0 ? " dark-offer__secure-item--sep" : ""}`} key={assurance}>{assurance}</span>
            ))}
          </p>
        </div>
      </section>

      <section id="autora" className="section author-section" aria-labelledby="author-title">
        <div className="author-layout">
          <div className="author-photo-wrap">
            <div className="author-photo-frame"><img src={authorPhoto} alt="Annie Vasconcelos, autora do guia" width={768} height={1152} loading="lazy" decoding="async" /></div>
            <span className="author-photo-accent" aria-hidden="true" />
          </div>
          <div className="author-copy">
            <span className="eyebrow">Quem criou este guia</span>
            <h2 id="author-title"><span>Annie Vasconcelos</span></h2>
            <p className="author-specialty">Psicóloga e autora do Adolescente na Prática.</p>
            <p>Este material nasceu da prática clínica com adolescentes e da percepção de uma dificuldade comum entre profissionais que atendem esse público: encontrar direcionamento para compreender melhor o adolescente, saber o que investigar e organizar a condução dos atendimentos.</p>
            <p>A proposta deste guia é transformar conceitos clínicos em <strong>ferramentas práticas</strong> que possam apoiar o profissional em diferentes etapas do atendimento, desde a investigação inicial até a organização do caso e o planejamento dos próximos passos.</p>
          </div>
        </div>
      </section>

      <section className="section guarantee-section" aria-label="Garantia da oferta">
        <div className="guarantee-card">
          <div className="guarantee-copy">
            <div className="guarantee-seal"><span>14</span><small>DIAS</small></div>
            <div className="guarantee-text">
              <h2>Garantia de 14 dias</h2>
              <p>Testou e não gostou? Devolvemos todo o seu dinheiro. Risco zero para você.</p>
            </div>
          </div>
          <div className="guarantee-side">
            <span className="guarantee-side-icon"><ShieldCheck size={26} /></span>
            <div className="guarantee-text">
              <h3>Ambiente seguro</h3>
              <p>Criptografia avançada e site protegido com tecnologia SSL de segurança bancária.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="perguntas" className="section faq-section" aria-labelledby="faq-title">
        <div className="section-heading section-heading--tight">
          <h2 id="faq-title">Dúvidas <span>frequentes</span></h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaq === index;
            const answerId = `faq-answer-${index}`;
            return (
              <article className={`faq-item${isOpen ? " faq-item--open" : ""}`} key={item.question}>
                <Button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span className="faq-question__icon"><CircleHelp size={18} /></span>
                  <span className="faq-question__text">{item.question}</span>
                  <ChevronDown className="faq-chevron" size={19} />
                </Button>
                {isOpen && <div className="faq-answer" id={answerId}><p>{item.answer}</p></div>}
              </article>
            );
          })}
        </div>
        <div className="faq-cta">
          <Button asChild className="cta-button"><a href="#oferta"><span>QUERO GARANTIR MEU ACESSO AGORA</span></a></Button>
        </div>
      </section>


      <SalesFooter />
    </main>
  );
}
