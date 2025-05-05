'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, Globe, DollarSign } from 'lucide-react';
import { Speaker } from '@/types/speaker';
import BookingModal from '@/components/booking/BookingModal';

interface SpeakerGridProps {
  speakers: Speaker[];
}

const SpeakerGrid: React.FC<SpeakerGridProps> = ({ speakers }) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const handleBookNow = (speaker: Speaker) => {
    setSelectedSpeaker(speaker);
    setIsBookingModalOpen(true);
  };

  if (speakers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No speakers found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find speakers.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {speakers.map((speaker) => (
          <div 
            key={speaker.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-64 w-full">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              {speaker.verified && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Verified
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-playfair text-xl font-bold mb-1 truncate">
                {speaker.name}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-3">
                {speaker.credentials}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {speaker.topics.slice(0, 3).map((topic, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {speaker.topics.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{speaker.topics.length - 3} more
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{speaker.experience}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{speaker.languages.join(', ')}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>${speaker.rateMin} - ${speaker.rateMax}</span>
                </div>
                
                {speaker.videoUrl && (
                  <div className="flex items-center text-sm">
                    <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a 
                      href={speaker.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Watch Sample Talk
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleBookNow(speaker)}
                  className="flex-1"
                >
                  Book Now
                </Button>
                <Link href={`/speakers/${speaker.id}`} className="flex-1">
                  <Button variant="outlineLight" className="w-full">View Profile</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedSpeaker && (
        <BookingModal
          speaker={selectedSpeaker}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </>
  );
};

export default SpeakerGrid;