'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Speaker } from '@/types/speaker';
import { cn } from '@/lib/utils';
import { getAvailabilityForMonth } from '@/lib/availability';

interface BookingModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

const bookingSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters"),
  eventType: z.string().min(2, "Please select an event type"),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  venueType: z.enum(["in-person", "virtual"]),
  venue: z.string().min(3, "Please provide venue details"),
  audienceSize: z.string().min(1, "Please provide the expected audience size"),
  topic: z.string().min(3, "Please provide a topic"),
  requirements: z.string().optional(),
  organizerName: z.string().min(3, "Please provide your name"),
  organizerEmail: z.string().email("Please provide a valid email"),
  organizerPhone: z.string().min(10, "Please provide a valid phone number"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingModal: React.FC<BookingModalProps> = ({ speaker, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      venueType: "in-person",
    }
  });
  
  const selectedDate = watch('date');
  const selectedMonth = selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  
  // Get availability data
  const availability = getAvailabilityForMonth(speaker.id, selectedMonth);
  
  // Determine which dates to disable
  const disabledDates = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    const status = availability[dateString];
    return status === 'booked' || !status;
  };
  
  // Custom calendar day renderer
  const renderDay = (day: Date, selectedDays: Date[], dayProps: any) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const status = availability[dateString];
    
    return (
      <div
        {...dayProps}
        className={cn(
          dayProps.className,
          status === 'available' && 'bg-green-100 hover:bg-green-200',
          status === 'tentative' && 'bg-yellow-100 hover:bg-yellow-200',
          status === 'booked' && 'bg-red-100 line-through'
        )}
      >
        {format(day, 'd')}
      </div>
    );
  };
  
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Booking data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsConfirmationOpen(true);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to submit booking request. Please try again.");
    }
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair mb-2">
              Book {speaker.name}
            </DialogTitle>
            <DialogDescription>
              Complete the form below to request a booking. All fields are required unless marked as optional.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <Tabs defaultValue="step1" value={`step${currentStep}`}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="step1">Event Details</TabsTrigger>
                <TabsTrigger value="step2">Date & Time</TabsTrigger>
                <TabsTrigger value="step3">Contact Information</TabsTrigger>
              </TabsList>
              
              {/* Step 1: Event Details */}
              <TabsContent value="step1" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input
                      id="eventName"
                      placeholder="e.g., Annual Leadership Conference"
                      {...register("eventName")}
                    />
                    {errors.eventName && (
                      <p className="text-red-500 text-sm">{errors.eventName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Input
                      id="eventType"
                      placeholder="e.g., Conference, Workshop, Seminar"
                      {...register("eventType")}
                    />
                    {errors.eventType && (
                      <p className="text-red-500 text-sm">{errors.eventType.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Venue Type</Label>
                    <Controller
                      control={control}
                      name="venueType"
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person">In-Person</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="virtual" id="virtual" />
                            <Label htmlFor="virtual">Virtual</Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                    {errors.venueType && (
                      <p className="text-red-500 text-sm">{errors.venueType.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="venue">
                      {watch("venueType") === "in-person" ? "Venue Address" : "Virtual Platform"}
                    </Label>
                    <Input
                      id="venue"
                      placeholder={watch("venueType") === "in-person" 
                        ? "e.g., Convention Center, 123 Main St" 
                        : "e.g., Zoom, Microsoft Teams, Google Meet"}
                      {...register("venue")}
                    />
                    {errors.venue && (
                      <p className="text-red-500 text-sm">{errors.venue.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audienceSize">Expected Audience Size</Label>
                    <Input
                      id="audienceSize"
                      placeholder="e.g., 50, 100, 500"
                      {...register("audienceSize")}
                    />
                    {errors.audienceSize && (
                      <p className="text-red-500 text-sm">{errors.audienceSize.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic or Focus Area</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Leadership in Crisis, Innovation Strategies"
                      {...register("topic")}
                    />
                    {errors.topic && (
                      <p className="text-red-500 text-sm">{errors.topic.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="requirements">
                      Special Requirements (Optional)
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any specific requirements or notes for the speaker..."
                      rows={4}
                      {...register("requirements")}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setCurrentStep(2)}>
                    Next Step
                  </Button>
                </div>
              </TabsContent>
              
              {/* Step 2: Date & Time */}
              <TabsContent value="step2" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={disabledDates}
                              components={{
                                Day: (props) => renderDay(props.date, field.value ? [field.value] : [], props)
                              }}
                              captionLayout="dropdown-buttons"
                              fromYear={new Date().getFullYear()}
                              toYear={new Date().getFullYear() + 2}
                            />
                            
                            <div className="p-3 border-t border-border">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center">
                                  <div className="h-3 w-3 rounded-full bg-green-100 mr-1"></div>
                                  <span>Available</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="h-3 w-3 rounded-full bg-yellow-100 mr-1"></div>
                                  <span>Tentative</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="h-3 w-3 rounded-full bg-red-100 mr-1"></div>
                                  <span>Booked</span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm">{errors.date.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        {...register("startTime")}
                      />
                      {errors.startTime && (
                        <p className="text-red-500 text-sm">{errors.startTime.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        {...register("endTime")}
                      />
                      {errors.endTime && (
                        <p className="text-red-500 text-sm">{errors.endTime.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-secondary/50 rounded-lg my-6">
                  <h4 className="font-medium mb-2">Can't find suitable dates?</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If your preferred dates aren't available, you can request alternative dates. The speaker can review your request and suggest times that work for them.
                  </p>
                  <Button variant="outline" size="sm">
                    Request Custom Dates
                  </Button>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Previous Step
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(3)}>
                    Next Step
                  </Button>
                </div>
              </TabsContent>
              
              {/* Step 3: Contact Information */}
              <TabsContent value="step3" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organizerName">Your Name</Label>
                    <Input
                      id="organizerName"
                      placeholder="e.g., John Doe"
                      {...register("organizerName")}
                    />
                    {errors.organizerName && (
                      <p className="text-red-500 text-sm">{errors.organizerName.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizerEmail">Email Address</Label>
                    <Input
                      id="organizerEmail"
                      type="email"
                      placeholder="e.g., john.doe@example.com"
                      {...register("organizerEmail")}
                    />
                    {errors.organizerEmail && (
                      <p className="text-red-500 text-sm">{errors.organizerEmail.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="organizerPhone">Phone Number</Label>
                    <Input
                      id="organizerPhone"
                      placeholder="e.g., +1 (555) 123-4567"
                      {...register("organizerPhone")}
                    />
                    {errors.organizerPhone && (
                      <p className="text-red-500 text-sm">{errors.organizerPhone.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-card shadow-sm border border-border rounded-lg my-6">
                  <h4 className="font-medium mb-2">What happens next?</h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>1. Speaker will receive your booking request immediately</li>
                    <li>2. You'll receive an email confirmation of your request</li>
                    <li>3. The speaker will respond within 48 hours</li>
                    <li>4. Once confirmed, you can finalize details directly with the speaker</li>
                  </ol>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                    Previous Step
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair mb-2">
              Booking Request Submitted!
            </DialogTitle>
            <DialogDescription>
              Thank you for your booking request. We've sent a confirmation to your email.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-secondary/30 p-4 rounded-lg my-4">
            <h4 className="font-medium mb-2">What happens next?</h4>
            <p className="text-sm text-muted-foreground">
              {speaker.name} will review your request and respond within 48 hours. 
              You'll receive notifications about any updates to your booking status.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                setIsConfirmationOpen(false);
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingModal;