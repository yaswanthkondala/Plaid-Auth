const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const { db } = require('../db');
const dotenv = require('dotenv');
dotenv.config();

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments.sandbox, 
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  })
);

// Generate a Link Token
const createLinkToken = async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'unique-user-id' }, 
      client_name: 'Your App Name',
      language: 'en',
      country_codes: ['US'],
      products: ['transactions'],
    });
    res.json({ link_token: response.data.link_token });
  } catch (err) {
    console.error('Error creating link token:', err);
    res.status(500).json({ error: 'Failed to create link token' });
  }
};


const exchangePublicToken = async (req, res) => {
  const { public_token } = req.body;
  const { userid } = req.user;

  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = response.data.access_token;

   
    const query = `
      INSERT INTO accounts (userid, access_token)
      VALUES (?, ?)
    `;
    db.run(query, [userid, accessToken], (err) => {
      if (err) {
        console.error('Error saving access token:', err);
        return res.status(500).json({ error: 'Failed to save access token' });
      }
      res.json({ success: true, message: 'Bank account linked successfully' });
    });
  } catch (err) {
    console.error('Error exchanging public token:', err);
    res.status(500).json({ error: 'Failed to exchange public token' });
  }
};

module.exports = { createLinkToken, exchangePublicToken };

