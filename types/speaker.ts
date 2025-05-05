export interface Speaker {
  id: string;
  name: string;
  credentials: string;
  image: string;
  bio: string;
  topics: string[];
  experience: string;
  languages: string[];
  rateMin: number;
  rateMax: number;
  videoUrl?: string;
  location: string;
  verified: boolean;
  featured: boolean;
  rating: number;
  totalBookings: number;
  pastTalks: {
    title: string;
    date: string;
    venue: string;
    description: string;
    videoUrl?: string;
  }[];
}