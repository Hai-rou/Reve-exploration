// Catch-all Vercel serverless function for /api/* using CommonJS
const serverless = require('serverless-http');
const app = require('../server/app');

// Log minimal diagnostics once per cold start
let logged = false;
function logOnce() {
	if (logged) return;
	logged = true;
	console.log('[API] cold start');
	console.log('[API] MONGODB_URI present:', !!process.env.MONGODB_URI);
	console.log('[API] NODE_ENV:', process.env.NODE_ENV);
}

module.exports = (req, res) => {
	logOnce();
	return serverless(app)(req, res);
};
// Catch-all API serverless function for Vercel (CommonJS to match existing Express code)
const serverless = require('serverless-http');
const app = require('../server/app');

// Simple ping route (will be handled by Express aliases if needed)
// We rely on Express mounted routes; any /api/* path hits here.

module.exports = serverless(app);
