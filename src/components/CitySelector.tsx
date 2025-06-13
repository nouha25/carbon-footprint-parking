
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  const cities = [
    { value: 'paris', label: 'Paris' },
    { value: 'lyon', label: 'Lyon' },
    { value: 'marseille', label: 'Marseille' },
    { value: 'toulouse', label: 'Toulouse' },
    { value: 'nice', label: 'Nice' },
    { value: 'nantes', label: 'Nantes' },
    { value: 'montpellier', label: 'Montpellier' },
    { value: 'strasbourg', label: 'Strasbourg' },
    { value: 'bordeaux', label: 'Bordeaux' },
    { value: 'lille', label: 'Lille' }
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="city-select" className="text-sm font-medium">
        Ville
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger id="city-select" className="pl-10 h-12">
            <SelectValue placeholder="Sélectionnez une ville" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
