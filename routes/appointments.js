const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  cancelAppointment,
  getStudentAppointments
} = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.post('/', auth, bookAppointment);
router.delete('/:id', auth, cancelAppointment);
router.get('/my', auth, getStudentAppointments);

module.exports = router;
