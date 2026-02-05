import "../../SASS/layouts/footer.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer-cta">
        <h3>🌍 Prêt pour l'aventure ?</h3>
        <p>Découvrez nos destinations de rêve à travers le monde</p>
        <Link to="/destinations" className="cta-button">
          Découvrir nos destinations
        </Link>
      </div>

      {/* Footer Content - 3 Columns */}
      <div className="footer-content">
        {/* Column 1: Navigation */}
        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/infrance">Voyages en France</Link></li>
            <li><Link to="/about">À propos</Link></li>
          </ul>
        </div>

        {/* Column 2: Legal */}
        <div className="footer-column">
          <h4>Légal</h4>
          <ul>
            <li><a href="#mentions">Mentions légales</a></li>
            <li><a href="#cgv">Conditions générales</a></li>
            <li><a href="#confidentialite">Politique de confidentialité</a></li>
            <li><a href="#cookies">Gestion des cookies</a></li>
            <li><a href="#sitemap">Plan du site</a></li>
          </ul>
        </div>

        {/* Column 3: Follow Us */}
        <div className="footer-column">
          <h4>Suivez-nous</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:contact@reve-exploration.fr">contact@reve-exploration.fr</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {currentYear} Rêve d'Exploration. Tous droits réservés.</p>
      </div>
    </footer>
  );
}   

export default Footer;