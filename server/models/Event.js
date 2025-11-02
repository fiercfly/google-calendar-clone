const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
    },
    start: {
      type: Date,
      required: [true, 'Please provide a start date'],
    },
    end: {
      type: Date,
      required: [true, 'Please provide an end date'],
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.pre('save', function (next) {
  if (this.end < this.start) {
    next(new Error('End date must be after start date'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Event', EventSchema);