const { db } = require('../db');

const addUser = (user, callback) => {
  const { firstname, lastname, email, phone, password } = user;
  const query = `
    INSERT INTO users (firstname, lastname, email, phone, password)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [firstname, lastname, email, phone, password], callback);
};

const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], callback);
};

module.exports = { addUser, findUserByEmail };
