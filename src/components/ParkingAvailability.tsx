
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SquareParking, Clock, MapPin } from 'lucide-react';

interface RouteData {
  distance: string;
  duration: string;
  carbonFootprint: string;
  parkingSpaces: number;
  parkingLocation: string;
  address: string;
}

interface ParkingAvailabilityProps {
  route: RouteData;
}

export const ParkingAvailability: React.FC<ParkingAvailabilityProps> = ({ route }) => {
  const totalSpaces = 45;
  const availableSpaces = route.parkingSpaces;
  const occupancyRate = ((totalSpaces - availableSpaces) / totalSpaces) * 100;

  const getAvailabilityColor = () => {
    if (availableSpaces > 15) return 'text-green-600';
    if (availableSpaces > 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityStatus = () => {
    if (availableSpaces > 15) return 'Forte Disponibilité';
    if (availableSpaces > 8) return 'Disponibilité Modérée';
    return 'Disponibilité Limitée';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SquareParking className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Statut Parking en Temps Réel</h3>
      </div>

      {/* Main Availability Display */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className={`text-4xl font-bold ${getAvailabilityColor()}`}>
            {availableSpaces}
          </div>
          <div className="text-muted-foreground">places disponibles</div>
          <Badge 
            variant="outline" 
            className={`${getAvailabilityColor()} border-current`}
          >
            {getAvailabilityStatus()}
          </Badge>
        </div>

        {/* Occupancy Visualization */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Occupation</span>
            <span>{Math.round(occupancyRate)}%</span>
          </div>
          <Progress 
            value={occupancyRate} 
            className="h-3"
          />
        </div>
      </div>

      {/* Parking Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold">{totalSpaces}</div>
          <div className="text-sm text-muted-foreground">Places Total</div>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold">3,20€/h</div>
          <div className="text-sm text-muted-foreground">Tarif Horaire</div>
        </div>
      </div>

      {/* Location Info */}
      <div className="space-y-3">
        <h4 className="font-medium">Détails du Parking</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{route.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Ouvert 24h/24, 7j/7</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <h4 className="font-medium">Services du Parking</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Recharge Électrique</Badge>
          <Badge variant="outline">Parking Couvert</Badge>
          <Badge variant="outline">Vidéosurveillance</Badge>
          <Badge variant="outline">Paiement Mobile</Badge>
          <Badge variant="outline">Vélib' Nearby</Badge>
        </div>
      </div>

      {/* Live Updates */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">Mises à Jour en Direct</span>
        </div>
        <p className="text-sm text-blue-600">
          Disponibilité des places mise à jour toutes les 2 minutes. Dernière mise à jour : il y a 45 secondes
        </p>
      </div>
    </div>
  );
};
