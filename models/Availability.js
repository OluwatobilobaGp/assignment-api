const mongoose = require('mongoose');
const availabilitySchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  booked: { type: Boolean, default: false }
});
module.exports = mongoose.model('Availability', availabilitySchema);
