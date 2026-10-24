const Appointment = require('../models/Appointment');
const { asyncHandler } = require('../middleware/errorHandler');

// Get all appointments with optional status & date filtering
exports.getAppointments = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const filter = {};
  if (status && status !== 'all') filter.status = status;
  if (search) {
    filter.$or = [
      { clientName: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { service: { $regex: search, $options: 'i' } },
    ];
  }
  const appointments = await Appointment.find(filter).sort({ appointmentDate: 1 });
  res.json({ success: true, data: appointments });
});

// Create appointment
exports.createAppointment = asyncHandler(async (req, res) => {
  const { clientName, phone, email, service, appointmentDate, timeSlot, status, location, notes } = req.body;
  if (!clientName || !phone || !appointmentDate) {
    return res.status(400).json({ success: false, message: 'Client name, phone and date are required' });
  }
  const appointment = await Appointment.create({
    clientName,
    phone,
    email,
    service: service || 'Architectural Consultation',
    appointmentDate: new Date(appointmentDate),
    timeSlot: timeSlot || '10:00 AM - 11:30 AM',
    status: status || 'scheduled',
    location: location || 'Studio Headquarters, Bengaluru',
    notes: notes || '',
  });
  res.status(201).json({ success: true, data: appointment });
});

// Update appointment
exports.updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
  res.json({ success: true, data: appointment });
});

// Delete appointment
exports.deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
  res.json({ success: true, message: 'Appointment deleted successfully' });
});
