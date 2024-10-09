import {
  saveUserPageProgress,
  fetchUserPageProgress,
} from '../../services/pageProgressService';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { user_id, current_page } = req.body;

    if (!current_page) {
      return res
        .status(400)
        .json({ error: 'current_page is required for PUT request' });
    }

    try {
      const { data, error } = await saveUserPageProgress(user_id, current_page);

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const { user_id } = req.query;
      const { data, error } = await fetchUserPageProgress(user_id);

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
