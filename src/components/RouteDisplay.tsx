
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Route, MapPin, Clock, ArrowRight } from 'lucide-react';

interface RouteData {
  distance: string;
  duration: string;
  carbonFootprint: string;
  parkingSpaces: number;
  parkingLocation: string;
  address: string;
}

interface RouteDisplayProps {
  route: RouteData | null;
}

export const RouteDisplay: React.FC<RouteDisplayProps> = ({ route }) => {
  if (!route) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Route className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">Calcul de l'itinéraire optimal...</h3>
        </div>
        <div className="space-y-3">
          <Progress value={33} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Analyse des conditions de circulation et de la disponibilité des parkings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Route className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Itinéraire Optimal Trouvé</h3>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Éco-Responsable
        </Badge>
      </div>

      {/* Route Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{route.distance}</div>
          <div className="text-sm text-muted-foreground">Distance</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{route.duration}</div>
          <div className="text-sm text-muted-foreground">Durée</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">{route.carbonFootprint}</div>
          <div className="text-sm text-green-600">Impact CO₂</div>
        </div>
      </div>

      {/* Route Steps */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Détails de l'itinéraire</h4>
        <div className="flex items-center gap-3 p-3 bg-card border rounded-lg">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium">Votre position</div>
            <div className="text-sm text-muted-foreground">Point de départ</div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="font-medium">{route.parkingLocation}</div>
            <div className="text-sm text-green-600">{route.address}</div>
          </div>
          <Badge className="bg-green-600 hover:bg-green-700">
            {route.parkingSpaces} places
          </Badge>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-700">Bénéfices Environnementaux</span>
        </div>
        <p className="text-sm text-green-600">
          Cet itinéraire réduit les émissions de CO₂ de 28% par rapport au chemin le plus court, 
          grâce à la fluidité du trafic et à la proximité de votre destination.
        </p>
      </div>
    </div>
  );
};
