import React, { useState, useEffect } from 'react';

const CalendarPanel: React.FC = () => {
  interface CalendarEvent {
    summary: string;
    start: { dateTime?: string; date?: string };
    end: { dateTime?: string; date?: string };
  }

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/calendar/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/calendar/auth';
  };

  const formatDateTime = (dateTime: string | undefined, date: string | undefined) => {
    if (!dateTime && !date) return 'All day';
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const d = new Date(dateTime || date || '');
    return d.toLocaleDateString('en-US', options);
  };

  return (
    <div className="w-full h-full bg-gray-800 bg-opacity-50 p-4 rounded-lg flex flex-col text-white">
      <h2 className="text-lg mb-4 text-center">Calendar</h2>
      
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <p>Loading events...</p>
        </div>
      ) : isAuthenticated ? (
        <div className="flex-grow flex flex-col">
          <button 
            onClick={fetchEvents}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors self-center"
          >
            Refresh Events
          </button>
          <div className="flex-grow overflow-y-auto pr-2">
            {events.length > 0 ? (
              <ul className="space-y-3">
                {events.map((event, index) => (
                  <li key={index} className="bg-gray-700 p-3 rounded-lg">
                    <p className="font-bold">{event.summary}</p>
                    <p className="text-sm text-gray-300">
                      {formatDateTime(event.start.dateTime, event.start.date)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">No upcoming events found.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-300 text-center">Login to view your Google Calendar events.</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default CalendarPanel;
