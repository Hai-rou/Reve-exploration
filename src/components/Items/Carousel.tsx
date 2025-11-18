import { useEffect, useMemo, useRef, useState } from "react";

export type CarouselSlide = {
  image: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  href?: string;
};

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayMs?: number;
  className?: string;
}

function Carousel({ slides, autoPlayMs = 6000, className = "" }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const last = safeSlides.length - 1;

  useEffect(() => {
    if (safeSlides.length <= 1 || autoPlayMs <= 0) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i >= last ? 0 : i + 1));
    }, autoPlayMs);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [autoPlayMs, last, safeSlides.length]);

  if (safeSlides.length === 0) return null;
  const go = (i: number) => setIndex(() => (i < 0 ? last : i > last ? 0 : i));

  return (
    <div className={`carousel ${className}`} aria-roledescription="carousel">
      <div className="carousel-viewport">
        {safeSlides.map((s, i) => (
          <figure
            key={i}
            className={`slide ${i === index ? "active" : ""}`}
            aria-hidden={i !== index}
          >
            <img src={s.image} alt={s.title} />
            <figcaption className="slide-caption">
              <span className="badge">Voyage signature</span>
              <h3>{s.title}</h3>
              {s.subtitle && <p>{s.subtitle}</p>}
              {s.href && (
                <a className="btn-primary" href={s.href} aria-label={`Ouvrir: ${s.title}`}>
                  {s.ctaLabel || "Découvrir"}
                </a>
              )}
            </figcaption>
          </figure>
        ))}
        <button className="nav prev" aria-label="Slide précédente" onClick={() => go(index - 1)}>‹</button>
        <button className="nav next" aria-label="Slide suivante" onClick={() => go(index + 1)}>›</button>
      </div>
      <div className="dots" role="tablist" aria-label="Sélection de slide">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => go(i)}
            aria-label={`Aller au slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
