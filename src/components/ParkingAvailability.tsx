
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
  const totalSpaces = 50;
  const availableSpaces = route.parkingSpaces;
  const occupancyRate = ((totalSpaces - availableSpaces) / totalSpaces) * 100;

  const getAvailabilityColor = () => {
    if (availableSpaces > 20) return 'text-green-600';
    if (availableSpaces > 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAvailabilityStatus = () => {
    if (availableSpaces > 20) return 'High Availability';
    if (availableSpaces > 10) return 'Moderate Availability';
    return 'Limited Availability';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SquareParking className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Real-Time Parking Status</h3>
      </div>

      {/* Main Availability Display */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <div className={`text-4xl font-bold ${getAvailabilityColor()}`}>
            {availableSpaces}
          </div>
          <div className="text-muted-foreground">spaces available</div>
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
            <span>Occupancy</span>
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
          <div className="text-sm text-muted-foreground">Total Spaces</div>
        </div>
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold">$2.50/hr</div>
          <div className="text-sm text-muted-foreground">Parking Rate</div>
        </div>
      </div>

      {/* Location Info */}
      <div className="space-y-3">
        <h4 className="font-medium">Parking Location Details</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{route.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Open 24/7</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <h4 className="font-medium">Parking Features</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Electric Charging</Badge>
          <Badge variant="outline">Covered Parking</Badge>
          <Badge variant="outline">Security Cameras</Badge>
          <Badge variant="outline">Mobile Payment</Badge>
        </div>
      </div>

      {/* Live Updates */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">Live Updates</span>
        </div>
        <p className="text-sm text-blue-600">
          Parking availability updates every 2 minutes. Last updated: 30 seconds ago
        </p>
      </div>
    </div>
  );
};
