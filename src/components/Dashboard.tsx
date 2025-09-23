import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  MapPin,
  Wind,
  Eye,
  Droplets,
  Thermometer,
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';

const fetchDashboardData = async (location: string) => {
  console.log(`Fetching dashboard data for ${location}...`);
  await new Promise(resolve => setTimeout(resolve, 1000));

  const randomAqi = Math.floor(Math.random() * 150) + 20;

  return {
    location,
    aqi: randomAqi,
    category: randomAqi <= 50 ? 'Good' : randomAqi <= 100 ? 'Moderate' : 'Unhealthy',
    primaryPollutant: ['O₃', 'PM2.5', 'NO₂'][Math.floor(Math.random() * 3)],
    hourlyData: Array.from({ length: 6 }, (_, i) => ({
      time: `${(i * 3 + 6).toString().padStart(2, '0')}:00`,
      aqi: Math.floor(Math.random() * 100) + 20,
    })),
    forecastData: Array.from({ length: 7 }, (_, i) => {
      const day = new Date();
      day.setDate(day.getDate() + i);
      return {
        day: day.toLocaleDateString('en-US', { weekday: 'short' }),
        aqi: Math.floor(Math.random() * 100) + 20,
      };
    }),
    pollutantData: [
      { name: 'PM2.5', value: Math.floor(Math.random() * 50), unit: 'μg/m³', status: 'moderate' },
      { name: 'PM10', value: Math.floor(Math.random() * 80), unit: 'μg/m³', status: 'moderate' },
      { name: 'O₃', value: Math.floor(Math.random() * 120), unit: 'μg/m³', status: 'unhealthy' },
      { name: 'NO₂', value: Math.floor(Math.random() * 80), unit: 'μg/m³', status: 'good' },
      { name: 'SO₂', value: Math.floor(Math.random() * 30), unit: 'μg/m³', status: 'good' },
      { name: 'CO', value: parseFloat((Math.random() * 1.5).toFixed(1)), unit: 'mg/m³', status: 'good' },
    ],
    weatherData: {
      temperature: Math.floor(Math.random() * 15) + 15,
      humidity: Math.floor(Math.random() * 40) + 50,
      windSpeed: Math.floor(Math.random() * 10) + 5,
      visibility: Math.floor(Math.random() * 5) + 5,
    },
    lastUpdated: new Date(),
  };
};

const Dashboard = ({ location: initialLocation = 'San , CA' }) => {
  const [location, setLocation] = useState(initialLocation);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['dashboardData', location],
    queryFn: () => fetchDashboardData(location),
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-aqi-good';
      case 'moderate': return 'bg-aqi-moderate';
      case 'unhealthy': return 'bg-aqi-unhealthy';
      default: return 'bg-muted';
    }
  };

  const getAQIGradient = (aqi: number) => {
    if (aqi <= 50) return 'from-aqi-good to-aqi-good-light';
    if (aqi <= 100) return 'from-aqi-moderate-light to-aqi-moderate';
    return 'from-aqi-unhealthy to-aqi-unhealthy-dark';
  };

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <section id="dashboard" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Real-Time Air Quality Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Monitor current conditions and track air quality trends for {location}
            </p>
          </motion.div>
        </div>

        {/* Location and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{data.location}</h3>
            <Badge variant="outline" className="text-primary border-primary">
              Live Data
            </Badge>
          </div>
          <Button
            onClick={() => refetch()}
            variant="outline"
            disabled={isFetching}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </Button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Current AQI Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`bg-gradient-to-br ${getAQIGradient(data.aqi)} text-white shadow-card hover:shadow-glow transition-all duration-500 hover:scale-105 group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-white/90 group-hover:text-white transition-colors">Current AQI</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-center">
                  <div className="relative mb-2">
                    <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse-slow" />
                    <div className="text-6xl font-bold relative z-10 drop-shadow-lg animate-glow">{data.aqi}</div>
                  </div>
                  <div className="text-xl font-semibold mb-4">{data.category}</div>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Activity className="w-5 h-5 animate-pulse" />
                    <span>Primary: {data.primaryPollutant}</span>
                  </div>
                  <div className="text-sm opacity-90 flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
                    <span>Updated {Math.floor((Date.now() - data.lastUpdated.getTime()) / 60000)} minutes ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weather Conditions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="w-5 h-5 text-primary" />
                  <span>Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{data.weatherData.temperature}°C</div>
                      <div className="text-sm text-muted-foreground">Temperature</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{data.weatherData.humidity}%</div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wind className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{data.weatherData.windSpeed} km/h</div>
                      <div className="text-sm text-muted-foreground">Wind Speed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold">{data.weatherData.visibility} km</div>
                      <div className="text-sm text-muted-foreground">Visibility</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Advisory */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-aqi-good" />
                  <span>Health Advisory</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-aqi-good/10 p-4 rounded-lg">
                  <div className="font-semibold text-aqi-good mb-2">Generally Safe</div>
                  <p className="text-sm text-muted-foreground">
                    Air quality is acceptable for most people. Sensitive individuals should consider limiting prolonged outdoor exertion.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-aqi-good" />
                    <span>Safe for outdoor exercise</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-aqi-moderate" />
                    <span>Sensitive groups: limit prolonged activity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Hourly Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-96 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>24-Hour Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={data.hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Area
                      type="monotone"
                      dataKey="aqi"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* 7-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-96 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>7-Day Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.forecastData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Bar
                      dataKey="aqi"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pollutant Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Pollutant Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {data.pollutantData.map((pollutant) => (
                  <div key={pollutant.name} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${getStatusColor(pollutant.status)} flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{pollutant.value}</span>
                    </div>
                    <div className="font-semibold text-foreground">{pollutant.name}</div>
                    <div className="text-sm text-muted-foreground">{pollutant.unit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;