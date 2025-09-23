import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';
import MapComponent from '@/components/MapComponent';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <MapComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
