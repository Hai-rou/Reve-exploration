// Simple test route: /api/ping
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ pong: true, url: req.url, method: req.method });
}