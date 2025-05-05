'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    testimonialRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.transitionDelay = `${index * 150}ms`;
        observer.observe(ref);
      }
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-secondary/30 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            What Event Organizers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read testimonials from event organizers who successfully booked speakers through our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => testimonialRefs.current[index] = el}
              className={cn(
                "bg-card rounded-lg p-6 shadow-sm border border-border",
                "opacity-0 transform translate-y-8 transition-all duration-700",
                "flex flex-col h-full"
              )}
            >
              <div className="mb-4 text-primary">
                <Quote className="h-8 w-8" />
              </div>
              
              <p className="text-foreground italic mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center mt-auto">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;