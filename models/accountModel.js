const { openDb } = require('../db');

/**
 * Add account to the database
 * @param {number} userid - The ID of the user
 * @param {string} accessToken - The access token from Plaid
 */
const addAccount = async (userid, accessToken) => {
  const db = await openDb();
  if (!db) throw new Error('Database connection failed.');

  try {
    await db.run(
      `INSERT INTO accounts (userid, access_token) VALUES (?, ?)`,
      [userid, accessToken]
    );
    console.log('Account added successfully.');
  } catch (error) {
    console.error('Error adding account:', error);
    throw error;
  }
};

module.exports = { addAccount };

