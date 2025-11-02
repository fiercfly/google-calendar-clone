import React from 'react';
import Navbar from '../Navbar/Navbar';

const Header = ({ view, setView, date, setDate, onCreateEvent }) => {
  return (
    <header className="col-span-1 flex items-center justify-between border-b border-zinc-700 bg-zinc-900 p-2 pr-4 md:col-span-2">
      <div className="flex items-center">
        <img
          src="https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_3_2x.png"
          alt="Calendar Logo"
          className="ml-2 h-8 w-8"
        />
        <span className="ml-2 text-xl text-gray-200">Calendar</span>
      </div>

      <div className="hidden flex-grow md:block">
        <Navbar
          view={view}
          setView={setView}
          date={date}
          setDate={setDate}
        />
      </div>

      <div className="md:hidden">
        <button
          onClick={onCreateEvent}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          <span className="text-2xl">+</span>
        </button>
      </div>

      <div className="hidden w-24 md:block" />
    </header>
  );
};

export default Header;