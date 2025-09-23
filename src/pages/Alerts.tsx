import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  MapPin, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Alerts = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    severe: true,
    moderate: false,
    sensitive: true
  });

  const [alertThresholds, setAlertThresholds] = useState({
    aqi: 75,
    pm25: 35,
    pm10: 50,
    o3: 80
  });

  const alertHistory = [
    {
      id: 1,
      type: 'Air Quality Alert',
      level: 'moderate',
      message: 'Air quality has reached moderate levels in your area',
      location: 'San Francisco, CA',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'Health Advisory',
      level: 'info',
      message: 'Good air quality expected tomorrow morning - perfect for outdoor activities',
      location: 'San Francisco, CA',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'Pollution Spike',
      level: 'warning',
      message: 'Elevated PM2.5 levels detected - limit outdoor exercise',
      location: 'San Francisco, CA',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'Weekly Summary',
      level: 'info',
      message: 'This week had 5 good air quality days and 2 moderate days',
      location: 'San Francisco, CA',
      time: '3 days ago',
      read: true
    }
  ];

  const alertStats = {
    totalAlerts: 156,
    thisWeek: 8,
    accuracy: 94,
    avgResponseTime: '2.3 min'
  };

  const monitoredLocations = [
    { name: 'Home', address: '123 Main St, San Francisco, CA', active: true },
    { name: 'Office', address: '456 Market St, San Francisco, CA', active: true },
    { name: 'School', address: '789 Oak St, Oakland, CA', active: false }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'warning': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleThresholdChange = (pollutant: string, value: number) => {
    setAlertThresholds(prev => ({ ...prev, [pollutant]: value }));
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
              Smart Air Quality Alerts
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay ahead of air quality changes with personalized notifications and health recommendations
            </p>
          </motion.div>
        </div>

        {/* Alert Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gradient-hero text-white shadow-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Alert System Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{alertStats.totalAlerts}</div>
                  <div className="text-white/80 text-sm">Total Alerts Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{alertStats.thisWeek}</div>
                  <div className="text-white/80 text-sm">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{alertStats.accuracy}%</div>
                  <div className="text-white/80 text-sm">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{alertStats.avgResponseTime}</div>
                  <div className="text-white/80 text-sm">Avg Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alerts" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Active Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Locations</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alerts">
              <div className="space-y-6">
                {/* Recent Alerts */}
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Alerts</CardTitle>
                      <Badge variant="outline">
                        {alertHistory.filter(alert => !alert.read).length} New
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alertHistory.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-lg border ${getAlertColor(alert.level)} ${
                            !alert.read ? 'border-l-4' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getAlertIcon(alert.level)}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold">{alert.type}</h4>
                                  {!alert.read && (
                                    <Badge variant="default" className="text-xs">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm mb-2">{alert.message}</p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{alert.location}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{alert.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Mark as Read
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                        <Target className="w-6 h-6" />
                        <span>Test Alert System</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                        <Users className="w-6 h-6" />
                        <span>Family Notifications</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                        <MapPin className="w-6 h-6" />
                        <span>Add Location</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Notification Preferences */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-primary" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-primary" />
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={() => handleNotificationChange('email')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={notifications.sms}
                          onCheckedChange={() => handleNotificationChange('sms')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-primary" />
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notifications.push}
                          onCheckedChange={() => handleNotificationChange('push')}
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-4">Alert Levels</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="severe-alerts">Severe/Unhealthy Alerts</Label>
                          <Switch
                            id="severe-alerts"
                            checked={notifications.severe}
                            onCheckedChange={() => handleNotificationChange('severe')}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="moderate-alerts">Moderate Alerts</Label>
                          <Switch
                            id="moderate-alerts"
                            checked={notifications.moderate}
                            onCheckedChange={() => handleNotificationChange('moderate')}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sensitive-alerts">Sensitive Group Alerts</Label>
                          <Switch
                            id="sensitive-alerts"
                            checked={notifications.sensitive}
                            onCheckedChange={() => handleNotificationChange('sensitive')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alert Thresholds */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-primary" />
                      <span>Custom Thresholds</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="aqi-threshold">Air Quality Index (AQI)</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <Input
                            id="aqi-threshold"
                            type="number"
                            value={alertThresholds.aqi}
                            onChange={(e) => handleThresholdChange('aqi', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">
                            Alert when AQI exceeds this value
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="pm25-threshold">PM2.5 (μg/m³)</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <Input
                            id="pm25-threshold"
                            type="number"
                            value={alertThresholds.pm25}
                            onChange={(e) => handleThresholdChange('pm25', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">
                            Fine particulate matter threshold
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="pm10-threshold">PM10 (μg/m³)</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <Input
                            id="pm10-threshold"
                            type="number"
                            value={alertThresholds.pm10}
                            onChange={(e) => handleThresholdChange('pm10', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">
                            Coarse particulate matter threshold
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="o3-threshold">Ozone (μg/m³)</Label>
                        <div className="flex items-center space-x-4 mt-2">
                          <Input
                            id="o3-threshold"
                            type="number"
                            value={alertThresholds.o3}
                            onChange={(e) => handleThresholdChange('o3', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <span className="text-sm text-muted-foreground">
                            Ground-level ozone threshold
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Save Threshold Settings</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="locations">
              <div className="space-y-6">
                {/* Add Location */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Add Monitoring Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input placeholder="Location name (e.g., Home)" />
                      <Input placeholder="Address or coordinates" />
                      <Button>
                        <MapPin className="w-4 h-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Monitored Locations */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Monitored Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {monitoredLocations.map((location, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-semibold">{location.name}</div>
                              <div className="text-sm text-muted-foreground">{location.address}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant={location.active ? "default" : "secondary"}>
                              {location.active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch checked={location.active} />
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Alerts;