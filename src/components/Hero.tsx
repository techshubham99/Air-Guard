import { useState } from 'react';
import { MapPin, Shield, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';
import heroBackground from '@/assets/hero-bg.jpg';
import Earth3D from './Earth3D';
import SearchBar from './ui/SearchBar';

interface HeroProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Hero = ({ location, setLocation }: HeroProps) => {
  const [currentAQI, setCurrentAQI] = useState(42);

  const handleSearch = (searchLocation: string) => {
    setLocation(searchLocation);
    // Here you would typically fetch new AQI data based on the location
    // For now, we'll just set a random AQI value for demonstration
    setCurrentAQI(Math.floor(Math.random() * 150) + 1);
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-aqi-good';
    if (aqi <= 100) return 'text-aqi-moderate';
    return 'text-aqi-unhealthy';
  };

  const getAQICategory = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    return 'Unhealthy';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-light/70 to-accent/40 animate-pulse-slow" />
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced 3D Earth Component with glow */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-40">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-light/30 via-transparent to-transparent animate-glow" />
          <Earth3D />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
                <Satellite className="w-4 h-4 mr-2" />
                Powered by NASA TEMPO Satellite
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Breathe Safer with{' '}
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200 bg-clip-text text-transparent animate-pulse-slow drop-shadow-lg">
                AI-Powered
              </span>{' '}
              Air Quality Predictions
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Get hyperlocal air quality forecasts with 85% accuracy using NASA satellite data 
              and advanced machine learning. Protect your health with personalized alerts.
            </p>

            <div className="mb-12">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">85%</div>
                <div className="text-white/70 text-sm">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">2.1km</div>
                <div className="text-white/70 text-sm">Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
                <div className="text-white/70 text-sm">Monitoring</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Current AQI Card */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-elegant hover:shadow-glow border border-white/20 max-w-sm w-full transition-all duration-500 hover:scale-105 group">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-white/70 mr-2 group-hover:animate-pulse" />
                  <span className="text-white/90 font-medium">{location}</span>
                </div>
                
                <div className="mb-6 relative">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-radial from-aqi-good/20 to-transparent blur-xl animate-pulse-slow" />
                  <div className={`text-6xl font-bold mb-2 ${getAQIColor(currentAQI)} relative z-10 drop-shadow-lg`}>
                    {currentAQI}
                  </div>
                  <div className="text-white/90 text-lg font-semibold relative z-10">
                    {getAQICategory(currentAQI)}
                  </div>
                  <div className="text-white/70 text-sm relative z-10">
                    Air Quality Index
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-6 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm">
                  <div className="flex items-center justify-center text-white/90">
                    <Shield className="w-5 h-5 mr-2 animate-pulse" />
                    <span className="font-medium">Safe for outdoor activities</span>
                  </div>
                </div>

                <div className="text-white/70 text-xs">
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-aqi-good rounded-full animate-pulse" />
                    <span>Updated 15 minutes ago • NASA TEMPO</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;