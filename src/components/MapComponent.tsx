import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Layers, Maximize2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Mapbox component since we can't use actual Mapbox without API key
const MockMapbox = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock location data
  const locations = [
    { id: 1, name: 'San Francisco', lat: 37.7749, lng: -122.4194, aqi: 65, status: 'moderate' },
    { id: 2, name: 'Los Angeles', lat: 34.0522, lng: -118.2437, aqi: 89, status: 'unhealthy' },
    { id: 3, name: 'Seattle', lat: 47.6062, lng: -122.3321, aqi: 42, status: 'good' },
    { id: 4, name: 'Portland', lat: 45.5152, lng: -122.6784, aqi: 38, status: 'good' },
    { id: 5, name: 'Sacramento', lat: 38.5816, lng: -121.4944, aqi: 72, status: 'moderate' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981';
      case 'moderate': return '#F59E0B';
      case 'unhealthy': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Good';
      case 'moderate': return 'Moderate';
      case 'unhealthy': return 'Unhealthy';
      default: return 'Unknown';
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-200 opacity-70">
        <svg className="w-full h-full" viewBox="0 0 400 300">
          {/* Mock coastline */}
          <path
            d="M0,150 Q100,120 200,140 T400,160 L400,300 L0,300 Z"
            fill="#3B82F6"
            fillOpacity="0.3"
          />
          {/* Mock landmass */}
          <path
            d="M0,0 L400,0 L400,150 Q300,130 200,140 T0,150 Z"
            fill="#10B981"
            fillOpacity="0.2"
          />
        </svg>
      </div>

      {/* Location Markers */}
      {locations.map((location) => (
        <div
          key={location.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{
            left: `${((location.lng + 125) / 15) * 100}%`,
            top: `${((50 - location.lat) / 15) * 100}%`,
          }}
          onClick={() => setSelectedLocation(location)}
        >
          {/* Pulsing circle */}
          <div 
            className="w-8 h-8 rounded-full border-4 border-white shadow-lg animate-pulse"
            style={{ backgroundColor: getStatusColor(location.status) }}
          >
            <div className="w-full h-full rounded-full animate-ping opacity-30"
                 style={{ backgroundColor: getStatusColor(location.status) }}
            />
          </div>
          
          {/* Location label */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md text-xs font-medium whitespace-nowrap">
            {location.name}
            <div className="text-center font-bold" style={{ color: getStatusColor(location.status) }}>
              {location.aqi}
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
          <Layers className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <div className="text-xs font-semibold mb-2">Air Quality Index</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-aqi-good"></div>
            <span className="text-xs">0-50 Good</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-aqi-moderate"></div>
            <span className="text-xs">51-100 Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-aqi-unhealthy"></div>
            <span className="text-xs">101+ Unhealthy</span>
          </div>
        </div>
      </div>

      {/* Location Details Popup */}
      {selectedLocation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-elegant p-6 min-w-64"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedLocation(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </div>
          
          <div className="text-center mb-4">
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: getStatusColor(selectedLocation.status) }}
            >
              {selectedLocation.aqi}
            </div>
            <Badge 
              className="text-white font-medium"
              style={{ backgroundColor: getStatusColor(selectedLocation.status) }}
            >
              {getStatusText(selectedLocation.status)}
            </Badge>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <MapPin className="w-4 h-4" />
              <span>Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}</span>
            </div>
            <div>Updated 15 minutes ago</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MapComponent = () => {
  const [mapStyle, setMapStyle] = useState('satellite');

  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Interactive Air Quality Map
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore hyperlocal air quality data with 2.1km × 4.5km resolution from NASA TEMPO satellite
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>Search Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Enter city or address..."
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Map Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={mapStyle === 'satellite' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMapStyle('satellite')}
                    >
                      Satellite
                    </Button>
                    <Button
                      variant={mapStyle === 'terrain' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setMapStyle('terrain')}
                    >
                      Terrain
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Data Source</span>
                      <Badge variant="outline" className="text-primary border-primary">
                        NASA TEMPO
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Resolution</span>
                      <span className="font-medium">2.1km × 4.5km</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Update Frequency</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <div className="font-medium mb-1">NASA TEMPO Integration</div>
                        <p>Real-time satellite data providing unprecedented air quality monitoring across North America.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Live Air Quality Map</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Live Data
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MockMapbox />
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Click on any location marker to view detailed air quality information
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;