import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHome, faMap, faPlane, faCar, faUmbrella, faCheckCircle, faShop, faHand, faFile, faCheckDouble, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import Testimonials from '../components/Items/Testimonials';
import "../SASS/pages/services.scss";
import "../SASS/components/testimonials.scss";

function Services() {
  return (
        <div className="services">
            <div className='detail'>
                <h2 className='subtitle'>Comment ça marche</h2>
                <div className='steps'>
                    <div className='step'>
                        <FontAwesomeIcon icon={faHome} size="4x" />
                        <p>Je viens à votre domicile ou nous échangeons en visio</p>
                    </div>
                    <div className='step'>
                        <FontAwesomeIcon icon={faGlobe} size="4x" />
                        <p>Je crée un voyage 100% personnalisé</p>
                    </div>
                    <div className='step'>
                        <FontAwesomeIcon icon={faMap} size="4x" />
                        <p>Vous partez l'esprit tranquille. Un carnet de voyage en main.</p>
                    </div>
                </div>
            </div>
            <div className='items-services'>
                <h2 className='subtitle'>Nos services</h2>
                <div className='list-service'>
                    <div className='card-service'>
                        <FontAwesomeIcon icon={faPlane} size="3x" />
                        <p>Voyage sur mesure</p>
                    </div>
                    <div className='card-service'>
                        <FontAwesomeIcon icon={faCar} size="3x" />
                        <p>Road trips</p>
                    </div>
                    <div className='card-service'>
                        <FontAwesomeIcon icon={faUmbrella} size="3x" />
                        <p>Tout inclus</p>
                    </div>
                    <div className='card-service'>
                        <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                        <p>Assistance formalités</p>
                    </div>
                </div>
            </div>
            <div className='why-choose-us'>
                <h2 className='subtitle'>Pourquoi Rêves d'exploration ?</h2>
                <div className='reasons'>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faShop} size="2x" />
                        <p>Agence itinérante : Je viens chez vous</p>
                    </div>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faHand} size="2x" />
                        <p>Accompagnement personnalisé</p>
                    </div>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faFile} size="2x" />
                        <p>Spécialisé : Costa Rica, Pérou, Ouest US, Corse, Quebec</p>
                    </div>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faCheckDouble} size="2x" />
                        <p>Transparence des tarifs</p>
                    </div>
                </div>
            </div>
            <div className='info'>
                <div className='temoignages'>
                    <h2 className='subtitle'>Témoignages clients</h2>
                    <Testimonials limit={4} />
                </div>
                <div className='contact'>
                    <h2 className='subtitle'>Contact</h2>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faMailBulk} size="2x" />
                        <p>Email : contact@reves-exploration.com</p>
                    </div>
                    <div className='reasons-item'>
                        <FontAwesomeIcon icon={faPhone} size="2x" />
                        <p>06 70 80 60 20</p>
                    </div>
                    <p>Du lundi au Samedi</p>
                    <p>9h - 19h</p>
                </div>
            </div>
        </div>
    );
}

export default Services;