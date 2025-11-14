import { useEffect, useRef } from "react";
import "../../SASS/items/banner.scss";

function Banner() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Fonction pour tracker tous les timeouts
  const addTimeout = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Fonction pour annuler tous les timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Définir les paires de mots avec leur lettre pivot
    const wordPairs = [
      { word1: "IRLANDE", word2: "PARIS", pivotLetter: "R" },
      { word1: "PARIS", word2: "ROME", pivotLetter: "R" },
      { word1: "ROME", word2: "MAROC", pivotLetter: "R" },
      { word1: "MAROC", word2: "NEW YORK", pivotLetter: "R" },
    ];
    
    let currentPairIndex = 0;

    function createParticles(x: number, y: number) {
      if (!stage) return;
      const container = stage.querySelector('.particles');
      if (!container) return;
      
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        const angle = (Math.PI * 2 * i) / 15;
        const distance = 50 + Math.random() * 50;
        particle.style.setProperty('--px', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--py', Math.sin(angle) * distance + 'px');
        container.appendChild(particle);
        
        addTimeout(() => particle.classList.add('active'), 10);
        addTimeout(() => particle.remove(), 1500);
      }
    }

    function startAnimation() {
      if (!stage) return;
      
      // Récupérer la paire de mots actuelle
      const currentPair = wordPairs[currentPairIndex];
      const word1 = currentPair.word1;
      const word2 = currentPair.word2;
      const pivotLetter = currentPair.pivotLetter;
      const pivotIndex1 = word1.indexOf(pivotLetter);
      const pivotIndex2 = word2.indexOf(pivotLetter);
      
      // Passer à la paire suivante pour la prochaine animation
      currentPairIndex = (currentPairIndex + 1) % wordPairs.length;
      
      // NETTOYER COMPLÈTEMENT : annuler tous les timeouts en cours
      clearAllTimeouts();
      
      // Supprimer tous les éléments du stage
      while (stage.firstChild) {
        stage.removeChild(stage.firstChild);
      }
      
      // Attendre un frame pour que le DOM soit propre
      requestAnimationFrame(() => {
        // Recréer le conteneur de particules
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        stage.appendChild(particlesContainer);

        const letters: HTMLDivElement[] = [];
        const startX = -((word1.length - 1) * 40);

        console.log('Création des lettres pour:', word1);

        // Créer TOUTES les lettres d'abord
        for (let i = 0; i < word1.length; i++) {
          const letter = document.createElement('div');
          letter.className = 'letter';
          const char = word1.charAt(i);
          
          letter.textContent = char;
          
          // BLOQUER LA TRADUCTION AUTOMATIQUE
          letter.setAttribute('translate', 'no');
          letter.setAttribute('data-letter', char);
          letter.setAttribute('data-index', i.toString());
          letter.style.left = (startX + i * 80) + 'px';
          letter.style.opacity = '0';
          stage.appendChild(letter);
          letters.push(letter);
        }
        
        // Attendre que le DOM soit stable
        requestAnimationFrame(() => {
          // Puis les animer en utilisant l'index du tableau letters
          for (let i = 0; i < letters.length; i++) {
            const index = i;
            const letterElement = letters[i];
            
            addTimeout(() => {
              letterElement.style.opacity = '1';
            }, index * 100);
          }
        });

        // Phase 1: Explosion
        addTimeout(() => {
          letters.forEach((letter, i) => {
            if (i !== pivotIndex1) {
              const angle = ((i - pivotIndex1) / word1.length) * Math.PI * 2;
              const distance = 200;
              letter.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
              letter.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
              letter.style.setProperty('--rotation', (Math.random() - 0.5) * 720 + 'deg');
              letter.classList.add('explode');
            }
          });

          // La lettre pivot reste et tourne
          letters[pivotIndex1].classList.add('pivot');
          createParticles(300, 150);
        }, word1.length * 100 + 500);

        // Phase 2: Apparition du nouveau mot
        addTimeout(() => {
          letters.forEach((l, i) => {
            if (i !== pivotIndex1) {
              l.remove();
            }
          });

          const newStartX = -((word2.length - 1) * 40);
          
          console.log('Création des lettres pour:', word2);
          
          for (let i = 0; i < word2.length; i++) {
            if (i === pivotIndex2) continue; // La lettre pivot reste
            
            const letter = document.createElement('div');
            letter.className = 'letter morph';
            const char = word2.charAt(i);
            letter.textContent = char;
            letter.setAttribute('translate', 'no'); // Bloquer la traduction
            letter.style.left = (newStartX + i * 80) + 'px';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 300;
            letter.style.setProperty('--from-x', Math.cos(angle) * distance + 'px');
            letter.style.setProperty('--from-y', Math.sin(angle) * distance + 'px');
            letter.style.animationDelay = (i * 0.1) + 's';
            
            stage.appendChild(letter);
          }

          // Repositionner la lettre pivot
          const pivotLetter = letters[pivotIndex1];
          pivotLetter.style.transition = 'all 1s ease';
          pivotLetter.style.left = (newStartX + pivotIndex2 * 80) + 'px';
          
          addTimeout(() => {
            pivotLetter.classList.remove('pivot');
          }, 500);

          // Relancer l'animation
          addTimeout(() => {
            startAnimation();
          }, 2500);
        }, 2500);
      }); // Fin du requestAnimationFrame
    }

    // Démarrer l'animation
    addTimeout(() => startAnimation(), 300);

    // Cleanup
    return () => {
      clearAllTimeouts();
      if (stage) stage.innerHTML = '';
    };
  }, []);

  return (
    <div className="banner">
      <div className="container">
        <div className="word-stage" ref={stageRef}>
          <div className="particles"></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;