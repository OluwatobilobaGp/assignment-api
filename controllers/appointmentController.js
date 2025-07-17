const Appointment = require('../models/Appointment');
const Availability = require('../models/Availability');

exports.bookAppointment = async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can book appointments' });

  const { professorId, availabilityId } = req.body;
  try {
    const slot = await Availability.findById(availabilityId);
    if (!slot || slot.isBooked) return res.status(400).json({ message: 'Slot not available' });

    slot.isBooked = true;
    await slot.save();

    const appointment = await Appointment.create({
      studentId: req.user.id,
      professorId,
      availabilityId,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelAppointment = async (req, res) => {
  if (req.user.role !== 'professor') return res.status(403).json({ message: 'Only professors can cancel appointments' });

  const appointmentId = req.params.id;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || String(appointment.professorId) !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    appointment.status = 'cancelled';
    await appointment.save();

    const slot = await Availability.findById(appointment.availabilityId);
    slot.isBooked = false;
    await slot.save();

    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentAppointments = async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can view their appointments' });

  try {
    const appointments = await Appointment.find({ studentId: req.user.id, status: 'booked' });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
