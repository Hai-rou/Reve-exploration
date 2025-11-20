const serverless = require("serverless-http");
const app = require("../server/app");

// Crée une fois le handler pour de meilleures perfs en cold start
const handler = serverless(app);

module.exports = handler;
