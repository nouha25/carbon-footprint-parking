
import React, { useState, useEffect } from 'react';
import { CitySelector } from '@/components/CitySelector';
import { DestinationInput } from '@/components/DestinationInput';
import { RouteDisplay } from '@/components/RouteDisplay';
import { ParkingAvailability } from '@/components/ParkingAvailability';
import { MapView } from '@/components/MapView';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { citiesData } from '@/data/cities';
import { useParkingStream, useSendLocation } from '@/hooks/useParking';
import { MapPin, Wifi, WifiOff } from 'lucide-react';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState('paris');
  const [destination, setDestination] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  const currentCityData = citiesData[selectedCity];
  const latestParkingData = useParkingStream();
  const sendLocation = useSendLocation();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Fallback to city center coordinates
          const cityCoords = getCityCoordinates(selectedCity);
          setUserLocation(cityCoords);
        }
      );
    }
  }, [selectedCity]);

  const getCityCoordinates = (city: string) => {
    const coords: Record<string, {lat: number, lon: number}> = {
      paris: { lat: 48.8566, lon: 2.3522 },
      lyon: { lat: 45.7640, lon: 4.8357 },
      marseille: { lat: 43.2965, lon: 5.3698 },
      toulouse: { lat: 43.6047, lon: 1.4442 },
      nice: { lat: 43.7102, lon: 7.2620 },
      nantes: { lat: 47.2184, lon: -1.5536 },
      montpellier: { lat: 43.6108, lon: 3.8767 },
      strasbourg: { lat: 48.5734, lon: 7.7521 },
      bordeaux: { lat: 44.8378, lon: -0.5792 },
      lille: { lat: 50.6292, lon: 3.0573 }
    };
    return coords[city] || coords.paris;
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setDestination('');
    setSelectedRoute(null);
    setShowResults(false);
    
    // Update location for new city
    const cityCoords = getCityCoordinates(city);
    setUserLocation(cityCoords);
  };

  const handleDestinationSubmit = (dest: string) => {
    setDestination(dest);
    setShowResults(true);
    
    // Send location when searching for parking
    if (userLocation) {
      sendLocation.mutate({
        lat: userLocation.lat,
        lon: userLocation.lon,
        car_id: `user-${selectedCity}-${Date.now()}`
      });
    }
    
    // Simulate route calculation with real-time data
    setTimeout(() => {
      let parkingSpaces = Math.floor(Math.random() * 15) + 5;
      let carbonFootprint = '0.32 kg CO₂';
      
      // Use real-time data if available
      if (latestParkingData) {
        parkingSpaces = latestParkingData.available_spots;
        carbonFootprint = `${latestParkingData.emission_kg} kg CO₂`;
      }
      
      setSelectedRoute({
        distance: '1.8 km',
        duration: '6 minutes',
        carbonFootprint,
        parkingSpaces,
        parkingLocation: currentCityData.parkingPrefix,
        address: `15 Rue de la République, ${currentCityData.name}`
      });
    }, 1500);
  };

  const handleSendLocation = () => {
    if (userLocation) {
      sendLocation.mutate({
        lat: userLocation.lat,
        lon: userLocation.lon,
        car_id: `user-${selectedCity}-${Date.now()}`
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-green-50/20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                EcoParking France
              </h1>
              <p className="text-muted-foreground mt-1">Trouvez le parking optimal avec la plus faible empreinte carbone en France</p>
            </div>
            
            {/* Real-time status indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {latestParkingData ? (
                  <>
                    <Wifi className="w-4 h-4 text-green-500" />
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Données en direct
                    </Badge>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="outline">Hors ligne</Badge>
                  </>
                )}
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleSendLocation}
                disabled={sendLocation.isPending || !userLocation}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                {sendLocation.isPending ? 'Envoi...' : 'Partager Position'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Real-time parking data display */}
        {latestParkingData && (
          <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700">Données Parking Temps Réel</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Rue:</span>
                <p className="font-medium">{latestParkingData.street_id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Distance:</span>
                <p className="font-medium">{latestParkingData.distance_km.toFixed(2)} km</p>
              </div>
              <div>
                <span className="text-muted-foreground">Places:</span>
                <p className="font-medium">{latestParkingData.available_spots} / {latestParkingData.total_spots}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Trafic:</span>
                <p className="font-medium">{(latestParkingData.congestion * 100).toFixed(0)}%</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Dernière mise à jour: {new Date(latestParkingData.timestamp).toLocaleTimeString()}
            </p>
          </Card>
        )}

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
