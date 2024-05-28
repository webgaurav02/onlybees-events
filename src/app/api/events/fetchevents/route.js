import connectMongo from '../../../../lib/mongodb';
import Event from '../../../../models/Event';

export const GET = async () => {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch all events from the database
    const events = await Event.find({});

    // Return the events in the response
    return new Response(JSON.stringify({ success: true, data: events }), { status: 200 });
  } catch (error) {
    // Handle errors
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
  }
};