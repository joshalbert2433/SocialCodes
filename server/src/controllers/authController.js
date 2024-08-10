const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Registration handler
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login handler (this is handled by Passport.js in the route)
// If you want custom logic or additional responses, you could include it here
exports.login = (req, res) => {
  // Passport handles authentication, but you can add any additional logic here if needed
  res.send('Login successful');
};

// Logout handler
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).send('Logout failed');
    res.redirect('/api/auth/login'); // Redirect to login page or other route
  });
};

// Optional: Handle errors (if needed)
exports.handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong');
};
