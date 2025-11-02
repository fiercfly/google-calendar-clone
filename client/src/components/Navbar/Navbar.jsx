import React from 'react';

const getTitle = (date, view) => {
  if (view === 'month') {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  if (view === 'week') {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
  return date.toLocaleString('default', { dateStyle: 'full' });
};

const Navbar = ({ date, view, setView, setDate }) => {
  const viewOptions = [
    { key: 'month', label: 'Month' },
    { key: 'week', label: 'Week' },
    { key: 'day', label: 'Day' },
  ];

  const goToToday = () => setDate(new Date());

  const goToNext = () => {
    let newDate = new Date(date);
    if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
    if (view === 'week') newDate.setDate(newDate.getDate() + 7);
    if (view === 'day') newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  const goToPrev = () => {
    let newDate = new Date(date);
    if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
    if (view === 'week') newDate.setDate(newDate.getDate() - 7);
    if (view === 'day') newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  return (
    <nav className="flex items-center justify-between bg-zinc-900 px-4 py-2">
      <div className="flex items-center space-x-2">
        <button
          onClick={goToToday}
          className="rounded border border-zinc-700 bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600"
        >
          Today
        </button>
        <button
          onClick={goToPrev}
          className="rounded border border-zinc-700 bg-zinc-700 p-2 text-white hover:bg-zinc-600"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="rounded border border-zinc-700 bg-zinc-700 p-2 text-white hover:bg-zinc-600"
        >
          &gt;
        </button>
        <h2 className="ml-4 text-xl font-semibold text-gray-200">
          {getTitle(date, view)}
        </h2>
      </div>

      <div className="flex rounded-md border border-zinc-700">
        {viewOptions.map((v) => (
          <button
            key={v.key}
            onClick={() => setView(v.key)}
            className={`
              -ml-px border-l border-zinc-700 px-4 py-2 text-sm font-medium text-white
              ${
                view === v.key
                  ? 'bg-blue-600'
                  : 'bg-zinc-700 hover:bg-zinc-600'
              }
              first:ml-0 first:rounded-l-md last:rounded-r-md
            `}
          >
            {v.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;