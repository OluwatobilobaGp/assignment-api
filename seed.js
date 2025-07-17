require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB models
const User = require('./models/User');
const Availability = require('./models/Availability');
const Appointment = require('./models/Appointment');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Availability.deleteMany();
    await Appointment.deleteMany();

    console.log('🧹 Old data removed');

    // Create hashed passwords
    const hashedPassword = await bcrypt.hash('123456', 10);

    // Create users
    const prof = await User.create({
      name: 'Prof John',
      email: 'prof@example.com',
      password: hashedPassword,
      role: 'professor',
    });

    const student1 = await User.create({
      name: 'Student A1',
      email: 'a1@example.com',
      password: hashedPassword,
      role: 'student',
    });

    const student2 = await User.create({
      name: 'Student A2',
      email: 'a2@example.com',
      password: hashedPassword,
      role: 'student',
    });

    console.log('👨‍🏫 Professor and 👩‍🎓 students created');

    // Add availability
    const slot1 = await Availability.create({
      professorId: prof._id,
      time: new Date('2025-07-20T10:00:00Z'),
    });

    const slot2 = await Availability.create({
      professorId: prof._id,
      time: new Date('2025-07-21T10:00:00Z'),
    });

    console.log('📅 Availability added');

    // Student 1 books slot1
    const appointment1 = await Appointment.create({
      studentId: student1._id,
      professorId: prof._id,
      availabilityId: slot1._id,
    });

    // Mark slot as booked
    slot1.booked = true;
    await slot1.save();

    // Student 2 books slot2
    const appointment2 = await Appointment.create({
      studentId: student2._id,
      professorId: prof._id,
      availabilityId: slot2._id,
    });

    slot2.booked = true;
    await slot2.save();

    console.log('📆 Appointments booked');

    // Cancel appointment1
    appointment1.status = 'cancelled';
    await appointment1.save();

    console.log('❌ Appointment for Student A1 cancelled');

    console.log('✅ Seeding completed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
