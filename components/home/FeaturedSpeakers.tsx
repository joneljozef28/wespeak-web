'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { speakers } from '@/data/speakers';
import { cn } from '@/lib/utils';

const FeaturedSpeakers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const speakerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    speakerRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.transitionDelay = `${index * 150}ms`;
        observer.observe(ref);
      }
    });
    
    return () => observer.disconnect();
  }, []);

  // Only show 4 featured speakers
  const featuredSpeakers = speakers.filter(speaker => speaker.featured).slice(0, 4);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-background opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              Featured Speakers
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover our hand-picked selection of exceptional speakers ready to inspire your audience.
            </p>
          </div>
          <Link href="/speakers" className="mt-4 md:mt-0">
            <Button variant="outlineLight" className="group">
              View All Speakers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSpeakers.map((speaker, index) => (
            <div
              key={speaker.id}
              ref={el => speakerRefs.current[index] = el}
              className={cn(
                "bg-card border border-border rounded-lg overflow-hidden shadow-sm",
                "opacity-0 transform translate-y-8 transition-all duration-700",
                "hover:shadow-md hover:-translate-y-1"
              )}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
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
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    Starting at <span className="text-primary">${speaker.rateMin}</span>
                  </p>
                  <Link href={`/speakers/${speaker.id}`}>
                    <Button size="sm" variant="default">View Profile</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;