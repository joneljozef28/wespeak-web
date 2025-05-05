import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import SpeakerGrid from '@/components/speakers/SpeakerGrid';
import FeaturedSpeakers from '@/components/home/FeaturedSpeakers';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <HowItWorks />
      <FeaturedSpeakers />
      <Testimonials />
      <CallToAction />
    </div>
  );
}