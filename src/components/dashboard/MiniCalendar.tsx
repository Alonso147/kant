import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { mockCalendarEvents } from '../../utils/mockData';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const MiniCalendar: React.FC = () => {
  const [value, onChange] = React.useState<Value>(new Date());

  // Function to check if a date has events
  const hasEvents = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mockCalendarEvents.some(event => event.date === dateStr);
  };

  // Function to get event category for a date
  const getEventCategories = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mockCalendarEvents
      .filter(event => event.date === dateStr)
      .map(event => event.type);
  };

  // Customize tile content
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    
    const categories = getEventCategories(date);
    
    if (categories.length === 0) return null;
    
    // Render dots for each event category, up to 3
    return (
      <div className="flex justify-center mt-1 space-x-0.5">
        {categories.slice(0, 3).map((category, index) => {
          let dotColor = 'bg-primary-500';
          
          if (category === 'task') dotColor = 'bg-info-500';
          if (category === 'exercise') dotColor = 'bg-success-500';
          if (category === 'menstrual') dotColor = 'bg-error-500';
          
          return (
            <div 
              key={index} 
              className={`h-1.5 w-1.5 rounded-full ${dotColor}`} 
            />
          );
        })}
        {categories.length > 3 && (
          <div className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
        )}
      </div>
    );
  };

  return (
    <div className="react-calendar-wrapper">
      <style jsx>{`
        /* Custom calendar styling */
        :global(.react-calendar) {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        
        :global(.react-calendar__navigation) {
          margin-bottom: 0.5rem;
        }
        
        :global(.react-calendar__navigation button) {
          min-width: 32px;
          background: none;
          font-size: 0.875rem;
        }
        
        :global(.react-calendar__navigation button:enabled:hover,
                .react-calendar__navigation button:enabled:focus) {
          background-color: #f1f5f9;
        }
        
        :global(.react-calendar__month-view__weekdays) {
          font-size: 0.75rem;
          font-weight: 500;
          color: #64748b;
          text-transform: uppercase;
        }
        
        :global(.react-calendar__month-view__weekdays__weekday) {
          padding: 0.5rem 0;
        }
        
        :global(.react-calendar__month-view__weekdays__weekday abbr) {
          text-decoration: none;
        }
        
        :global(.react-calendar__tile) {
          padding: 0.5rem 0;
          font-size: 0.875rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 40px;
        }
        
        :global(.react-calendar__tile:enabled:hover,
                .react-calendar__tile:enabled:focus) {
          background-color: #f1f5f9;
        }
        
        :global(.react-calendar__tile--now) {
          background: #ecfdf5;
        }
        
        :global(.react-calendar__tile--now:enabled:hover,
                .react-calendar__tile--now:enabled:focus) {
          background: #d1fae5;
        }
        
        :global(.react-calendar__tile--active) {
          background: #10b981;
          color: white;
        }
        
        :global(.react-calendar__tile--active:enabled:hover,
                .react-calendar__tile--active:enabled:focus) {
          background: #059669;
        }
      `}</style>
      <Calendar 
        onChange={onChange} 
        value={value} 
        tileContent={tileContent}
      />
    </div>
  );
};

export default MiniCalendar;