'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/booking/BookingModal';
import { Calendar, Users, BookOpen, FileText } from 'lucide-react';
import { Speaker } from '@/types/speaker';

export default function SpeakerBookingPanel({ speaker }: { speaker: Speaker }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm sticky top-24">
      <h2 className="font-playfair text-xl font-bold mb-4">
        Book {speaker.name}
      </h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between pb-3 border-b border-border">
          <span className="text-muted-foreground">Base Fee:</span>
          <span className="font-medium">${speaker.rateMin}</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-border">
          <span className="text-muted-foreground">Availability:</span>
          <span className="font-medium text-green-600">Check Calendar</span>
        </div>
        <div className="flex justify-between pb-3 border-b border-border">
          <span className="text-muted-foreground">Response Time:</span>
          <span className="font-medium">Within 48 hours</span>
        </div>
      </div>
      <Button 
        onClick={() => setIsBookingModalOpen(true)}
        className="w-full mb-4"
        size="lg"
      >
        <Calendar className="mr-2 h-5 w-5" />
        Book This Speaker
      </Button>
      <div className="space-y-3 text-sm">
        <div className="flex items-start">
          <Users className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <span>Booked by {speaker.totalBookings}+ organizations</span>
        </div>
        <div className="flex items-start">
          <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <span>Expertly curated and verified credentials</span>
        </div>
        <div className="flex items-start">
          <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <span>Secure booking with contract and payment protection</span>
        </div>
      </div>
      <BookingModal
        speaker={speaker}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
