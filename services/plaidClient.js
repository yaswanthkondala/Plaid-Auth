const plaid = require('plaid');

require('dotenv').config();

const client = new plaid.PlaidApi(new plaid.Configuration({
  basePath: plaid.PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'], 
  apiKey: process.env.PLAID_SECRET, 
}));

module.exports = client;

