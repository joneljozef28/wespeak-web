'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  DollarSign,
  Calendar, 
  Globe,
  BookOpen
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Speaker } from '@/types/speaker';
import { cn } from '@/lib/utils';

interface SpeakerFilterProps {
  speakers: Speaker[];
  setFilteredSpeakers: (speakers: Speaker[]) => void;
}

const topicOptions = [
  'Leadership', 
  'Technology', 
  'Business', 
  'Innovation', 
  'Education',
  'Marketing',
  'Finance',
  'Health',
  'Science',
  'Personal Development'
];

const languageOptions = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Japanese',
  'Korean',
  'Arabic',
  'Russian'
];

const SpeakerFilter: React.FC<SpeakerFilterProps> = ({ 
  speakers, 
  setFilteredSpeakers 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  const maxPrice = Math.max(...speakers.map(s => s.rateMax));
  
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedTopics, selectedLanguages, priceRange]);
  
  const applyFilters = () => {
    let results = [...speakers];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        speaker => 
          speaker.name.toLowerCase().includes(term) || 
          speaker.credentials.toLowerCase().includes(term) ||
          speaker.bio.toLowerCase().includes(term) ||
          speaker.topics.some(topic => topic.toLowerCase().includes(term))
      );
    }
    
    // Topic filter
    if (selectedTopics.length > 0) {
      results = results.filter(
        speaker => speaker.topics.some(topic => selectedTopics.includes(topic))
      );
    }
    
    // Language filter
    if (selectedLanguages.length > 0) {
      results = results.filter(
        speaker => speaker.languages.some(lang => selectedLanguages.includes(lang))
      );
    }
    
    // Price range filter
    results = results.filter(
      speaker => 
        speaker.rateMin <= priceRange[1] && 
        speaker.rateMax >= priceRange[0]
    );
    
    setFilteredSpeakers(results);
  };
  
  const handleTopicSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  
  const handleLanguageSelect = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTopics([]);
    setSelectedLanguages([]);
    setPriceRange([0, maxPrice]);
    setFilteredSpeakers(speakers);
  };
  
  const hasActiveFilters = searchTerm || selectedTopics.length > 0 || selectedLanguages.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice;

  return (
    <div className="border border-border rounded-lg p-6 mb-8 bg-card shadow-sm">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, topic, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full md:w-auto"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {selectedTopics.length + selectedLanguages.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0)}
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            className="w-full md:w-auto"
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
      
      {isFilterExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {topicOptions.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedTopics.includes(topic) 
                      ? "" 
                      : "hover:bg-secondary"
                  )}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                  {selectedTopics.includes(topic) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((language) => (
                <Badge
                  key={language}
                  variant={selectedLanguages.includes(language) ? "secondary" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedLanguages.includes(language) 
                      ? "" 
                      : "hover:bg-secondary"
                  )}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                  {selectedLanguages.includes(language) && (
                    <X className="ml-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </h3>
            <Slider
              value={priceRange}
              min={0}
              max={maxPrice}
              step={100}
              onValueChange={setPriceRange}
              className="my-6"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeakerFilter;