import {
  fetchPageComponents,
  savePageComponentSettings,
} from '../../services/pageComponentService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await fetchPageComponents();

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const { about_me_page, address_page, birthdate_page } = req.body;

      const { data, error } = await savePageComponentSettings({
        about_me_page,
        address_page,
        birthdate_page,
      });

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
