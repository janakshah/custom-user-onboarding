import {
  saveUserDetail,
  fetchUserDetails,
} from '../../services/userDetailService';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { user_id, column, value } = req.body;

    try {
      const { data, error } = await saveUserDetail(user_id, column, value);
      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    const { user_id } = req.query;

    try {
      const { data, error } = await fetchUserDetails(user_id);
      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
