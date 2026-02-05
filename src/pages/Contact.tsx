import { useRef, useState } from "react";
import  ContactCard from "../components/Items/ContactCard";
import ContactForm from "../components/Items/ContactForm";
import "../SASS/pages/contact.scss"



function Contact() {

    const formRef = useRef<HTMLDivElement | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        nom: "",
        prenom:"",
        email: "",
        telephone:"",
        typeVoyage: "",
        message:"",
        accepteCGU: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target; 
        const { name, value, type } = target;
        const checked = target instanceof HTMLInputElement ? target.checked : false;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.nom.trim()) newErrors.nom = "Le nom est requis.";
        if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide.";
        }
        if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis.";
        if (!formData.typeVoyage) newErrors.typeVoyage = "Veuillez sélectionner un type de voyage.";
        if (!formData.message.trim()) newErrors.message = "Le message est requis.";
        if (!formData.accepteCGU) newErrors.accepteCGU = "Vous devez accepter les CGU.";

        return newErrors;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulation d'envoi (remplacer plus tard par vraie API)
            console.log('Formulaire envoyé:', formData);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simule 1s de chargement
            setSubmitSuccess(true);
            setFormData({
                nom: "",
                prenom:"",
                email: "",
                telephone:"",
                typeVoyage: "",
                message:"",
                accepteCGU: false
            });
        } catch (error) {
            // Gérer les erreurs d'envoi
        } finally {
            setIsSubmitting(false);
        }
    }

    const scrollToForm = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100)
    };
    return ( 
        <div className="contact-page">
            <section className="contact-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Parlons de votre prochain voyage</h1>
                    <p>Nous sommes là pour concrétiser vos rêves d'exploration.</p>
                    <button onClick={scrollToForm}>Contactez-nous</button>
                </div>
            </section>

            <section className="contact-methods">
                <h2>Plusieurs façons de nous contacter</h2>
                <p>Choisissez la méthode qui vous convient le mieux.</p>

                <div className="methods-grid">
                    <ContactCard
                        icon="📞"
                        title="Par télephone ou SMS"
                        description="Notre est diponible par téléphone ou SMS pour répondre à vos questions et vous aider à planifier votre voyage de rêve."
                        info="+33 1 23 45 67 89 ou SMS au +33 6 12 34 56 78"
                        action="Appeler ou envoyer un SMS"
                        link="tel:+33123456789"
                    />
                    <ContactCard
                        icon="📧"
                        title="Par email"
                        description="Envoyez-nous un email à tout moment. Nous nous engageons à répondre dans les 24 heures pour vous aider à planifier votre prochaine aventure."
                        info="contact@reveexploration.com"
                        action="Envoyer un email"
                        link="mailto:contact@reveexploration.com"
                    />
                    <ContactCard
                        icon="💬"
                        title="Via notre formulaire de contact"
                        description="Remplissez notre formulaire de contact en ligne et nous vous répondrons dans les plus brefs délais pour discuter de votre projet de voyage."
                        action="Remplir le formulaire"
                        onClick={scrollToForm}
                    />
                </div>
            </section>

            <section>
                {showForm && (

                    <div ref={formRef} className="contact-form-section">
                        <h2>Formulaire de contact</h2>
                        <p>Parlez-nous de votre projet de voyage</p>
                        <ContactForm 
                            formData={formData}
                            errors={errors}
                            isSubmitting={isSubmitting}
                            submitSuccess={submitSuccess}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                )}
            </section>
        </div>
        
    );
}

export default Contact;