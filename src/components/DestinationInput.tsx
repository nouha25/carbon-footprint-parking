
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Route } from 'lucide-react';

interface DestinationInputProps {
  onSubmit: (destination: string) => void;
}

export const DestinationInput: React.FC<DestinationInputProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) return;
    
    setIsLoading(true);
    onSubmit(destination);
    
    // Reset loading state after animation
    setTimeout(() => setIsLoading(false), 2000);
  };

  const suggestedLocations = [
    'Central Business District',
    'Shopping Mall Plaza',
    'University Campus',
    'Airport Terminal'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Where are you going?</h2>
        <p className="text-muted-foreground">Enter your destination to find eco-friendly parking</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium">
            Destination Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="destination"
              type="text"
              placeholder="Enter your destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 h-12 text-base"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
          disabled={isLoading || !destination.trim()}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Finding optimal route...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4" />
              Find Eco-Friendly Parking
            </div>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Popular destinations:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedLocations.map((location) => (
            <Button
              key={location}
              variant="outline"
              size="sm"
              onClick={() => setDestination(location)}
              className="text-xs hover:bg-green-50 hover:border-green-200"
            >
              {location}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
