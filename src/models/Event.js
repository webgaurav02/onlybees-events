import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    organizer: String,
    title: String,
    about: String,
    venue: String,
    city: String,
    date: Date,
    imageUrl: String,
    public_id: String,
    quantity: Number,
    ticketPrice: Number,
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
