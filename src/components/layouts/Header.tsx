import "../../SASS/layouts/header.scss"
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>Rêves D'Exploration</h1>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">À Propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;