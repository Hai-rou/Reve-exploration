import'../SASS/pages/about.scss';


function About() {
    return (
        <section className="about-page">
            <h1>L'art de faire Rêver</h1>
            <section className='about-section'>
                <div className='about-photo'>
                    <img src="public/image/photo-de-profile.jpg" alt="Photo de Florine" />
                </div>
                <div className='about-content'>
                    <div className='about-intro'>
                        <p>Chez Rêve d'Exploration, nous croyons que chaque voyage est une opportunité de découvrir non seulement de nouveaux lieux, mais aussi de se découvrir soi-même. Notre mission est de vous inspirer à explorer le monde avec curiosité et émerveillement.</p>
                        <p>Nous nous engageons à vous offrir des expériences de voyage authentiques, respectueuses des cultures locales et de l'environnement. En choisissant Rêve d'Exploration, vous optez pour un tourisme responsable qui valorise la diversité et la richesse de notre planète.</p>
                    </div>
                    <div className='about-intro'>
                        <p>Notre équipe passionnée travaille sans relâche pour créer des itinéraires uniques, adaptés à vos envies et besoins. Que vous soyez un aventurier en quête de sensations fortes, un amateur de culture ou un voyageur en quête de détente, nous avons quelque chose à vous offrir.</p>
                        <p>Rejoignez-nous dans cette aventure et laissez-nous vous guider vers des destinations qui feront battre votre cœur plus fort. Ensemble, faisons de chaque voyage un rêve devenu réalité.</p>
                    </div>
                </div>
                
            </section>
        </section>
    )
}

export default About;