import React from 'react';

const Sidebar = ({ onCreateEvent }) => {
  return (
    <aside className="hidden border-r border-zinc-700 bg-zinc-900 p-4 text-gray-200 md:block">
      <button 
        onClick={onCreateEvent}
        className="flex w-full items-center justify-center rounded-lg bg-zinc-700 px-6 py-3 text-sm font-medium text-white shadow-md hover:bg-zinc-600"
      >
        <span className="text-xl mr-2">+</span>
        Create
      </button>
    </aside>
  );
};

export default Sidebar;