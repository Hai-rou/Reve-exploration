import "../../SASS/items/contactForm.scss"




interface ContactFormProps {
    formData: {
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        typeVoyage: string;
        message: string;
        accepteCGU: boolean;
    };
    errors: any; 
    isSubmitting: boolean;
    submitSuccess: boolean; 
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


function ContactForm({ formData, errors, isSubmitting, submitSuccess, handleChange, handleSubmit }: ContactFormProps) {
    return (
        <form onSubmit={handleSubmit}>
            {/* Nom + Prenom */}
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                    {errors.nom && <span className="error">{errors.nom}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
                    {errors.prenom && <span className="error">{errors.prenom}</span>}
                </div>
            </div>

            {/* Email */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            {/* Téléphone */}
            <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} />
                {errors.telephone && <span className="error">{errors.telephone}</span>}
            </div>
            {/* Type de voyage */}
            <div className="form-group">
                <label htmlFor="typeVoyage">Type de voyage</label>
                <select id="typeVoyage" name="typeVoyage" value={formData.typeVoyage} onChange={handleChange}>
                    <option value="">Sélectionnez une destination</option>
                    <option value="usa">USA</option>
                    <option value="egypte">Égypte</option>
                    <option value="france">France</option>
                    <option value="mexique">Mexique</option>
                    <option value="surmesure">Sur-mesure</option>
                </select>
            </div>
            {/* Message */}
            <div className="form-group">
                <label htmlFor="message">Votre message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea>
                {errors.message && <span className="error">{errors.message}</span>}
            </div>
            {/* CGU */}
            <div className="form-group checkbox-group">
                <input type="checkbox" id="accepteCGU" name="accepteCGU" checked={formData.accepteCGU} onChange={handleChange} />
                <label htmlFor="accepteCGU">J'accepte les <a href="/cgu" target="_blank">CGU</a></label>
                {errors.accepteCGU && <span className="error">{errors.accepteCGU}</span>}
            </div>

            {/* Submit */}
            <div className="form-group">
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                </button>
                {submitSuccess && <p className="success-message">Votre message a été envoyé avec succès !</p>}
            </div>
        </form>
    )
   
}

export default ContactForm;