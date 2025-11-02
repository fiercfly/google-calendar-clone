import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api/events';;

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(API_URL);
  return response.data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
});

export const addEvent = createAsyncThunk('events/addEvent', async (event) => {
  const response = await axios.post(API_URL, event);
  return {
    ...response.data,
    start: new Date(response.data.start),
    end: new Date(response.data.end),
  };
});

export const updateEvent = createAsyncThunk('events/updateEvent', async (event) => {
  const response = await axios.put(`${API_URL}/${event._id}`, event);
  return {
    ...response.data,
    start: new Date(response.data.start),
    end: new Date(response.data.end),
  };
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((event) => event._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;