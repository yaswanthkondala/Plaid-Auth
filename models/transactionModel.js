const { db } = require('../database/db');

const addTransaction = (transaction, callback) => {
  const {
    accountID,
    category,
    date,
    authorizeddate,
    name,
    amount,
    currencycode,
    isremoved,
  } = transaction;

  const query = `
    INSERT INTO transactions (
      accountID, category, date, authorizeddate, name, amount, currencycode, isremoved
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [accountID, category, date, authorizeddate, name, amount, currencycode, isremoved],
    callback
  );
};

module.exports = { addTransaction };
