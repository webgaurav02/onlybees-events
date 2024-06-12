// src/models/User.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  ticketType: String,
  quantity: Number,
  bookingDate: Date,
}, { _id: false });

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String },
  email: { type: String, unique: true },
  bookings: [bookingSchema], // Array of booking subdocuments
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
