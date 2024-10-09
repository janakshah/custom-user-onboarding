import { getUserDetailsList } from '../../services/dataService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await getUserDetailsList();

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
