import connectMongo from '@/lib/mongodb';
import razorpay from '@/lib/razorpay';
import Order from '@/models/Order';

export const POST = async (req, res) => {
    try {
        await connectMongo();

        const { amount, currency, receipt, notes } = await req.json();

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
            notes,
        };

        const order = await razorpay.orders.create(options);

        const newOrder = new Order({
            orderId: order.id,
            amount,
            currency,
            receipt,
            notes,
            status: 'created',
        });

        await newOrder.save();

        res.status(201).json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};
