'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  Menu, 
  X, 
  BookOpen,
  User,
  LogIn
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const links = [
  { name: 'Speakers', href: '/speakers', icon: Users },
  { name: 'How It Works', href: '/#how-it-works', icon: BookOpen },
  { name: 'About Us', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Calendar },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-medium',
        scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center"
        >
          <Calendar className="h-8 w-8 text-primary mr-2" />
          <span className="font-playfair text-xl font-bold">WeSpeak</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                'transition-colors duration-200 hover:text-primary',
                pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Authentication */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Button onClick={logout} variant="ghost">Log Out</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 flex flex-col space-y-4 border-t">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex items-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.name}
            </Link>
          ))}
          
          <div className="border-t border-border pt-3 mt-3 flex flex-col space-y-3">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start" variant="outline">Dashboard</Button>
                </Link>
                <Button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full justify-start" 
                  variant="ghost"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start" variant="outline">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-start">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;