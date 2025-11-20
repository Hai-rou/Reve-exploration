// Catch-all Vercel serverless function for /api/* using CommonJS
const serverless = require('serverless-http');
const app = require('../server/app');

module.exports = serverless(app);
// Catch-all API serverless function for Vercel (CommonJS to match existing Express code)
const serverless = require('serverless-http');
const app = require('../server/app');

// Simple ping route (will be handled by Express aliases if needed)
// We rely on Express mounted routes; any /api/* path hits here.

module.exports = serverless(app);
