import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Dashboard from '@/components/Dashboard';
import MapComponent from '@/components/MapComponent';

interface HomeProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ location, setLocation }: HomeProps) => {
  return (
    <div>
      <Hero location={location} setLocation={setLocation} />
      <Features />
      <Dashboard />
      <MapComponent />
    </div>
  );
};

export default Home;