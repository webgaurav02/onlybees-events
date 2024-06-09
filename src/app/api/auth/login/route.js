// src/api/admin/auth/login.js
import { generateUserToken } from '../../../../lib/auth';

export const POST = async (req) => {
  try {

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ success: false, error: 'Method Not Allowed' }), { status: 405 });
    }

    const { ph } = await req.json();


    if (!ph) {
      return new Response(JSON.stringify({ success: false, message: 'User missing' }), { status: 401 });
    }


    const token = generateUserToken(ph);

    const cookieOptions = {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 3600 * 24 * 60, // 60 days
      sameSite: 'strict', 
      path: '/', // The path scope of the cookie
    };
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Set-Cookie': `userToken=${token}; ${cookieOptions.httpOnly?"HttpOnly;":""} Max-Age=${cookieOptions.maxAge}; Path=${cookieOptions.path}; ${cookieOptions.secure ? 'Secure;' : ''} SameSite=${cookieOptions.sameSite};`,
      },
    });


  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: "Server Error" }), { status: 500 });
  }


}
