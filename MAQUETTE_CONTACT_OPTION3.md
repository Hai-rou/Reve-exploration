# Maquette Page Contact - Option 3 (Immersive)

## 📐 Layout visuel

```
┌─────────────────────────────────────────────────────────────┐
│         [Image hero: carte du monde/voyage]                 │
│                  Overlay sombre (opacity: 0.5)              │
│                                                             │
│           PARLONS DE VOTRE PROCHAIN VOYAGE                  │
│        Nous sommes là pour concrétiser vos rêves           │
│                                                             │
│               [Bouton: Nous contacter ↓]                    │
│                (scroll smooth vers formulaire)              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            PLUSIEURS FAÇONS DE NOUS JOINDRE                 │
│         Choisissez le moyen qui vous convient              │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │      📞      │  │      📧      │  │      💬      │     │
│  │              │  │              │  │              │     │
│  │  Par téléphone│ │   Par email  │  │  Formulaire  │     │
│  │              │  │              │  │              │     │
│  │  Réponse     │  │  Sous 24-48h │  │  Détaillé    │     │
│  │  immédiate   │  │              │  │              │     │
│  │              │  │              │  │              │     │
│  │ +33 1 23 ... │  │  contact@... │  │              │     │
│  │              │  │              │  │              │     │
│  │  [Appeler]   │  │  [Envoyer]   │  │  [Remplir]   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          FORMULAIRE DE CONTACT                              │
│     (apparaît quand on clique sur "Remplir")                │
│                                                             │
│  Parlez-nous de votre projet                                │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ Nom          │  │ Prénom       │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│  ┌─────────────────────────────────┐                       │
│  │ Email                           │                       │
│  └─────────────────────────────────┘                       │
│                                                             │
│  ┌─────────────────────────────────┐                       │
│  │ Téléphone (optionnel)           │                       │
│  └─────────────────────────────────┘                       │
│                                                             │
│  Type de voyage souhaité                                    │
│  ┌─────────────────────────────────┐                       │
│  │ Sélectionner...            ▼   │                       │
│  └─────────────────────────────────┘                       │
│  (Options: USA, Égypte, Mexique, France, Sur-mesure)       │
│                                                             │
│  ┌─────────────────────────────────┐                       │
│  │ Votre message                   │                       │
│  │                                 │                       │
│  │                                 │                       │
│  │                                 │                       │
│  └─────────────────────────────────┘                       │
│                                                             │
│  [✓] J'accepte la politique de confidentialité             │
│                                                             │
│           [Envoyer le message]                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  NOS HORAIRES                               │
│                                                             │
│  📅 Lundi - Vendredi : 9h00 - 18h00                        │
│  📅 Samedi : 10h00 - 16h00                                 │
│  📅 Dimanche : Fermé                                        │
│                                                             │
│  💡 Réponse sous 24-48h maximum                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Structure des composants

### 1. Hero Section
```tsx
<section className="contact-hero">
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <h1>Parlons de votre prochain voyage</h1>
    <p>Nous sommes là pour concrétiser vos rêves</p>
    <button onClick={scrollToForm}>Nous contacter ↓</button>
  </div>
</section>
```

### 2. Contact Methods Cards
```tsx
<section className="contact-methods">
  <h2>Plusieurs façons de nous joindre</h2>
  <p>Choisissez le moyen qui vous convient</p>
  
  <div className="methods-grid">
    <ContactCard 
      icon="📞"
      title="Par téléphone"
      description="Réponse immédiate"
      info="+33 1 23 45 67 89"
      action="Appeler"
      link="tel:+33123456789"
    />
    <ContactCard 
      icon="📧"
      title="Par email"
      description="Sous 24-48h"
      info="contact@reve-exploration.fr"
      action="Envoyer"
      link="mailto:contact@reve-exploration.fr"
    />
    <ContactCard 
      icon="💬"
      title="Formulaire"
      description="Détaillé"
      info=""
      action="Remplir"
      onClick={showForm}
    />
  </div>
</section>
```

### 3. Formulaire (conditionnel)
```tsx
{showForm && (
  <section className="contact-form-section">
    <h2>Formulaire de contact</h2>
    <p>Parlez-nous de votre projet</p>
    <form onSubmit={handleSubmit}>
      {/* Champs du formulaire */}
    </form>
  </section>
)}
```

---

## 🛠️ Étapes de développement

### Phase 1 : Structure HTML/JSX
1. Créer la section hero avec image de fond
2. Créer les 3 cards des méthodes de contact
3. Créer le formulaire (caché par défaut)
4. Ajouter la section horaires

### Phase 2 : State Management
```tsx
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  typeVoyage: '',
  message: '',
  accepteCGU: false
});
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);
```

### Phase 3 : Gestion du formulaire
```tsx
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
  if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
  if (!formData.email.trim()) {
    newErrors.email = 'L\'email est requis';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email invalide';
  }
  if (!formData.typeVoyage) newErrors.typeVoyage = 'Sélectionnez un type';
  if (!formData.message.trim()) newErrors.message = 'Le message est requis';
  if (!formData.accepteCGU) newErrors.accepteCGU = 'Vous devez accepter';
  
  return newErrors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  setIsSubmitting(true);
  try {
    // Envoyer les données (API, EmailJS, Supabase...)
    await sendContactForm(formData);
    setSubmitSuccess(true);
    setFormData({ /* reset */ });
  } catch (error) {
    setErrors({ submit: 'Erreur lors de l\'envoi' });
  } finally {
    setIsSubmitting(false);
  }
};
```

### Phase 4 : Scroll smooth
```tsx
const formRef = useRef(null);

const scrollToForm = () => {
  setShowForm(true);
  setTimeout(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
};
```

---

## 🎨 Classes CSS à prévoir

```scss
.contact-page {
  .contact-hero { }
  .hero-overlay { }
  .hero-content { }
  
  .contact-methods { }
  .methods-grid { }
  .contact-card { }
  
  .contact-form-section { }
  .form-group { }
  .form-row { }
  .error-message { }
  .success-message { }
  
  .contact-hours { }
}
```

---

## 📦 Options pour l'envoi du formulaire

1. **EmailJS** (simple, gratuit)
2. **Supabase Functions** (si tu veux stocker les messages)
3. **API backend Express** (si tu veux créer ton propre endpoint)
4. **FormSubmit.co** (service tiers, sans code backend)

---

## 🖼️ Image hero suggérée

Utilise une de tes images existantes :
- `/image/sunset-7133867.jpg` (déjà utilisée)
- Ou trouve une image de carte du monde vintage/moderne
- Ou un montage de plusieurs destinations

---

## ✅ Checklist finale

- [ ] Hero avec call-to-action
- [ ] 3 cards méthodes de contact
- [ ] Formulaire avec validation
- [ ] Gestion erreurs et succès
- [ ] Scroll smooth vers formulaire
- [ ] Responsive mobile
- [ ] Accessibilité (labels, aria-*)
- [ ] Animation d'apparition du formulaire

---

Bon courage ! 🚀
