const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Registration route
router.post('/register', authController.register);

// Login route using Passport.js local strategy
router.post('/login', passport.authenticate('local', {
  successRedirect: '/api/users/profile',  // Redirect to user profile on success
  failureRedirect: '/api/auth/login',     // Redirect back to login on failure
  failureFlash: true,                     // Optionally use flash messages for errors
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/api/auth/login'); // Redirect to login or any other route
  });
});

module.exports = router;
