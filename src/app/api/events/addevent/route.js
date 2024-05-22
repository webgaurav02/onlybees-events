import connectMongo from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import cloudinary from '../../../../lib/cloudinary';

export const POST = async (req) => {
    try {
        // Connect to MongoDB
        await connectMongo();

        // Extract data from request body
        const { organizer, title, about, venue, city, date, image, quantity, ticketPrice } = await req.json();

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'events',
        });

        // Create a new event instance
        const event = new Event({
            organizer,
            title,
            about,
            venue,
            city,
            date,
            imageUrl: uploadResponse.secure_url,
            public_id: uploadResponse.public_id,
            quantity,
            ticketPrice,
        });

        // Save the event to MongoDB
        await event.save();

        // Return success response
        return new Response(JSON.stringify({ success: true, data: event }), { status: 201 });
    
    } catch (error) {
        // Handle errors
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
};
