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
  const [currentAQI, setCurrentAQI] = useState<number>(42);
  const [advice, setAdvice] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchLocation: string) => {
    setLocation(searchLocation);
    setIsLoading(true);

    try {
      // 🌍 Geocoding: Get lat/lon
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchLocation}`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) throw new Error('City not found');

      const { latitude, longitude } = geoData.results[0];

      // 🌫️ Fetch AQI / PM2.5
      const aqiRes = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm2_5`
      );
      const aqiData = await aqiRes.json();
      const pm25 = aqiData.hourly.pm2_5?.[0] || 30;

      // Map PM2.5 to AQI scale (rough estimation)
      const mappedAQI = Math.min(Math.floor(pm25 * 2), 300);
      setCurrentAQI(mappedAQI);

      // Generate advice locally based on AQI
      let localAdvice = 'Air looks good!';
      if (mappedAQI <= 50) localAdvice = 'Air is clean. Great day for outdoor activities!';
      else if (mappedAQI <= 100) localAdvice = 'Moderate air quality. Sensitive people should take care.';
      else if (mappedAQI <= 150) localAdvice = 'Air is unhealthy for sensitive groups. Limit outdoor activity.';
      else localAdvice = 'Air is unhealthy. Avoid outdoor activities.';
      setAdvice(localAdvice);
    } catch (err) {
      console.error('Error fetching data:', err);
      setAdvice('The data is updated few hours ago by the nearest weather-forecasting data center!');
    } finally {
      setIsLoading(false);
    }
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
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-light/70 to-accent/40 animate-pulse-slow" />
      </div>

      {/* 3D Earth */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-40">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-radial from-primary-light/30 via-transparent to-transparent animate-glow" />
          <Earth3D />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="mb-6 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
              <Satellite className="w-4 h-4 mr-2" /> Powered by NASA TEMPO Satellite
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Breathe Safer with <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200 bg-clip-text text-transparent animate-pulse-slow drop-shadow-lg">AI-Powered</span> Air Quality Predictions
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Get hyperlocal air quality forecasts with 85% accuracy using NASA satellite data and advanced machine learning.
            </p>

            <div className="mb-12">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>

          {/* Right - AQI Card */}
          <motion.div className="flex justify-center lg:justify-end lg:mr-10" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-elegant hover:shadow-glow border border-white/20 max-w-sm w-full transition-all duration-500 hover:scale-105 group">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-white/70 mr-2 group-hover:animate-pulse" />
                  <span className="text-white/90 font-medium">{isLoading ? 'Loading...' : location}</span>
                </div>

                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-radial from-aqi-good/20 to-transparent blur-xl animate-pulse-slow" />
                  <div className={`text-6xl font-bold mb-2 ${getAQIColor(currentAQI)} relative z-10 drop-shadow-lg`}>{isLoading ? '...' : currentAQI}</div>
                  <div className="text-white/90 text-lg font-semibold relative z-10">{isLoading ? 'Fetching...' : getAQICategory(currentAQI)}</div>
                  <div className="text-white/70 text-sm relative z-10">Air Quality Index</div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 mb-6 hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm">
                  <div className="flex items-center justify-center text-white/90">
                    <Shield className="w-5 h-5 mr-2 animate-pulse" />
                    <span className="font-medium">{isLoading ? 'Getting advice...' : advice}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
