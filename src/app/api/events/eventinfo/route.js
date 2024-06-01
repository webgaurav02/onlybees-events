import connectMongo from '../../../../lib/mongodb';
import Event from '../../../../models/Event';

export const GET = async (req) => {
    try {
        // Connect to MongoDB
        await connectMongo();

        // Extract the slug from the query parameters
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get('slug');

        if (!slug) {
            return new Response(JSON.stringify({ success: false, message: 'Slug is required!' }), { status: 400 });
        }

        // Fetch event from the database
        const event = await Event.findOne({ slug });

        if (!event) {
            return new Response(JSON.stringify({ success: false, message: 'Invalid Event!' }), { status: 404 });
        }

        // Return the event in the response
        return new Response(JSON.stringify({ success: true, data: event }), { status: 200 });

    } catch (error) {
        // Handle errors
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
};
