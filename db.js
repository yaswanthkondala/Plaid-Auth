const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/users.db');

const initDatabase = () => {
  db.serialize(() => {
    // Create Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        userid INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        password TEXT
      )
    `);

    // Create Accounts Table
    db.run(`
      CREATE TABLE IF NOT EXISTS accounts (
        userid INTEGER,
        accountID INTEGER PRIMARY KEY AUTOINCREMENT,
        access_token TEXT,
        FOREIGN KEY(userid) REFERENCES users(userid)
      )
    `);

    // Create Transactions Table
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        accountID INTEGER,
        category TEXT,
        date TEXT,
        authorizeddate TEXT,
        name TEXT,
        amount REAL,
        currencycode TEXT,
        isremoved INTEGER,
        FOREIGN KEY(accountID) REFERENCES accounts(accountID)
      )
    `);
  });
};

module.exports = { db, initDatabase };
