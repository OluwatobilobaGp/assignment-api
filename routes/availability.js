const express = require('express');
const router = express.Router();
const { createAvailability, getAvailability } = require('../controllers/availabilityController');
const auth = require('../middleware/auth');

router.post('/', auth, createAvailability);
router.get('/:professorId', auth, getAvailability);

module.exports = router;
