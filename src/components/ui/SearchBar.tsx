import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <div className="flex w-full max-w-md items-center space-x-2 bg-white/20 backdrop-blur-sm p-2 rounded-full">
      <Input
        type="text"
        placeholder="Enter a city or address"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 bg-transparent border-none text-white placeholder:text-white/70 focus:ring-0"
      />
      <Button
        type="submit"
        size="sm"
        onClick={handleSearch}
        className="rounded-full bg-white text-primary hover:bg-white/90"
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default SearchBar;