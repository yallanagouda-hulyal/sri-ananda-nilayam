const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    service: { type: String, default: 'Architectural Consultation' },
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, default: '10:00 AM - 11:30 AM' },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'rescheduled', 'cancelled'],
      default: 'scheduled',
    },
    location: { type: String, default: 'Studio Headquarters, Bengaluru' },
    notes: { type: String, default: '' },
    assignedArchitect: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' },
  },
  { timestamps: true }
);

appointmentSchema.index({ appointmentDate: 1, status: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
