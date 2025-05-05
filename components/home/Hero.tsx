'use client';

import { useEffect, useRef } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPos = window.scrollY;
      heroRef.current.style.transform = `translateY(${scrollPos * 0.3}px)`;
      heroRef.current.style.opacity = `${1 - scrollPos * 0.002}`;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080')",
          filter: "brightness(0.3)"
        }}
      />
      
      <div 
        ref={heroRef}
        className="relative h-full flex flex-col justify-center items-center text-center px-4 text-white"
      >
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          Find Exceptional<br /><span className="text-primary-foreground">Resource Speakers</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-100">
          Connect with leading Filipino experts, thought leaders, and industry specialists 
          for your next event, conference, or workshop.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link href="/speakers">
            <Button size="lg" className="font-semibold px-6 bg-primary hover:bg-primary/90 text-white">
              <Search className="mr-2 h-5 w-5" />
              Find Speakers
            </Button>
          </Link>
          <Link href="/become-speaker">
            <Button size="lg" variant="outlineLight" className="font-semibold px-6">
              <Users className="mr-2 h-5 w-5" />
              Become a Speaker
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
          <div className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary-foreground" />
            <span>200+ Filipino Experts</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-primary-foreground" />
            <span>Instant Booking</span>
          </div>
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Verified Credentials</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <a 
          href="#how-it-works" 
          className="animate-bounce bg-white/10 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/20 transition-colors"
          aria-label="Scroll down"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;