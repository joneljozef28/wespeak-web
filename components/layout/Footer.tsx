import Link from 'next/link';
import { Calendar, Twitter, Facebook, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-primary mr-2" />
              <span className="font-playfair text-xl font-bold">SpeakerHub</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Connecting exceptional speakers with forward-thinking organizations for impactful events.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/speakers" className="text-muted-foreground hover:text-primary transition-colors">
                  Find Speakers
                </Link>
              </li>
              <li>
                <Link href="/become-speaker" className="text-muted-foreground hover:text-primary transition-colors">
                  Become a Speaker
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Topics</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/speakers?topic=leadership" className="text-muted-foreground hover:text-primary transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/speakers?topic=technology" className="text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/speakers?topic=innovation" className="text-muted-foreground hover:text-primary transition-colors">
                  Innovation
                </Link>
              </li>
              <li>
                <Link href="/speakers?topic=business" className="text-muted-foreground hover:text-primary transition-colors">
                  Business Strategy
                </Link>
              </li>
              <li>
                <Link href="/speakers?topic=education" className="text-muted-foreground hover:text-primary transition-colors">
                  Education
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Academic Way, Suite 400<br />
                  Knowledge City, KN 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">contact@speakerhub.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SpeakerHub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;