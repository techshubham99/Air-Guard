import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Satellite, 
  Brain, 
  Shield, 
  MapPin, 
  TrendingUp, 
  Bell,
  Activity,
  Globe,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Satellite,
      title: 'NASA TEMPO Integration',
      description: 'Direct access to cutting-edge satellite data providing unprecedented 2.1km × 4.5km resolution air quality monitoring.',
      badge: 'NASA Partnership',
      badgeColor: 'bg-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced LSTM neural networks delivering 85% accuracy in 24-hour, 7-day, and 4-week air quality forecasts.',
      badge: '85% Accuracy',
      badgeColor: 'bg-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Health Advisories',
      description: 'Personalized health recommendations based on current air quality, activity type, and sensitive group considerations.',
      badge: 'Health First',
      badgeColor: 'bg-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: MapPin,
      title: 'Hyperlocal Data',
      description: 'Precise location-based air quality information with real-time updates every 3 hours from multiple data sources.',
      badge: 'Real-time',
      badgeColor: 'bg-red-600',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Advanced forecasting engine combining satellite data, ground sensors, and weather patterns for accurate predictions.',
      badge: 'Predictive',
      badgeColor: 'bg-yellow-600',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Customizable notifications via SMS, email, and push notifications before air quality degrades in your area.',
      badge: 'Smart Alerts',
      badgeColor: 'bg-indigo-600',
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  const specs = [
    {
      icon: Activity,
      label: 'Data Sources',
      value: '3+',
      description: 'NASA TEMPO, EPA, OpenAQ'
    },
    {
      icon: Globe,
      label: 'Coverage',
      value: 'North America',
      description: 'Full continental coverage'
    },
    {
      icon: Zap,
      label: 'Latency',
      value: '3 hours',
      description: 'Satellite data refresh rate'
    },
    {
      icon: TrendingUp,
      label: 'Accuracy',
      value: '85%',
      description: 'Prediction accuracy rate'
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced Air Quality Intelligence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Combining NASA satellite technology with machine learning to deliver the most accurate 
              air quality predictions and health recommendations available.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full shadow-card hover:shadow-glow transition-all duration-500 group hover:scale-105 relative overflow-hidden border-0 bg-gradient-card">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
                <div className="absolute inset-[1px] bg-card rounded-lg" />
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <feature.icon className="w-6 h-6 text-white relative z-10" />
                    </div>
                    <Badge className={`${feature.badgeColor} text-white font-medium group-hover:scale-105 transition-transform duration-300 shadow-md`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-hero text-white shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Technical Specifications
              </CardTitle>
              <p className="text-white/80">
                Built with enterprise-grade reliability and precision
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 hover:bg-white/20 transition-colors duration-300">
                      <spec.icon className="w-8 h-8 text-white mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">
                        {spec.value}
                      </div>
                      <div className="text-sm font-medium text-white/90">
                        {spec.label}
                      </div>
                    </div>
                    <p className="text-xs text-white/70">
                      {spec.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;