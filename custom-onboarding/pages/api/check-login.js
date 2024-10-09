import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');

    if (cookies.user_id) {
      return res.status(200).json({ loggedIn: true, userId: cookies.user_id });
    } else {
      return res.status(200).json({ loggedIn: false });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
