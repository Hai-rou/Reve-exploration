// Simple ping to verify API function deployment without Express
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(JSON.stringify({ pong: true, method: req.method, url: req.url }));
};// Explicit test function: /api/ping should return JSON if functions are working.
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).end(JSON.stringify({ pong: true, path: req.url, method: req.method }));
};