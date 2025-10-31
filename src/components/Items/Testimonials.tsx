import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { testimonials, type Testimonial } from '../../data/testimonials';

interface TestimonialsProps {
  limit?: number;
}

function Testimonials({ limit }: TestimonialsProps) {
  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  return (
    <div className="testimonials-grid">
      {displayedTestimonials.map((testimonial: Testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <div className="testimonial-header">
            <div className="quote-icon">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </div>
            <div className="stars">
              {renderStars(testimonial.rating)}
            </div>
          </div>
          
          <p className="testimonial-comment">"{testimonial.comment}"</p>
          
          <div className="testimonial-footer">
            <div className="client-info">
              {testimonial.avatar && (
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="avatar"
                />
              )}
              <div className="client-details">
                <h4 className="client-name">{testimonial.name}</h4>
                <p className="client-location">{testimonial.location}</p>
                <p className="trip-info">{testimonial.trip}</p>
              </div>
            </div>
            <p className="testimonial-date">{testimonial.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;