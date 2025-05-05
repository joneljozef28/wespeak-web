'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths } from 'date-fns';
import { getAvailabilityForMonth } from '@/lib/availability';
import { cn } from '@/lib/utils';

interface SpeakerAvailabilityCalendarProps {
  speakerId: string;
}

const SpeakerAvailabilityCalendar: React.FC<SpeakerAvailabilityCalendarProps> = ({ 
  speakerId 
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewOption, setViewOption] = useState<string>("3months");
  
  const monthsToShow = viewOption === "3months" ? 3 : 1;
  
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, monthsToShow));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, monthsToShow));
  };
  
  // Custom calendar day renderer
  const renderDay = (date: Date, view: string) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const month = date.getMonth();
    const monthString = format(date, 'MMMM');
    
    // Get availability data for this month
    const availability = getAvailabilityForMonth(speakerId, month);
    const status = availability[dateString];
    
    return {
      className: cn(
        status === 'available' && 'bg-green-100 hover:bg-green-200',
        status === 'tentative' && 'bg-yellow-100 hover:bg-yellow-200',
        status === 'booked' && 'bg-red-100 line-through',
        !status && 'opacity-50'
      ),
      disabled: !status || status === 'booked',
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Select
          value={viewOption}
          onValueChange={setViewOption}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">1 Month View</SelectItem>
            <SelectItem value="3months">3 Month View</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" onClick={handleNextMonth}>
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={`grid ${viewOption === "3months" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"} gap-6`}>
        {Array.from({ length: monthsToShow }).map((_, index) => {
          const monthDate = addMonths(currentDate, index);
          const monthNumber = monthDate.getMonth();
          const availability = getAvailabilityForMonth(speakerId, monthNumber);
          
          // Count availability for this month
          const availableDays = Object.values(availability).filter(status => status === 'available').length;
          const tentativeDays = Object.values(availability).filter(status => status === 'tentative').length;
          const bookedDays = Object.values(availability).filter(status => status === 'booked').length;
          
          return (
            <div key={index} className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium text-lg">
                  {format(monthDate, 'MMMM yyyy')}
                </h3>
                <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                  <span className="text-green-600">{availableDays} available</span>
                  <span className="text-yellow-600">{tentativeDays} tentative</span>
                  <span className="text-red-600">{bookedDays} booked</span>
                </div>
              </div>
              
              <Calendar
                mode="single"
                selected={undefined}
                onSelect={() => {}}
                month={monthDate}
                className="w-full"
                classNames={{
                  day_disabled: "opacity-50",
                }}
                components={{
                  Day: ({ date }) => {
                    const customProps = renderDay(date, viewOption);
                    return (
                      <div className={customProps.className}>
                        {format(date, 'd')}
                      </div>
                    );
                  }
                }}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-green-100 mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-yellow-100 mr-2"></div>
          <span className="text-sm">Tentative</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full bg-red-100 mr-2"></div>
          <span className="text-sm">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SpeakerAvailabilityCalendar;