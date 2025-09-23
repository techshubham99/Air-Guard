import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Navigation, Search } from 'lucide-react';
import { geocode, reverseGeocode } from '@/services/mapbox';
import { LngLatLike } from 'mapbox-gl';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { place_name: string; center: LngLatLike }) => void;
}

const LocationModal = ({ isOpen, onClose, onLocationSelect }: LocationModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCurrentLocation = () => {
    setIsDetecting(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { longitude, latitude } = position.coords;
        const location = await reverseGeocode([longitude, latitude]);
        onLocationSelect(location);
        setIsDetecting(false);
        onClose();
      },
      (error) => {
        setError(error.message);
        setIsDetecting(false);
      }
    );
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setError(null);
      const results = await geocode(searchQuery);
      if (results.length > 0) {
        onLocationSelect(results[0]);
        onClose();
      } else {
        setError('Location not found');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Check Air Quality</span>
          </DialogTitle>
          <DialogDescription>
            Enter a location or use your current position to check air quality
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter city, address, or ZIP code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">or</div>
            <Button
              variant="outline"
              onClick={handleCurrentLocation}
              disabled={isDetecting}
              className="w-full"
            >
              <Navigation className={`w-4 h-4 mr-2 ${isDetecting ? 'animate-spin' : ''}`} />
              {isDetecting ? 'Detecting Location...' : 'Use Current Location'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;