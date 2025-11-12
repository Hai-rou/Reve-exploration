import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import "../SASS/pages/homeintro.scss";

interface HomeintroProps {
  onEnter: () => void;
}

function Homeintro({ onEnter }: HomeintroProps) {
  const topEnvRef = useRef<HTMLDivElement>(null);
  const enveDetailRef = useRef<HTMLDivElement>(null);
  const faceOneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation d'entrée des cartes
    const tl = gsap.timeline();
    
    tl.fromTo([faceOneRef.current, ".face-two"], 
      { 
        y: 100, 
        opacity: 0,
        rotateY: -15
      },
      { 
        y: 0, 
        opacity: 1,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3
      }
    );
  }, []);

  const handleEnvelopeClick = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Délai avant d'entrer sur le site
        setTimeout(() => {
          onEnter();
        }, 300);
      }
    });

    // Animation d'ouverture de l'enveloppe plus fluide
    tl.to(topEnvRef.current, {
      rotateX: 140,
      transformOrigin: "top center",
      duration: 1.2,
      ease: "back.out(1.2)"
    })
    .to(enveDetailRef.current, {
      y: -30,
      scale: 1.08,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    }, "-=0.8")
    .to(".face-one", {
      rotateY: 25,
      scale: 0.92,
      duration: 1,
      ease: "power3.out"
    }, "-=1")
    .to([".face-one", ".face-two"], {
      y: -100,
      opacity: 0,
      scale: 0.6,
      rotateY: 45,
      duration: 1.2,
      ease: "power4.inOut",
      stagger: 0.15
    }, "+=0.2");
  };

  return (
    <div className="home-intro">
      <div className="face-one" ref={faceOneRef}>
        <img src="/logo-removebg-preview.webp" alt="Logo de l'entreprise" />
        <p>Carnet de voyage personnalisé</p>
        <div className="bottom-env"></div>
      </div>
      
      <div className="face-two" onClick={handleEnvelopeClick}>
        <div className="top-env" ref={topEnvRef}>
          <span className='entree'>Voyagez avec nous</span>
        </div>
        <div className="enve-detail" ref={enveDetailRef}>
          <p>contact@reves-exploration.com</p>
          <p>06 70 80 60 20</p>
          <p className="enve-info">
            <span>Rêves d'exploration</span> - voyage sur mesure, créé pour vous
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homeintro;



