import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  Briefcase,
  HelpCircle,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@airguardpro.com',
      description: 'Get help with technical issues and account questions'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: '1-800-AIR-GUARD',
      description: 'Available Monday-Friday, 9 AM - 6 PM PST'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      details: 'San Francisco, CA',
      description: '123 Clean Air Avenue, Suite 500'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 24 hours',
      description: 'We typically respond within one business day'
    }
  ];

  const contactCategories = [
    {
      id: 'general',
      icon: MessageSquare,
      title: 'General Inquiry',
      description: 'Questions about our platform and services'
    },
    {
      id: 'technical',
      icon: HelpCircle,
      title: 'Technical Support',
      description: 'Help with technical issues and troubleshooting'
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Business Partnership',
      description: 'Enterprise solutions and partnership opportunities'
    },
    {
      id: 'research',
      icon: Users,
      title: 'Research Collaboration',
      description: 'Academic and research institution partnerships'
    },
    {
      id: 'privacy',
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Data privacy and security related questions'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are your air quality predictions?',
      answer: 'Our AI models achieve 85% accuracy for 24-hour forecasts using NASA TEMPO satellite data and advanced machine learning algorithms.'
    },
    {
      question: 'What areas do you cover?',
      answer: 'We currently provide coverage for all of North America with 2.1km × 4.5km resolution, with plans to expand globally.'
    },
    {
      question: 'How often is the data updated?',
      answer: 'Our platform updates air quality data every 3 hours using real-time satellite and ground sensor information.'
    },
    {
      question: 'Is the service free to use?',
      answer: 'We offer both free and premium tiers. Basic air quality monitoring is free, while advanced features require a subscription.'
    },
    {
      question: 'Can I integrate your data into my application?',
      answer: 'Yes, we provide API access for developers and businesses. Contact our business team for API documentation and pricing.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about air quality, need technical support, or want to explore partnership opportunities? 
              We're here to help you breathe easier.
            </p>
          </motion.div>
        </div>

        {/* Contact Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="shadow-card text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                  <p className="text-primary font-semibold mb-2">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Category Selection */}
                  <div>
                    <Label className="text-base font-semibold mb-4 block">What can we help you with?</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactCategories.slice(0, 4).map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategoryChange(category.id)}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            formData.category === category.id
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <category.icon className="w-5 h-5" />
                            <span className="font-semibold text-sm">{category.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{category.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="mt-1"
                      placeholder="Please provide as much detail as possible about your inquiry..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                      <h4 className="font-semibold text-foreground mb-3">{faq.question}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Still have questions?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Can't find the answer you're looking for? Our support team is ready to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Business Partnerships Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card className="bg-gradient-hero text-white shadow-elegant">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Enterprise & Partnership Opportunities</h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Looking to integrate our air quality data into your business or research? 
                We offer enterprise solutions, API access, and research partnerships.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Enterprise API</h3>
                  <p className="text-sm text-white/80">
                    Integrate our air quality data directly into your applications with our robust API.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Research Partnerships</h3>
                  <p className="text-sm text-white/80">
                    Collaborate with us on air quality research and access to our datasets.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-2">Custom Solutions</h3>
                  <p className="text-sm text-white/80">
                    Tailored air quality monitoring solutions for specific use cases and industries.
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="lg" className="mt-8">
                <Mail className="w-4 h-4 mr-2" />
                partnerships@airguardpro.com
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;