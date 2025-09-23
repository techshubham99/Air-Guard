import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  RefreshCw,
  TrendingUp,
  Wind,
  Eye,
  Droplets,
  Thermometer,
  Activity,
  Database,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { motion } from 'framer-motion';
import AtmosphereVisualization from '@/components/AtmosphereVisualization';
import AtmosphericDiagram from '@/components/AtmosphericDiagram';

const fetchAirQualityData = async (location: string) => {
  // In a real app, you'd fetch from your backend API
  // For now, we'll simulate a fetch with mock data
  console.log(`Fetching data for ${location}...`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  const randomAqi = Math.floor(Math.random() * 150) + 20;
  
  return {
    location,
    aqi: randomAqi,
    category: randomAqi <= 50 ? 'Good' : randomAqi <= 100 ? 'Moderate' : 'Unhealthy',
    primaryPollutant: ['O₃', 'PM2.5', 'NO₂'][Math.floor(Math.random() * 3)],
    pollutantData: [
      { name: 'PM2.5', value: Math.floor(Math.random() * 50), max: 50, unit: 'μg/m³', color: '#10B981' },
      { name: 'PM10', value: Math.floor(Math.random() * 80), max: 100, unit: 'μg/m³', color: '#F59E0B' },
      { name: 'O₃', value: Math.floor(Math.random() * 120), max: 100, unit: 'μg/m³', color: '#EF4444' },
      { name: 'NO₂', value: Math.floor(Math.random() * 80), max: 100, unit: 'μg/m³', color: '#10B981' },
      { name: 'SO₂', value: Math.floor(Math.random() * 30), max: 50, unit: 'μg/m³', color: '#10B981' },
      { name: 'CO', value: parseFloat((Math.random() * 1.5).toFixed(1)), max: 2.0, unit: 'mg/m³', color: '#10B981' },
    ],
    hourlyTrend: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      aqi: Math.floor(Math.random() * 100) + 20,
    })),
    weatherData: {
      temperature: Math.floor(Math.random() * 15) + 15,
      humidity: Math.floor(Math.random() * 40) + 50,
      windSpeed: Math.floor(Math.random() * 10) + 5,
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      visibility: Math.floor(Math.random() * 5) + 5,
      pressure: Math.floor(Math.random() * 20) + 1000,
      uvIndex: Math.floor(Math.random() * 10) + 1,
    },
    dataSources: [
      { name: 'NASA TEMPO', status: 'active', lastUpdate: `${Math.floor(Math.random() * 10) + 1} min ago`, quality: 98 },
      { name: 'EPA AirNow', status: 'active', lastUpdate: `${Math.floor(Math.random() * 10) + 1} min ago`, quality: 95 },
    ],
    lastUpdated: new Date(),
  };
};

const RealTimeData = ({ location: initialLocation = 'San Francisco, CA' }) => {
  const [location, setLocation] = useState(initialLocation);
  const [selectedPollutant, setSelectedPollutant] = useState('aqi');

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['airQuality', location],
    queryFn: () => fetchAirQualityData(location),
  });

  const handleRefresh = () => {
    refetch();
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    return '#EF4444';
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Real-Time Air Quality</h1>
            <p className="text-lg text-muted-foreground">Live monitoring for {location}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse" />
              Live Data
            </Badge>
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={isFetching}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* 3D Atmosphere Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-primary" />
                <span>Real-Time Atmospheric Model</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <AtmosphereVisualization aqi={data.aqi} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Atmospheric Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <AtmosphericDiagram weatherData={data.weatherData} aqi={data.aqi} />
        </motion.div>

        {/* Current Conditions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main AQI Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-medium">{data.location}</span>
                </div>
                <CardTitle>Current Air Quality</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative">
                  <div
                    className="text-8xl font-bold mb-4 bg-gradient-to-br from-primary to-primary-light bg-clip-text text-transparent"
                  >
                    {data.aqi}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge
                      className="text-white font-medium"
                      style={{ backgroundColor: getAQIColor(data.aqi) }}
                    >
                      {data.category}
                    </Badge>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 mb-4">
                  <div className="text-sm text-muted-foreground mb-1">Primary Pollutant</div>
                  <div className="text-xl font-semibold">{data.primaryPollutant}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Updated {Math.floor((Date.now() - data.lastUpdated.getTime()) / 60000)} minutes ago
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather Conditions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-primary" />
                  <span>Weather Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Thermometer className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.weatherData.temperature}°C</div>
                    <div className="text-sm text-muted-foreground">Temperature</div>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.weatherData.humidity}%</div>
                    <div className="text-sm text-muted-foreground">Humidity</div>
                  </div>
                  <div className="text-center">
                    <Wind className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.weatherData.windSpeed}</div>
                    <div className="text-sm text-muted-foreground">Wind km/h</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{data.weatherData.visibility}km</div>
                    <div className="text-sm text-muted-foreground">Visibility</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sources Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Data Sources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.dataSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-medium">{source.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{source.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{source.quality}%</div>
                      <div className="text-xs text-muted-foreground">Quality</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pollutant Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pollutant Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {data.pollutantData.map((pollutant) => (
                  <div key={pollutant.name} className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={[pollutant]}>
                          <RadialBar
                            dataKey="value"
                            fill={pollutant.color}
                            cornerRadius={10}
                            background={{ fill: '#f3f4f6' }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-sm font-bold">{pollutant.value}</div>
                      </div>
                    </div>
                    <div className="font-semibold">{pollutant.name}</div>
                    <div className="text-sm text-muted-foreground">{pollutant.unit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 24-Hour Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>24-Hour Trend Analysis</span>
                </CardTitle>
                <div className="flex space-x-2">
                  {['aqi'].map((pollutant) => (
                    <Button
                      key={pollutant}
                      variant={selectedPollutant === pollutant ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPollutant(pollutant)}
                    >
                      {pollutant.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.hourlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="hour" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Area
                      type="monotone"
                      dataKey={selectedPollutant}
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RealTimeData;