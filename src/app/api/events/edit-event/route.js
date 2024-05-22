import connectMongo from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import cloudinary from '../../../../lib/cloudinary';

export const PUT = async (req) => {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Extract data from request body
    const { id, title, about, venue, city, date, image, quantity, ticketPrice, organizer } = await req.json();
    let imageUrl = image;
    let public_id;

    // If the image is a new file, upload it to Cloudinary
    if (image.startsWith('data:image/')) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'events',
      });
      imageUrl = uploadResponse.secure_url;
      public_id = uploadResponse.public_id;
    } else {
      // If image is not provided, get the current event's public_id
      const existingEvent = await Event.findById(id);
      if (existingEvent) {
        public_id = existingEvent.public_id;
      }
    }

    // Update the event in MongoDB
    const event = await Event.findByIdAndUpdate(id, {
      title,
      about,
      venue,
      city,
      date,
      imageUrl,
      public_id,
      quantity,
      ticketPrice,
      organizer,
    }, { new: true });

    // If event doesn't exist, return 404
    if (!event) {
      return new Response(JSON.stringify({ success: false, error: 'Event not found' }), { status: 404 });
    }

    // Return success response
    return new Response(JSON.stringify({ success: true, data: event }), { status: 200 });
  } catch (error) {
    // Handle errors
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
  }
};
