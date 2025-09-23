import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Calendar, 
  Brain, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Zap
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
  BarChart,
  Bar,
  ComposedChart
} from 'recharts';
import { motion } from 'framer-motion';
import PredictionVisualization from '@/components/PredictionVisualization';

const Forecasts = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');

  // Enhanced forecast data
  const hourlyForecast = Array.from({ length: 24 }, (_, i) => ({
    hour: `${(new Date().getHours() + i) % 24}:00`,
    aqi: Math.floor(Math.random() * 60) + 30 + (i > 12 ? 20 : 0),
    confidence: Math.floor(Math.random() * 20) + 80,
    category: Math.random() > 0.7 ? 'Moderate' : 'Good',
    primaryPollutant: ['PM2.5', 'O₃', 'NO₂'][Math.floor(Math.random() * 3)]
  }));

  const weeklyForecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      minAqi: Math.floor(Math.random() * 30) + 20,
      maxAqi: Math.floor(Math.random() * 40) + 60,
      avgAqi: Math.floor(Math.random() * 30) + 45,
      confidence: Math.floor(Math.random() * 15) + 80,
      weather: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)]
    };
  });

  const monthlyForecast = Array.from({ length: 4 }, (_, i) => ({
    week: `Week ${i + 1}`,
    aqi: Math.floor(Math.random() * 40) + 40,
    trend: Math.random() > 0.5 ? 'improving' : 'stable',
    confidence: Math.floor(Math.random() * 20) + 70
  }));

  const modelMetrics = {
    accuracy: 85,
    confidence: 92,
    lastTrained: '2 days ago',
    dataPoints: '500K+',
    features: 42
  };

  const healthRecommendations = {
    current: 'Moderate air quality - limit prolonged outdoor activities',
    upcoming: 'Air quality expected to improve tomorrow morning',
    sensitive: 'People with respiratory conditions should stay indoors after 2 PM',
    activities: [
      { activity: 'Morning jog', recommendation: 'Good until 10 AM', status: 'safe' },
      { activity: 'Outdoor lunch', recommendation: 'Consider indoor options', status: 'caution' },
      { activity: 'Evening walk', recommendation: 'Wait until after 7 PM', status: 'caution' },
      { activity: 'Children\'s play', recommendation: 'Indoor activities preferred', status: 'warning' }
    ]
  };

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981';
    if (aqi <= 100) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'caution': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI-Powered Air Quality Forecasts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced LSTM neural networks providing 85% accurate predictions up to 4 weeks ahead
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">{selectedLocation}</span>
              <Badge variant="outline" className="text-primary border-primary">
                <Brain className="w-3 h-3 mr-1" />
                AI Predictions
              </Badge>
            </div>
          </motion.div>
        </div>

        {/* 3D Prediction Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span>Predictive Model Visualization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <PredictionVisualization forecastData={hourlyForecast.slice(0, 12)} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Model Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-hero text-white shadow-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>AI Model Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{modelMetrics.accuracy}%</div>
                  <div className="text-white/80 text-sm">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{modelMetrics.confidence}%</div>
                  <div className="text-white/80 text-sm">Confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{modelMetrics.dataPoints}</div>
                  <div className="text-white/80 text-sm">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{modelMetrics.features}</div>
                  <div className="text-white/80 text-sm">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{modelMetrics.lastTrained}</div>
                  <div className="text-white/80 text-sm">Last Trained</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Forecast Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Tabs defaultValue="24h" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="24h" className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24 Hours</span>
              </TabsTrigger>
              <TabsTrigger value="7d" className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>7 Days</span>
              </TabsTrigger>
              <TabsTrigger value="4w" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>4 Weeks</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="24h">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>24-Hour Hourly Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={hourlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="hour" className="text-sm" />
                        <YAxis yAxisId="left" className="text-sm" />
                        <YAxis yAxisId="right" orientation="right" className="text-sm" />
                        <Area
                          yAxisId="left"
                          type="monotone"
                          dataKey="aqi"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="confidence"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hourlyForecast.slice(0, 8).map((hour, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-lg text-center">
                        <div className="text-sm font-medium">{hour.hour}</div>
                        <div 
                          className="text-2xl font-bold my-1"
                          style={{ color: getAQIColor(hour.aqi) }}
                        >
                          {hour.aqi}
                        </div>
                        <div className="text-xs text-muted-foreground">{hour.confidence}% confidence</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="7d">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>7-Day Weekly Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyForecast}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="day" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Bar dataKey="minAqi" fill="#10B981" name="Min AQI" />
                        <Bar dataKey="maxAqi" fill="#F59E0B" name="Max AQI" />
                        <Bar dataKey="avgAqi" fill="hsl(var(--primary))" name="Avg AQI" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {weeklyForecast.slice(0, 4).map((day, index) => (
                      <div key={index} className="bg-muted/30 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">{day.day}</div>
                            <div className="text-sm text-muted-foreground">{day.date}</div>
                          </div>
                          <Badge variant="outline">{day.weather}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div 
                            className="text-xl font-bold"
                            style={{ color: getAQIColor(day.avgAqi) }}
                          >
                            {day.avgAqi}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {day.confidence}% confidence
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Range: {day.minAqi}-{day.maxAqi}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="4w">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>4-Week Monthly Outlook</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="week" className="text-sm" />
                        <YAxis className="text-sm" />
                        <Area
                          type="monotone"
                          dataKey="aqi"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary))"
                          fillOpacity={0.3}
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-blue-900 mb-1">Long-term Trend Analysis</div>
                      <p className="text-sm text-blue-700">
                        Based on seasonal patterns and weather forecasts, expect gradual improvement 
                        in air quality over the next month with occasional moderate days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Health Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Personalized Health Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">Current Conditions</div>
                    <p className="text-sm text-blue-700">{healthRecommendations.current}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-semibold text-green-900 mb-2">Tomorrow's Outlook</div>
                    <p className="text-sm text-green-700">{healthRecommendations.upcoming}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="font-semibold text-orange-900 mb-2">Sensitive Groups</div>
                    <p className="text-sm text-orange-700">{healthRecommendations.sensitive}</p>
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-4">Activity Recommendations</div>
                  <div className="space-y-3">
                    {healthRecommendations.activities.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <div className="font-medium">{item.activity}</div>
                            <div className="text-sm text-muted-foreground">{item.recommendation}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Forecasts;