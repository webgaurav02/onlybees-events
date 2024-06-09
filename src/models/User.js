// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
