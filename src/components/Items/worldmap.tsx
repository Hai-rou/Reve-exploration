import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Couleurs adaptées au thème du site
const colors = {
  organised: "#8C6B4F", // $third-color
  speciality: "#E6D1B3", // $primary-color
  inspiration: "#D9B68C"  // $secondary-color
} as const;

// Marqueurs des destinations de voyage
const markersData = [
  { coords: [9.75, -83.75] as [number, number], type: "speciality" as keyof typeof colors, name: "Costa Rica", description: "Spécialité : Nature et aventure" },
  { coords: [-12.05, -77.05] as [number, number], type: "speciality" as keyof typeof colors, name: "Pérou", description: "Spécialité : Culture et histoire" },
  { coords: [39.5, -98.35] as [number, number], type: "speciality" as keyof typeof colors, name: "Ouest US", description: "Spécialité : Road trips" },
  { coords: [42.0, 9.0] as [number, number], type: "speciality" as keyof typeof colors, name: "Corse", description: "Spécialité : Île de beauté" },
  { coords: [52.0, -70.0] as [number, number], type: "speciality" as keyof typeof colors, name: "Québec", description: "Spécialité : Culture francophone" },
  { coords: [48.85, 2.35] as [number, number], type: "organised" as keyof typeof colors, name: "France", description: "Voyages organisés" },
  { coords: [40.71, -74] as [number, number], type: "inspiration" as keyof typeof colors, name: "New York", description: "Inspiration urbaine" },
  { coords: [-33.86, 151.2] as [number, number], type: "inspiration" as keyof typeof colors, name: "Sydney", description: "Inspiration océanique" }
];

interface WorldMapProps {
  showSearch?: boolean;
  height?: string;
  className?: string;
  borderRadius?: string;
}

function WorldMap({ showSearch = true, height = "500px", className = "", borderRadius = "20px" }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Array<{ marker: L.CircleMarker; name: string }>>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialiser la carte
    const map = L.map(mapRef.current).setView([20, 0], 2);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Ajouter les marqueurs
    markersData.forEach(place => {
      const marker = L.circleMarker(place.coords, {
        radius: 10,
        fillColor: colors[place.type],
        fillOpacity: 1,
        stroke: false
      }).bindPopup(place.name);
      marker.addTo(map);
      markersRef.current.push({ marker, name: place.name.toLowerCase() });
    });

    // Ajouter la légende
    const legend = new L.Control({ position: "bottomleft" });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 0 15px rgba(0,0,0,0.2);">
          <p style="margin: 5px 0;"><i style="background:${colors.organised}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> Déjà organisée</p>
          <p style="margin: 5px 0;"><i style="background:${colors.speciality}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> Spécialité</p>
          <p style="margin: 5px 0;"><i style="background:${colors.inspiration}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i> Inspiration</p>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    // Nettoyage lors du démontage du composant
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Effet pour la recherche
  useEffect(() => {
    const q = searchTerm.toLowerCase();
    markersRef.current.forEach(m => {
      if (m.name.includes(q)) {
        m.marker.setStyle({ opacity: 1, fillOpacity: 1 });
      } else {
        m.marker.setStyle({ opacity: 0.2, fillOpacity: 0.2 });
      }
    });
  }, [searchTerm]);
  return (
    <div className={`worldmap-container ${className}`}>
      {showSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Rechercher une destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="destination-search"
          />
        </div>
      )}
      <div 
        ref={mapRef} 
        className="map-display"
        style={{ height, borderRadius, overflow: "hidden" }}
      />
    </div>
  );
}

export default WorldMap;
