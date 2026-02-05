import "../../SASS/items/contactCard.scss"

interface ContactCardProps {
    icon: string;
    title: string;
    description: string;
    info?: string;
    action: string;
    link?: string;
    onClick?: () => void;
}

function ContactCard({ icon, title, description, info, action, link, onClick }: ContactCardProps) {
    return (
        <div className="contact-card">
            <div className="card-icon">{icon}</div>
            <h3>{title}</h3>
            <p className="description">{description}</p>
            {info && <p className="card-info">{info}</p>}

            {link ? (
                <a href={link} className="card-button">{action}</a>
            ) : (
                <button onClick={onClick} className="card-button">{action}</button>
            )}
        </div>
    )
}

export default ContactCard;