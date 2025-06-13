
import React, { useState } from 'react';
import { CitySelector } from '@/components/CitySelector';
import { DestinationInput } from '@/components/DestinationInput';
import { RouteDisplay } from '@/components/RouteDisplay';
import { ParkingAvailability } from '@/components/ParkingAvailability';
import { MapView } from '@/components/MapView';
import { Card } from '@/components/ui/card';
import { citiesData } from '@/data/cities';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('paris');
  const [destination, setDestination] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const currentCityData = citiesData[selectedCity];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setDestination('');
    setSelectedRoute(null);
    setShowResults(false);
  };

  const handleDestinationSubmit = (dest: string) => {
    setDestination(dest);
    setShowResults(true);
    // Simulate route calculation with city-specific data
    setTimeout(() => {
      setSelectedRoute({
        distance: '1.8 km',
        duration: '6 minutes',
        carbonFootprint: '0.32 kg CO₂',
        parkingSpaces: Math.floor(Math.random() * 15) + 5,
        parkingLocation: currentCityData.parkingPrefix,
        address: `15 Rue de la République, ${currentCityData.name}`
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-50/20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            EcoParking France
          </h1>
          <p className="text-muted-foreground mt-1">Trouvez le parking optimal avec la plus faible empreinte carbone en France</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls and Results */}
          <div className="space-y-6">
            {/* City Selection */}
            <Card className="p-6">
              <CitySelector selectedCity={selectedCity} onCityChange={handleCityChange} />
            </Card>

            {/* Destination Input */}
            <Card className="p-6">
              <DestinationInput 
                onSubmit={handleDestinationSubmit} 
                cityData={currentCityData}
              />
            </Card>

            {/* Route Display */}
            {showResults && (
              <Card className="p-6">
                <RouteDisplay route={selectedRoute} />
              </Card>
            )}

            {/* Parking Availability */}
            {selectedRoute && (
              <Card className="p-6">
                <ParkingAvailability route={selectedRoute} />
              </Card>
            )}
          </div>

          {/* Right Panel - Map */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <Card className="h-full overflow-hidden">
              <MapView 
                destination={destination} 
                route={selectedRoute} 
                cityName={currentCityData.name}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
