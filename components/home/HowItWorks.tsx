'use client';

import { useRef, useEffect } from 'react';
import { Search, Calendar, Check, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: Search,
    title: "Find the Perfect Speaker",
    description: "Browse our extensive directory of expert speakers filtered by topic, language, and fee. Read reviews and watch sample videos."
  },
  {
    icon: Calendar,
    title: "Check Real-Time Availability",
    description: "View the speaker's up-to-date calendar to find dates that work for your event schedule."
  },
  {
    icon: Users,
    title: "Submit Booking Request",
    description: "Fill out the detailed booking form with your event information and requirements."
  },
  {
    icon: Check,
    title: "Confirm and Prepare",
    description: "Once the speaker accepts, you'll receive confirmation and all necessary details to prepare for a successful event."
  }
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const stepElements = document.querySelectorAll('.step-item');
    stepElements.forEach((el, index) => {
      el.classList.add('opacity-0');
      setTimeout(() => {
        observer.observe(el);
      }, index * 100);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="py-20 bg-secondary/50 scroll-mt-20 opacity-0 transition-opacity duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined booking process connects you with top speakers in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "step-item bg-card rounded-lg p-6 shadow-sm border border-border",
                "opacity-0 transition-all duration-700 ease-out transform translate-y-8",
                "hover:shadow-md hover:-translate-y-1 transition-all"
              )}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-center">
                {step.description}
              </p>
              <div className="flex justify-center mt-4">
                <div className="h-1 w-16 bg-primary/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;