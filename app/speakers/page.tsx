'use client';

import { useState } from 'react';
import SpeakerGrid from '@/components/speakers/SpeakerGrid';
import SpeakerFilter from '@/components/speakers/SpeakerFilter';
import { speakers } from '@/data/speakers';
import { Speaker } from '@/types/speaker';

export default function SpeakersPage() {
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>(speakers);
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Find the Perfect Speaker
          </h1>
          <p className="text-muted-foreground">
            Browse our curated list of professional speakers for your next event. 
            Use the filters to narrow down your search based on expertise, language, and more.
          </p>
        </div>
        
        <SpeakerFilter 
          speakers={speakers} 
          setFilteredSpeakers={setFilteredSpeakers} 
        />
        
        <SpeakerGrid speakers={filteredSpeakers} />
      </div>
    </div>
  );
}