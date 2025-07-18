require('dotenv').config();
const request = require('supertest');
const app = require('../app'); // If server is exported
const mongoose = require('mongoose');
const User = require('../models/User');
const Availability = require('../models/Availability');
const Appointment = require('../models/Appointment');

let tokenA1, tokenA2, tokenP1, slot1, slot2, appointment1;

jest.setTimeout(30000); // Increase timeout to 30 seconds


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await Availability.deleteMany();
  await Appointment.deleteMany();

  // Register users
  await request(app).post('/api/auth/register').send({ name: 'Prof', email: 'p1@test.com', password: 'pass', role: 'professor' });
  await request(app).post('/api/auth/register').send({ name: 'Student A1', email: 'a1@test.com', password: 'pass', role: 'student' });
  await request(app).post('/api/auth/register').send({ name: 'Student A2', email: 'a2@test.com', password: 'pass', role: 'student' });

  // Login
  const resP1 = await request(app).post('/api/auth/login').send({ email: 'p1@test.com', password: 'pass' });
  const resA1 = await request(app).post('/api/auth/login').send({ email: 'a1@test.com', password: 'pass' });
  const resA2 = await request(app).post('/api/auth/login').send({ email: 'a2@test.com', password: 'pass' });

  tokenP1 = resP1.body.token;
  tokenA1 = resA1.body.token;
  tokenA2 = resA2.body.token;

  // Create availability
  const slotRes1 = await request(app)
    .post('/api/availability')
    .set('Authorization', `Bearer ${tokenP1}`)
    .send({ time: '2025-07-15T10:00' });

  const slotRes2 = await request(app)
    .post('/api/availability')
    .set('Authorization', `Bearer ${tokenP1}`)
    .send({ time: '2025-07-15T11:00' });

  slot1 = slotRes1.body;
  slot2 = slotRes2.body;

  // Book by A1
  const appointmentRes1 = await request(app)
    .post('/api/appointments')
    .set('Authorization', `Bearer ${tokenA1}`)
    .send({ professorId: slot1.professorId, availabilityId: slot1._id });

  appointment1 = appointmentRes1.body;

  // Book by A2
  await request(app)
    .post('/api/appointments')
    .set('Authorization', `Bearer ${tokenA2}`)
    .send({ professorId: slot2.professorId, availabilityId: slot2._id });

  // Cancel A1's appointment
  await request(app)
    .delete(`/api/appointments/${appointment1._id}`)
    .set('Authorization', `Bearer ${tokenP1}`);

  // Get A1's appointments
  const result = await request(app)
    .get('/api/appointments/my')
    .set('Authorization', `Bearer ${tokenA1}`);

  console.log('A1 Appointments:', result.body); // Should be empty
});


describe('College Appointment System', () => {
it('should respond to root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(404); // or 200 if you define root route
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
