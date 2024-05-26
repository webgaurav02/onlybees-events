// src/api/auth/login.js
import connectMongo from '../../../../../lib/mongodb';
import User from '../../../../../models/User';
import { comparePassword } from '../../../../../lib/bcrypt';
import { generateToken } from '../../../../../lib/auth';

export const POST = async (req) => {
  try {

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Method Not Allowed' }), { status: 405 });
    }

    const { username, password } = await req.json();

    await connectMongo();

    const user = await User.findOne({ username });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid Username' }), { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid Password' }), { status: 401 });
    }

    const token = generateToken(user);

    return new Response(JSON.stringify({ success: true, token: token }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: "Server Error" }), { status: 500 });
  }


}
