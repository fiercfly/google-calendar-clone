import React, { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MyCalendar from './components/Calendar/MyCalendar';

function App() {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const [modalState, setModalState] = useState(null); 
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCreateNewEvent = () => {
    const now = new Date();
    setSelectedSlot({ start: now, end: now });
    setSelectedEvent(null);
    setModalState('create');
  };

  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr] bg-zinc-900 text-white md:grid-cols-[250px_1fr]">
      <Header
        view={view}
        setView={setView}
        date={date}
        setDate={setDate}
        onCreateEvent={handleCreateNewEvent}
      />
      
      <Sidebar 
        onCreateEvent={handleCreateNewEvent}
      />
      
      <main className="overflow-auto bg-zinc-950 p-2 md:p-4">
        <MyCalendar
          view={view}
          onViewChange={setView}
          date={date}
          onDateChange={setDate}
          modalState={modalState}
          setModalState={setModalState}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </main>
    </div>
  );
}

export default App;