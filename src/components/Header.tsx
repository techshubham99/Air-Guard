import { useState } from 'react';
import { Menu, X, Satellite, Bell, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import LocationModal from './LocationModal';

interface HeaderProps {
  onLocationSelect: (location: string) => void;
}

const Header = ({ onLocationSelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Real-time Data', href: '/real-time' },
    { name: 'Forecasts', href: '/forecasts' },
    { name: 'Alerts', href: '/alerts' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="AirGuard Pro" className="w-10 h-10" />
            <div className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AirGuard Pro
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground/70 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground/70">
              <Satellite className="w-4 h-4 mr-2" />
              NASA Data
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground/70">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button 
              className="bg-gradient-hero hover:opacity-90 shadow-elegant"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Check My Area
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <Button 
                  className="w-full bg-gradient-hero mb-2"
                  onClick={() => {
                    setIsLocationModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Check My Area
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={onLocationSelect}
      />
    </header>
  );
};

export default Header;