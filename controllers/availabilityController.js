const Availability = require('../models/Availability');

exports.createAvailability = async (req, res) => {
  if (req.user.role !== 'professor') return res.status(403).json({ message: 'Only professors can set availability' });

  const { time } = req.body;
  try {
    const availability = await Availability.create({
      professorId: req.user.id,
      time,
    });
    res.status(201).json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  const professorId = req.params.professorId;
  try {
    const slots = await Availability.find({ professorId, isBooked: false });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
