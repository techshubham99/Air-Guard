import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Satellite, 
  Brain, 
  Shield, 
  Users, 
  Award, 
  Globe,
  Target,
  Zap,
  ExternalLink,
  Mail,
  Linkedin,
  Github
} from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-founder',
      expertise: 'Environmental Science, NASA Partnership',
      image: '/api/placeholder/150/150',
      social: { linkedin: '#', email: 'sarah@airguardpro.com' }
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'CTO & Co-founder',
      expertise: 'Machine Learning, Satellite Data Processing',
      image: '/api/placeholder/150/150',
      social: { linkedin: '#', github: '#', email: 'michael@airguardpro.com' }
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Chief Data Scientist',
      expertise: 'LSTM Networks, Predictive Analytics',
      image: '/api/placeholder/150/150',
      social: { linkedin: '#', email: 'priya@airguardpro.com' }
    },
    {
      name: 'Alex Thompson',
      role: 'VP of Engineering',
      expertise: 'Full-stack Development, Cloud Architecture',
      image: '/api/placeholder/150/150',
      social: { linkedin: '#', github: '#', email: 'alex@airguardpro.com' }
    }
  ];

  const milestones = [
    { year: '2023', event: 'AirGuard Pro founded with NASA TEMPO partnership' },
    { year: '2023', event: 'Achieved 85% prediction accuracy in beta testing' },
    { year: '2024', event: 'Launched public platform with 10,000+ users' },
    { year: '2024', event: 'Expanded coverage to full North America' },
    { year: '2024', event: 'Partnership with EPA and OpenAQ established' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Health First',
      description: 'Every decision we make prioritizes public health and safety above all else.'
    },
    {
      icon: Brain,
      title: 'Scientific Rigor',
      description: 'We base our technology on peer-reviewed research and validated scientific methods.'
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Clean air information should be accessible to everyone, everywhere.'
    },
    {
      icon: Target,
      title: 'Accuracy & Precision',
      description: 'We strive for the highest accuracy in air quality predictions and measurements.'
    }
  ];

  const partnerships = [
    {
      name: 'NASA TEMPO',
      description: 'Exclusive access to next-generation satellite air quality data',
      logo: '/api/placeholder/100/60',
      url: 'https://tempo.si.edu/'
    },
    {
      name: 'EPA AirNow',
      description: 'Integration with EPA ground-based monitoring network',
      logo: '/api/placeholder/100/60',
      url: 'https://www.airnow.gov/'
    },
    {
      name: 'OpenAQ',
      description: 'Global air quality data platform collaboration',
      logo: '/api/placeholder/100/60',
      url: 'https://openaq.org/'
    },
    {
      name: 'NOAA',
      description: 'Weather data integration for enhanced predictions',
      logo: '/api/placeholder/100/60',
      url: 'https://www.noaa.gov/'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              About AirGuard Pro
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're on a mission to protect communities worldwide through intelligent air quality forecasting, 
              combining NASA's most advanced satellite technology with cutting-edge machine learning to deliver 
              life-saving air quality insights.
            </p>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-hero text-white shadow-elegant">
            <CardContent className="p-12 text-center">
              <Satellite className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                To democratize access to accurate, real-time air quality information by harnessing the power of 
                NASA's TEMPO satellite constellation and advanced AI algorithms, enabling individuals and communities 
                to make informed decisions that protect their health and well-being.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Cutting-Edge Technology</h2>
            <p className="text-xl text-muted-foreground">
              Built on a foundation of scientific excellence and technological innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Satellite className="w-6 h-6 text-blue-600" />
                  <span>NASA TEMPO Integration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>2.1km × 4.5km spatial resolution</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Hourly temporal resolution</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Full North American coverage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span>Multi-pollutant monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-green-600" />
                  <span>AI & Machine Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span>LSTM neural networks for forecasting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span>85% prediction accuracy achieved</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span>Multi-source data fusion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span>Continuous model improvement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="shadow-card h-full text-center">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Experts in environmental science, machine learning, and software engineering
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="shadow-card text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.expertise}</p>
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <Button variant="ghost" size="sm">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {member.social.github && (
                        <Button variant="ghost" size="sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Trusted Partnerships</h2>
            <p className="text-xl text-muted-foreground">
              Collaborating with leading organizations to deliver the best air quality data
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <Card className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                        <p className="text-muted-foreground">{partner.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={partner.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our mission to improve air quality monitoring
            </p>
          </div>
          
          <Card className="shadow-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-6">
                    <div className="bg-primary text-white px-4 py-2 rounded-full font-bold min-w-fit">
                      {milestone.year}
                    </div>
                    <div className="flex-1 p-4 bg-muted/30 rounded-lg">
                      {milestone.event}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;