import mongoose from 'mongoose';


// Define the ticketPrice sub-schema
const TicketPriceSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false }); // Disable automatic _id generation for sub-documents



const EventSchema = new mongoose.Schema({
    organizer: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    // quantity: {
    //     type: Number,
    //     required: true,
    // },
    ticketPrice: {
        type: Map,
        of: TicketPriceSchema, // Use Map to allow dynamic keys for ticket phases
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
});


// Middleware to generate slug from title before saving
EventSchema.pre('save', function (next) {
    if (this.isModified('title') || this.isNew) {
      this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    next();
  });
  
  export default mongoose.models.Event || mongoose.model('Event', EventSchema);
  
