const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  availabilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});
module.exports = mongoose.model('Appointment', appointmentSchema);
