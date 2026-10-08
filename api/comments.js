export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json([
      {
        id: 1,
        name: 'Partner Ruth',
        text: 'Amen! Connecting live from Abuja. Glory to God!',
        timestamp: '2:15 pm'
      },
      {
        id: 2,
        name: 'Brother David',
        text: 'Praying with Pastor and all partners across Zone 1.',
        timestamp: '2:18 pm'
      }
    ]);
  }
  if (req.method === 'POST') {
    const { name, text } = req.body || {};
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
    return res.status(201).json({
      id: Date.now(),
      name: name && name.trim() ? name.trim() : 'Partner',
      text: text && text.trim() ? text.trim() : '',
      timestamp: timeStr
    });
  }
  return res.status(200).json([]);
}
