// Catch-all serverless function for /api/*
const serverless = require('serverless-http');
const app = require('../server/app');

module.exports = serverless(app);
const serverless = require('serverless-http');
const app = require('../server/app');

module.exports = serverless(app);