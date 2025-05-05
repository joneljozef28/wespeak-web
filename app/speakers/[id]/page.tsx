import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  DollarSign, 
  Globe, 
  Star, 
  Clock, 
  MapPin,
  Video,
  Users,
  BookOpen,
  FileText,
  ChevronLeft
} from 'lucide-react';
import { speakers } from '@/data/speakers';
import { reviews } from '@/data/reviews';
import { Speaker } from '@/types/speaker';
import SpeakerAvailabilityCalendar from '@/components/speakers/SpeakerAvailabilityCalendar';
import SpeakerBookingPanel from '@/components/speakers/SpeakerBookingPanel';
import Link from 'next/link';

export async function generateStaticParams() {
  return speakers.map(speaker => ({ id: speaker.id }));
}

export default async function SpeakerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const speaker = speakers.find(s => s.id === id) as Speaker | undefined;
  const speakerReviews = speaker ? reviews.filter(review => review.speakerId === speaker.id) : [];

  if (!speaker) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Speaker Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The speaker you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/speakers">
            <Button>Browse Speakers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <Link href="/speakers" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Speakers
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Speaker Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="relative h-64 w-64 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                />
                {speaker.verified && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Verified
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
                  {speaker.name}
                </h1>
                <p className="text-muted-foreground mb-4">{speaker.credentials}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {speaker.topics.map((topic, i) => (
                    <Badge key={i} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>{speaker.languages.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Speaking Fee: ${speaker.rateMin} - ${speaker.rateMax}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Experience: {speaker.experience}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <span>Location: {speaker.location}</span>
                  </div>
                </div>
                
                <div className="md:hidden mt-4">
                  <Button 
                    className="w-full"
                  >
                    Book This Speaker
                  </Button>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="talks">Past Talks</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Biography</h2>
                  <div className="prose prose-slate max-w-none">
                    {speaker.bio.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 text-foreground">{paragraph}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4">Areas of Expertise</h2>
                  <ul className="space-y-2">
                    {speaker.topics.map((topic, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="talks" className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Previous Speaking Engagements</h2>
                
                {speaker.pastTalks.map((talk, i) => (
                  <div key={i} className="bg-card border border-border rounded-lg p-5 mb-4">
                    <h3 className="font-bold text-lg mb-2">{talk.title}</h3>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{talk.date}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{talk.venue}</span>
                    </div>
                    <p className="text-sm mb-4">{talk.description}</p>
                    
                    {talk.videoUrl && (
                      <a 
                        href={talk.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch Recording
                      </a>
                    )}
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5"
                          fill={star <= speaker.rating ? "currentColor" : "none"}
                          color={star <= speaker.rating ? "orange" : "gray"}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{speaker.rating}/5</span>
                    <span className="text-muted-foreground ml-2">
                      ({speakerReviews.length} {speakerReviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
                
                {speakerReviews.length > 0 ? (
                  speakerReviews.map((review, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-5 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={review.reviewerImage} alt={review.reviewerName} />
                            <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{review.reviewerName}</h4>
                            <p className="text-sm text-muted-foreground">{review.eventName}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-4 w-4"
                              fill={star <= review.rating ? "currentColor" : "none"}
                              color={star <= review.rating ? "orange" : "gray"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">No reviews yet for this speaker.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="availability">
                <h2 className="text-xl font-bold mb-4">Availability Calendar</h2>
                <SpeakerAvailabilityCalendar speakerId={speaker.id} />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column: Booking Panel */}
          <div className="lg:col-span-1">
            <SpeakerBookingPanel speaker={speaker} />
          </div>
        </div>
      </div>
    </div>
  );
}