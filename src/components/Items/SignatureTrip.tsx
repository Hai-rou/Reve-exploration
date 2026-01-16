import type { Trip } from "../../types/trip";

interface Props {
  data: Trip;
}

function SignatureTrip({ data }: Props) {
  const {
    mediaUrl,
    mediaAlt,
    badge,
    title,
    subtitle,
    facts,
    highlights,
    itinerary,
    travelAdvice,
    practicalDetails,
    includes,
    note,
    ctaLabel,
  } = data;

  return (
    <div className="signature-card">
      <div className="signature-media">
        <img src={mediaUrl} alt={mediaAlt} loading="lazy" />
        <div className="media-overlay">
          {badge && <span className="badge">{badge}</span>}
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="signature-content">
        {facts?.length > 0 && (
          <div className="facts">
            {facts.map((f, i) => (
              <div className="fact" key={`fact-${i}`}>
                {f.icon && <span>{f.icon}</span>}
                {f.text}
              </div>
            ))}
          </div>
        )}

        {highlights?.length > 0 && (
          <div className="highlights">
            {highlights.map((h) => (
              <span className="chip" key={h}>{h}</span>
            ))}
          </div>
        )}

        {itinerary?.length > 0 && (
          <div className="itinerary-section">
            <h3>Itinéraire suggéré</h3>
            <div className="itinerary-grid">
              <div className="itinerary-roadmap">
                <ul className="roadmap" role="list">
                  {itinerary.map((s, idx) => (
                    <li className={`stop ${s.side}`} tabIndex={0} key={`stop-${idx}`}>
                      <div className="dot" aria-hidden="true" />
                      <div className="content">
                        <strong>{s.title}</strong>
                        {s.subtitle && <span>{s.subtitle}</span>}
                      </div>
                      {(s.modalTitle || s.modalText) && (
                        <div className="hover-modal" role="dialog" aria-modal="false" aria-label={`Détails ${s.title}`}>
                          {s.modalTitle && <h4>{s.modalTitle}</h4>}
                          {s.modalText && <p>{s.modalText}</p>}
                          <button className="btn-primary">Voir le détail</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="itinerary-info">
                {travelAdvice && travelAdvice.length > 0 && (
                  <div className="travel-advice">
                    <h4>Conseils voyage</h4>
                    <ul className="info-list">
                      {travelAdvice.map((advice, i) => (
                        <li key={`advice-${i}`}>
                          <span className="info-icon" aria-hidden="true">{advice.icon}</span>
                          <div className="info-content">
                            <strong>{advice.label}</strong>
                            <p>{advice.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {practicalDetails && practicalDetails.length > 0 && (
                  <div className="practical-details">
                    <h4>Détails pratiques</h4>
                    <ul className="info-list">
                      {practicalDetails.map((detail, i) => (
                        <li key={`detail-${i}`}>
                          <span className="info-icon" aria-hidden="true">{detail.icon}</span>
                          <div className="info-content">
                            <strong>{detail.label}</strong>
                            <p>{detail.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="includes">
          <h3>Ce qui est inclus</h3>
          {includes?.length > 0 && (
            <ul className="include-list">
              {includes.map((it, i) => (
                <li key={`inc-${i}`}>{it}</li>
              ))}
            </ul>
          )}
          {note && <p className="note">{note}</p>}
          {ctaLabel && <button className="btn-primary">{ctaLabel}</button>}
        </div>
      </div>
    </div>
  );
}

export default SignatureTrip;
