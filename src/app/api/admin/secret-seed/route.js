// src/api/admin/secret-seed.js
import connectMongo from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { hashPassword } from '@/lib/bcrypt';

export const POST = async (req) => {
    try {

        if (req.method !== 'POST') {
            return new Response(JSON.stringify({ success: false, error: 'Method Not Allowed' }), { status: 405 });
        }

        const { secret, username, password } = await req.json();

        if (secret !== process.env.SEED_SECRET) {
            return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), { status: 403 });
        }

        await connectMongo();

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        const hashedPassword = await hashPassword(password);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            isAdmin: true,
        });

        await newAdmin.save();

        return new Response(JSON.stringify({ success: true, message: "Admin user created" }), { status: 201 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: "Server Error" }), { status: 500 });
    }
};
