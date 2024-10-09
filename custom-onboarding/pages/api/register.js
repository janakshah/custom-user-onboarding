import { loginUser } from '../../services/userService';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const { data, error, message } = await loginUser(username, password);

    if (error) {
      return res.status(500).json({ error: error });
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('user_id', data.user_id, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      })
    );

    return res.status(200).json({ message: message, data });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
