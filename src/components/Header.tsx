import { useState } from "react";
import { Menu, X, Satellite, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import LocationModal from "./LocationModal";
import NasaDataModal from "./NasaDataModal";
import AlertsModal from "./AlertsModal";

interface HeaderProps {
  onLocationSelect: (location: string) => void;
}

const Header = ({ onLocationSelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isNasaModalOpen, setIsNasaModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Real-time Data", href: "/real-time" },
    { name: "Forecasts", href: "/forecasts" },
    { name: "Alerts", href: "/alerts" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-300 bg-blue-50/70 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl transform-gpu perspective-1000">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group transform-gpu hover:scale-105 transition-transform duration-300">
            <img
              src={logo}
              alt="AirGuard Pro"
              className="w-12 h-12 rounded-full shadow-xl hover:rotate-3 hover:scale-110 transition-all duration-500"
            />
            <div className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
              AirGuard Pro
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative font-medium transition-colors duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                  isActive(item.href)
                    ? "text-blue-500"
                    : "text-gray-700 dark:text-gray-200 hover:text-sky-400"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full shadow-md"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* NASA Data Button */}
            <Button
              onClick={() => setIsNasaModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-white
                bg-gradient-to-r from-sky-400 via-lightBlue-400 to-blue-500
                shadow-[0_5px_15px_rgba(56,189,248,0.4)] transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_25px_rgba(56,189,248,0.6)] transition-all duration-300"
            >
              <Satellite className="w-5 h-5" />
              NASA Data
            </Button>

            {/* Alerts Button */}
            <Button
              onClick={() => setIsAlertsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-white
                bg-gradient-to-r from-blue-300 via-sky-400 to-blue-500
                shadow-[0_5px_15px_rgba(56,189,248,0.4)] transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_25px_rgba(56,189,248,0.6)] transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
              Alerts
            </Button>

            {/* Location Button */}
            <Button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-white
                bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                shadow-2xl transform hover:-translate-y-1 hover:scale-105 hover:shadow-3xl transition-all duration-300"
            >
              <MapPin className="w-5 h-5" />
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
          <div className="md:hidden border-t border-blue-300 dark:border-gray-700 bg-blue-50/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-b-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <Button
                className="w-full mt-4 px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 shadow-2xl transform hover:-translate-y-1 hover:scale-105 hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-2"
                onClick={() => {
                  setIsLocationModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <MapPin className="w-5 h-5" />
                Check My Area
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={onLocationSelect}
      />

      <NasaDataModal
        isOpen={isNasaModalOpen}
        onClose={() => setIsNasaModalOpen(false)}
      />

      <AlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
      />
    </header>
  );
};

export default Header;
