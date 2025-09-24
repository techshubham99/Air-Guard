import { useState } from "react";
import { Menu, X, Satellite, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import LocationModal from "./LocationModal";

interface HeaderProps {
  onLocationSelect: (location: string) => void;
}

const Header = ({ onLocationSelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Real-time Data", href: "/real-time" },
    { name: "Forecasts", href: "/forecasts" },
    { name: "Alerts", href: "/alerts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // active check
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-200 bg-blue-50/70 dark:bg-blue-900/70 backdrop-blur-md shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="AirGuard Pro"
              className="w-10 h-10 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
            />
            <div className="text-xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              AirGuard Pro
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-blue-600"
                    : "text-gray-600 dark:text-gray-200 hover:text-blue-500"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-sky-400 to-blue-500"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-2"
            >
              <Satellite className="w-4 h-4" />
              NASA Data
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Alerts
            </Button>
            <Button
              className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-full px-4"
              onClick={() => setIsLocationModalOpen(true)}
            >
              <MapPin className="w-4 h-4" />
              Check My Area
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-blue-200 dark:border-blue-800 bg-blue-50/95 dark:bg-blue-900/95 backdrop-blur-md shadow-lg rounded-b-xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                className="w-full mt-4 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white shadow-md hover:scale-105 transition rounded-full py-2"
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
        )}
      </nav>

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={onLocationSelect}
      />
    </header>
  );
};

export default Header;
