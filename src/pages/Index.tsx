
import React, { useState } from 'react';
import { DestinationInput } from '@/components/DestinationInput';
import { RouteDisplay } from '@/components/RouteDisplay';
import { ParkingAvailability } from '@/components/ParkingAvailability';
import { MapView } from '@/components/MapView';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [destination, setDestination] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleDestinationSubmit = (dest: string) => {
    setDestination(dest);
    setShowResults(true);
    // Simulate route calculation
    setTimeout(() => {
      setSelectedRoute({
        distance: '2.3 km',
        duration: '8 minutes',
        carbonFootprint: '0.45 kg CO₂',
        parkingSpaces: 12,
        parkingLocation: 'EcoPark Downtown',
        address: '123 Green Street, Downtown'
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
            EcoParking Finder
          </h1>
          <p className="text-muted-foreground mt-1">Find optimal parking with the lowest carbon footprint</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls and Results */}
          <div className="space-y-6">
            {/* Destination Input */}
            <Card className="p-6">
              <DestinationInput onSubmit={handleDestinationSubmit} />
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
              <MapView destination={destination} route={selectedRoute} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
