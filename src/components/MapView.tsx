
import React from 'react';
import { MapPin, Route, ArrowDown } from 'lucide-react';

interface RouteData {
  distance: string;
  duration: string;
  carbonFootprint: string;
  parkingSpaces: number;
  parkingLocation: string;
  address: string;
}

interface MapViewProps {
  destination: string;
  route: RouteData | null;
  cityName: string;
}

export const MapView: React.FC<MapViewProps> = ({ destination, route, cityName }) => {
  if (!destination) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40 text-center p-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-muted-foreground">Carte Interactive de {cityName}</h3>
            <p className="text-sm text-muted-foreground">
              Entrez une destination à {cityName} pour voir votre itinéraire et les options de parking
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-gradient-to-br from-blue-50 to-green-50">
      {/* Map Placeholder with Route Visualization */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Map Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Route className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">Itinéraire vers {destination} - {cityName}</span>
          </div>
          {route && (
            <div className="text-xs text-muted-foreground">
              {route.distance} • {route.duration} • {route.carbonFootprint}
            </div>
          )}
        </div>

        {/* Route Visualization */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          {/* Starting Point */}
          <div className="flex items-center flex-col space-y-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium bg-white/90 px-3 py-1 rounded-full shadow-sm">
              Votre Position
            </span>
          </div>

          {/* Route Line */}
          {route && (
            <>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-px h-16 bg-gradient-to-b from-blue-500 via-green-500 to-green-600"></div>
                <ArrowDown className="w-4 h-4 text-green-600" />
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Éco Itinéraire
                </div>
              </div>

              {/* Destination/Parking */}
              <div className="flex items-center flex-col space-y-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-sm font-medium bg-white/90 px-3 py-1 rounded-full shadow-sm text-center">
                  {route.parkingLocation}
                </span>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                  {route.parkingSpaces} places disponibles
                </div>
              </div>
            </>
          )}

          {!route && (
            <div className="flex items-center space-y-4 flex-col">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Recherche du parking optimal...</span>
            </div>
          )}
        </div>

        {/* Map Footer */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Données trafic temps réel - {cityName}</span>
            <span>Mis à jour il y a 45s</span>
          </div>
        </div>
      </div>

      {/* Map Integration Note */}
      <div className="absolute bottom-4 left-4 bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-xs">
        <div className="text-xs text-blue-700">
          <strong>Note:</strong> Carte interactive avec intégration Mapbox sera ajoutée pour une fonctionnalité complète avec navigation réelle pour {cityName}.
        </div>
      </div>
    </div>
  );
};
