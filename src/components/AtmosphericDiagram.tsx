import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  Gauge,
  Mountain,
  Plane,
  Satellite
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar
} from 'recharts';

interface AtmosphericDiagramProps {
  weatherData: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    pressure: number;
    uvIndex: number;
  };
  aqi: number;
}

const AtmosphericDiagram: React.FC<AtmosphericDiagramProps> = ({ weatherData, aqi }) => {
  // Atmospheric layers data with heights and characteristics
  const atmosphericLayers = [
    {
      name: 'Troposphere',
      height: '0-12 km',
      icon: <Cloud className="w-4 h-4" />,
      color: '#3B82F6',
      description: 'Weather occurs here',
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
      pollutionLevel: aqi > 100 ? 'High' : aqi > 50 ? 'Moderate' : 'Low'
    },
    {
      name: 'Stratosphere',
      height: '12-50 km',
      icon: <Plane className="w-4 h-4" />,
      color: '#8B5CF6',
      description: 'Ozone layer located here',
      temperature: -60,
      pressure: 1,
      pollutionLevel: 'Very Low'
    },
    {
      name: 'Mesosphere',
      height: '50-85 km',
      icon: <Mountain className="w-4 h-4" />,
      color: '#EC4899',
      description: 'Meteors burn up here',
      temperature: -90,
      pressure: 0.01,
      pollutionLevel: 'Minimal'
    },
    {
      name: 'Thermosphere',
      height: '85-600 km',
      icon: <Satellite className="w-4 h-4" />,
      color: '#F59E0B',
      description: 'Aurora and satellites',
      temperature: 1500,
      pressure: 0.0001,
      pollutionLevel: 'None'
    }
  ];

  // Altitude vs pressure/temperature data
  const altitudeData = [
    { altitude: 0, pressure: 1013, temperature: weatherData.temperature, pollutants: aqi },
    { altitude: 5, pressure: 540, temperature: weatherData.temperature - 32, pollutants: aqi * 0.7 },
    { altitude: 10, pressure: 265, temperature: weatherData.temperature - 65, pollutants: aqi * 0.3 },
    { altitude: 15, pressure: 120, temperature: -56, pollutants: aqi * 0.1 },
    { altitude: 20, pressure: 55, temperature: -56, pollutants: 5 },
    { altitude: 30, pressure: 12, temperature: -46, pollutants: 2 },
    { altitude: 50, pressure: 1, temperature: -3, pollutants: 1 },
    { altitude: 70, pressure: 0.05, temperature: -53, pollutants: 0 },
    { altitude: 85, pressure: 0.01, temperature: -86, pollutants: 0 }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="space-y-6">
      {/* Atmospheric Layers Visualization */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mountain className="w-5 h-5 text-primary" />
            <span>Atmospheric Layers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Vertical diagram */}
            <div className="flex flex-col-reverse space-y-reverse space-y-4 mb-6">
              {atmosphericLayers.map((layer, index) => (
                <div
                  key={layer.name}
                  className="relative flex items-center justify-between p-4 rounded-lg border-l-4 bg-gradient-to-r from-muted/30 to-transparent"
                  style={{ borderLeftColor: layer.color }}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-2 rounded-full text-white"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{layer.name}</div>
                      <div className="text-sm text-muted-foreground">{layer.description}</div>
                      <div className="text-xs text-muted-foreground">{layer.height}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-3 h-3" />
                      <span className="text-sm">{layer.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-3 h-3" />
                      <span className="text-sm">{layer.pressure} hPa</span>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        layer.pollutionLevel === 'High' ? 'border-red-500 text-red-600' :
                        layer.pollutionLevel === 'Moderate' ? 'border-yellow-500 text-yellow-600' :
                        'border-green-500 text-green-600'
                      }`}
                    >
                      {layer.pollutionLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Altitude vs Environmental Factors Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mountain className="w-5 h-5 text-primary" />
            <span>Altitude Profile Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pressure & Temperature Profile */}
            <div>
              <h4 className="font-medium mb-4">Pressure & Temperature vs Altitude</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={altitudeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="altitude" 
                      label={{ value: 'Altitude (km)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="pressure"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      name="Pressure (hPa)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="temperature"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Temperature (°C)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pollutant Distribution */}
            <div>
              <h4 className="font-medium mb-4">Pollutant Distribution by Altitude</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={altitudeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="altitude" 
                      label={{ value: 'Altitude (km)', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis />
                    <Area
                      type="monotone"
                      dataKey="pollutants"
                      stroke={getAQIColor(aqi)}
                      fill={getAQIColor(aqi)}
                      fillOpacity={0.4}
                      name="Pollutant Concentration"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Atmospheric Conditions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Wind className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{weatherData.windSpeed}</div>
            <div className="text-sm text-muted-foreground">km/h {weatherData.windDirection}</div>
            <div className="text-xs text-muted-foreground mt-1">Wind Speed</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{weatherData.humidity}%</div>
            <div className="text-sm text-muted-foreground">Relative</div>
            <div className="text-xs text-muted-foreground mt-1">Humidity</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{weatherData.visibility}</div>
            <div className="text-sm text-muted-foreground">kilometers</div>
            <div className="text-xs text-muted-foreground mt-1">Visibility</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Gauge className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{weatherData.pressure}</div>
            <div className="text-sm text-muted-foreground">hPa</div>
            <div className="text-xs text-muted-foreground mt-1">Pressure</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtmosphericDiagram;