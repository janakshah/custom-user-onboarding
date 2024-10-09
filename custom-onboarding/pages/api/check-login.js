import { parse } from 'cookie';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');

    if (cookies.user_id) {
      return res.status(200).json({ loggedIn: true, userId: cookies.user_id });
    } else {
      return res.status(200).json({ loggedIn: false });
    }
  } else if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('user_id', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })
    );

    return res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
