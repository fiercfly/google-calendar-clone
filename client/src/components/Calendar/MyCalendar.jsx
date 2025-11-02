import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../../store/eventSlice';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = ({
  view,
  onViewChange,
  date,
  onDateChange,
  modalState,
  setModalState,
  selectedSlot,
  setSelectedSlot,
  selectedEvent,
  setSelectedEvent,
}) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const eventStatus = useSelector((state) => state.events.status);

  const [eventTitle, setEventTitle] = useState('');

  useEffect(() => {
    if (eventStatus === 'idle') {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch]);

  useEffect(() => {
    if (modalState === 'edit' && selectedEvent) {
      setEventTitle(selectedEvent.title);
    } else {
      setEventTitle('');
    }
  }, [modalState, selectedEvent]);

  const handleSelectSlot = useCallback(({ start, end }) => {
    setSelectedSlot({ start, end });
    setSelectedEvent(null);
    setModalState('create');
  }, [setModalState, setSelectedSlot, setSelectedEvent]);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setModalState('edit');
  }, [setModalState, setSelectedEvent, setSelectedSlot]);

  const closeModal = () => {
    setModalState(null);
  };

  const handleSave = () => {
    if (!eventTitle) return;

    if (modalState === 'create' && selectedSlot) {
      dispatch(
        addEvent({
          title: eventTitle,
          start: selectedSlot.start,
          end: selectedSlot.end,
        })
      );
    }
    
    if (modalState === 'edit' && selectedEvent) {
      dispatch(
        updateEvent({
          ...selectedEvent, 
          _id: selectedEvent._id,
          title: eventTitle,
        })
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    if (modalState === 'edit' && selectedEvent) {
      dispatch(deleteEvent(selectedEvent._id));
    }
    closeModal();
  };

  const renderModal = () => {
    if (!modalState) return null; 

    const isCreating = modalState === 'create';
    const modalTitle = isCreating ? 'Create New Event' : 'Edit Event';
    const slot = isCreating ? selectedSlot : selectedEvent;

    if (!slot) return null; 

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="w-full max-w-lg rounded-lg bg-zinc-900 p-6 shadow-xl border border-zinc-700 text-gray-200">
          <h3 className="mb-4 text-2xl font-semibold">
            {modalTitle}
          </h3>

          <div className="mb-4">
            <p className="text-sm text-gray-400">
              <span className="font-medium text-gray-200">From:</span> {slot.start.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-gray-200">To:</span> {slot.end.toLocaleString()}
            </p>
          </div>
          
          <label htmlFor="eventTitle" className="mb-2 block text-sm font-medium text-gray-300">
            Event Title
          </label>
          <input
            type="text"
            id="eventTitle"
            placeholder="Add title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 p-2 text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus
          />

          <div className="mt-6 flex justify-between">
            <div>
              {!isCreating && (
                <button
                  onClick={handleDelete}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={closeModal}
                className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-md md:p-4">
      {renderModal()}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={onViewChange}
        onNavigate={onDateChange}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        step={60}
        timeslots={1}
        style={{ height: '85vh' }}
      />
    </div>
  );
};

export default MyCalendar;