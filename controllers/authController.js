const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { addUser, findUserByEmail } = require('../models/userModel');

const register = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    addUser({ firstname, lastname, email, phone, password: hashedPassword }, (err) => {
      if (err) return res.status(400).json({ error: 'Email already exists' });

      res.json({ message: 'Account created successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = { register, login };
