export default async function handler(req, res) {
  const supabaseUrl = 'https://cxvxfljjtxtzsaiabqqa.supabase.co';
  
  const path = req.url.replace('/api/proxy', '');
  const targetUrl = `${supabaseUrl}${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'apikey': req.headers['apikey'] || '',
        'Authorization': req.headers['authorization'] || '',
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
