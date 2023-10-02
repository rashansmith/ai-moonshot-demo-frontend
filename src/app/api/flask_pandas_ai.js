export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'POST') {
      const { table_name, prompt } = req.body;

      try {
        const response = await axios.post('http://app-backend:5000/', {
          table_name,
          // prompt: ` ${prompt} `
          prompt: prompt
        });
  
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
  } else {
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}